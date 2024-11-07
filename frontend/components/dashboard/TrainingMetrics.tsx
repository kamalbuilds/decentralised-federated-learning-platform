import { Line } from 'react-chartjs-2';

interface TrainingMetricsProps {
  accuracy: number[];
  loss: number[];
  epochs: number[];
}

export default function TrainingMetrics({ accuracy, loss, epochs }: TrainingMetricsProps) {
  const data = {
    labels: epochs,
    datasets: [
      {
        label: 'Accuracy',
        data: accuracy,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Loss',
        data: loss,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Training Metrics</h2>
      <div className="h-64">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}