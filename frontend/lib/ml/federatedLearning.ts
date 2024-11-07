import * as tf from '@tensorflow/tfjs';
import { differentialPrivacy } from '@/lib/ml/utils/privacy';
import { preprocessEnvironmentalData, type EnvironmentalData } from '@/lib/ml/utils/preprocessing';
import { useNearWallet } from '@/hooks/use-near-wallet';

export class FederatedLearningClient {
  private model: tf.LayersModel;
  private localData: EnvironmentalData[];
  private normalizedData: tf.Tensor;
  private wallet: any;

  constructor(modelArchitecture: any, localData: EnvironmentalData[], wallet: any) {
    this.initializeTF();
    this.model = tf.sequential();
    this.wallet = wallet;
    
    modelArchitecture.layers.forEach((layer: any) => {
      this.model.add(tf.layers[layer.className.toLowerCase()](layer.config));
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mse', 'mae']
    });

    this.localData = localData;
    this.normalizedData = preprocessEnvironmentalData(localData);
  }

  private async initializeTF() {
    await tf.ready();
    await tf.setBackend('webgl');
  }

  async trainLocal(epochs: number, callbacks?: {
    onProgress?: (progress: number) => void;
    onMetrics?: (metrics: any) => void;
  }): Promise<tf.Tensor[]> {
    try {
      const result = await this.model.fit(this.normalizedData, {
        epochs,
        batchSize: 32,
        shuffle: true,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            const progress = (epoch + 1) / epochs;
            callbacks?.onProgress?.(progress);
            callbacks?.onMetrics?.(logs);
          }
        }
      });

      // Apply differential privacy to model updates
      const modelUpdates = this.model.getWeights();
      const privateUpdates = differentialPrivacy(modelUpdates);

      // Submit updates to NEAR contract if wallet is connected
      if (this.wallet?.isSignedIn()) {
        await this.submitUpdatesToContract(privateUpdates);
      }

      return privateUpdates;
    } catch (error) {
      console.error('Training failed:', error);
      throw error;
    }
  }

  private async submitUpdatesToContract(updates: tf.Tensor[]) {
    if (!this.wallet?.contract) return;

    try {
      const serializedUpdates = await Promise.all(
        updates.map(async tensor => ({
          shape: tensor.shape,
          data: Array.from(await tensor.data())
        }))
      );

      await this.wallet.contract.submit_update({
        args: {
          updates: serializedUpdates,
          timestamp: Date.now(),
          metrics: {
            loss: this.model.metrics[0],
            accuracy: this.model.metrics[1]
          }
        }
      });
    } catch (error) {
      console.error('Failed to submit updates to contract:', error);
    }
  }

  dispose(): void {
    this.model.dispose();
    this.normalizedData.dispose();
  }
}