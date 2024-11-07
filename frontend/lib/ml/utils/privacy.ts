import * as tf from '@tensorflow/tfjs';

export function differentialPrivacy(
  modelUpdates: tf.Tensor[],
  epsilon: number = 1.0,
  delta: number = 1e-5
): tf.Tensor[] {
  // Basic Gaussian mechanism implementation
  return modelUpdates.map(tensor => {
    const noise = tf.randomNormal(tensor.shape, 0, epsilon);
    return tf.add(tensor, noise);
  });
}