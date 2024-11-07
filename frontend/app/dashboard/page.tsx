
"use client"
import { Suspense } from "react"
import { ModelTrainingStatus } from "@/components/dashboard/model-training-status"
import { DatasetStats } from "@/components/dashboard/dataset-stats"
import { ParticipantList } from "@/components/dashboard/participant-list"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">Training Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <ModelTrainingStatus />
            <DatasetStats />
          </div>
          <div className="md:col-span-4">
            <ParticipantList />
          </div>
        </div>
      </Suspense>
    </div>
  )
}