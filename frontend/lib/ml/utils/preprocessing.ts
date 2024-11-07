import * as tf from '@tensorflow/tfjs';

export interface EnvironmentalData {
  timestamp: number;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
}

export function preprocessEnvironmentalData(data: EnvironmentalData[]) {
  // Convert data to tensors
  const features = data.map(d => [
    d.pm25, d.pm10, d.no2, d.so2, d.co, d.o3,
    d.temperature, d.humidity, d.windSpeed, d.windDirection
  ]);

  // Normalize the data using min-max normalization
  const tensorData = tf.tensor2d(features);
  const normalizedData = tf.tidy(() => {
    const min = tensorData.min(0);
    const max = tensorData.max(0);
    // Avoid division by zero by adding a small epsilon
    const range = tf.maximum(max.sub(min), tf.scalar(1e-6));
    return tensorData.sub(min).div(range);
  });

  return normalizedData;
}