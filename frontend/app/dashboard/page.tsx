import { useState, useEffect } from 'react';
import { ModelTrainingStatus } from '@/components/dashboard/ModelTrainingStatus';
import { DatasetStats } from '@/components/dashboard/DatasetStats';
import { ParticipantList } from '@/components/dashboard/ParticipantList';

export default function Dashboard() {
  const [trainingStatus, setTrainingStatus] = useState({});
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Initialize federated learning client
    // Connect to NEAR wallet
    // Load initial data
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-8">
        <ModelTrainingStatus status={trainingStatus} />
        <DatasetStats />
      </div>
      <div className="col-span-4">
        <ParticipantList participants={participants} />
      </div>
    </div>
  );
}