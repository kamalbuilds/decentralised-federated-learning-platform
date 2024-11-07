import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { FederatedLearningClient } from '@/lib/ml/federatedLearning';
import { EnvironmentalModelArchitecture } from '@/lib/ml/models/environmental';
import type { EnvironmentalData } from '@/lib/ml/utils/preprocessing';
import { useNearWallet } from '@/hooks/use-near-wallet';

export function useFederatedLearning() {
  const [client, setClient] = useState<FederatedLearningClient | null>(null);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);
  const { wallet } = useNearWallet();

  // Generate mock environmental data
  const generateMockData = (): EnvironmentalData[] => {
    return Array(100).fill(null).map(() => ({
      timestamp: Date.now(),
      pm25: Math.random() * 100,
      pm10: Math.random() * 150,
      no2: Math.random() * 50,
      so2: Math.random() * 20,
      co: Math.random() * 10,
      o3: Math.random() * 100,
      temperature: Math.random() * 40,
      humidity: Math.random() * 100,
      windSpeed: Math.random() * 30,
      windDirection: Math.random() * 360
    }));
  };

  // Initialize client when component mounts
  useEffect(() => {
    const mockData = generateMockData();
    const newClient = new FederatedLearningClient(
      EnvironmentalModelArchitecture,
      mockData,
      wallet
    );
    setClient(newClient);

    // Cleanup
    return () => {
      newClient.dispose();
    };
  }, [wallet]);

  const startTraining = useCallback(async () => {
    if (!client || isTraining) return;

    try {
      setIsTraining(true);
      await client.trainLocal(10, {
        onProgress: setProgress,
        onMetrics: setMetrics
      });
    } catch (error) {
      console.error('Training failed:', error);
    } finally {
      setIsTraining(false);
    }
  }, [client, isTraining]);

  return {
    startTraining,
    progress,
    metrics,
    isTraining
  };
} 