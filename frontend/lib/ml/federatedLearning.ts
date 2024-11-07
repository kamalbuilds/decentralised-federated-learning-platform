import * as tf from '@tensorflow/tfjs';
import { differentialPrivacy } from '../utils/privacy';

export class FederatedLearningClient {
  private model: tf.LayersModel;
  private localData: any;

  constructor(modelArchitecture: any, localData: any) {
    this.model = tf.sequential(modelArchitecture);
    this.localData = localData;
  }

  async trainLocal(epochs: number): Promise<tf.Tensor[]> {
    // Train model on local data
    await this.model.fit(this.localData.x, this.localData.y, {
      epochs,
      verbose: 1
    });

    // Apply differential privacy to model updates
    const modelUpdates = this.model.getWeights();
    return differentialPrivacy(modelUpdates);
  }

  async updateModel(globalWeights: tf.Tensor[]): Promise<void> {
    this.model.setWeights(globalWeights);
  }
}