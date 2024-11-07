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

  // Normalize the data
  const tensorData = tf.tensor2d(features);
  const normalizedData = tf.tidy(() => {
    const mean = tensorData.mean(0);
    const std = tensorData.std(0);
    return tensorData.sub(mean).div(std);
  });

  return normalizedData;
}