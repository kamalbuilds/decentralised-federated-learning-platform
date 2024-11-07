import * as tf from '@tensorflow/tfjs';

export const EnvironmentalModelArchitecture = {
  sequential: true,
  layers: [
    {
      className: 'Dense',
      config: {
        units: 128,
        activation: 'relu',
        inputShape: [10] // For air quality metrics and environmental conditions
      }
    },
    {
      className: 'Dense',
      config: {
        units: 64,
        activation: 'relu'
      }
    },
    {
      className: 'Dense',
      config: {
        units: 32,
        activation: 'relu'
      }
    },
    {
      className: 'Dense',
      config: {
        units: 1, // Predicting a single value (e.g., air quality index)
        activation: 'linear'
      }
    }
  ]
};