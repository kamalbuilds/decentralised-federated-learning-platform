import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { FederatedLearningClient } from '@/lib/ml/federatedLearning';

const MODEL_ARCHITECTURE = {
  layers: [
    { className: 'Dense', config: { units: 64, activation: 'relu', inputShape: [28, 28] } },
    { className: 'Dense', config: { units: 32, activation: 'relu' } },
    { className: 'Dense', config: { units: 10, activation: 'softmax' } }
  ]
};

export function useFederatedLearning() {
  const [client, setClient] = useState<FederatedLearningClient | null>(null);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);
  const [isTraining, setIsTraining] = useState(false);

  // Initialize client when component mounts
  useEffect(() => {
    const mockData = {
      x: Array(100).fill(0).map(() => Array(784).fill(0).map(() => Math.random())),
      y: Array(100).fill(0).map(() => Array(10).fill(0).map(() => Math.random()))
    };

    const newClient = new FederatedLearningClient(MODEL_ARCHITECTURE, mockData);
    setClient(newClient);

    // Cleanup
    return () => {
      newClient.dispose();
    };
  }, []);

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