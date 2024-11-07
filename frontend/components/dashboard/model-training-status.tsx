"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFederatedLearning } from "@/hooks/use-federated-learning"

export function ModelTrainingStatus() {
  const [isTraining, setIsTraining] = useState(false)
  const { startTraining, progress, metrics } = useFederatedLearning()

  const handleStartTraining = async () => {
    setIsTraining(true)
    await startTraining()
    setIsTraining(false)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Model Training Status</h2>
        <Button 
          onClick={handleStartTraining}
          disabled={isTraining}
        >
          {isTraining ? "Training..." : "Start Training"}
        </Button>
      </div>

      <div className="space-y-4">
        <Progress value={progress} />
        
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Accuracy"
            value={metrics.accuracy}
            change={metrics.accuracyChange}
          />
          <MetricCard
            title="Loss"
            value={metrics.loss}
            change={metrics.lossChange}
          />
        </div>
      </div>
    </Card>
  )
}

function MetricCard({ title, value, change }: {
  title: string
  value: number
  change: number
}) {
  return (
    <div className="p-4 bg-muted rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value.toFixed(2)}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change.toFixed(2)}%
      </p>
    </div>
  )
}