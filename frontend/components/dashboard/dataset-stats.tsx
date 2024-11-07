"use client"

import { Card } from "@/components/ui/card"
import { useDatasetStats } from "@/hooks/use-dataset-stats"

export function DatasetStats() {
  const { stats } = useDatasetStats()

  return (
    <Card className="p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Dataset Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Participants"
          value={stats.totalParticipants}
          change={stats.participantChange}
        />
        <StatCard
          title="Total Records"
          value={stats.totalRecords}
          change={stats.recordChange}
        />
        <StatCard
          title="Active Nodes"
          value={stats.activeNodes}
          change={stats.nodeChange}
        />
        <StatCard
          title="Data Quality"
          value={`${stats.dataQuality}%`}
          change={stats.qualityChange}
        />
      </div>
    </Card>
  )
}

function StatCard({ title, value, change }: {
  title: string
  value: string | number
  change: number
}) {
  return (
    <div className="p-4 bg-muted rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change > 0 ? '+' : ''}{change}%
      </p>
    </div>
  )
}