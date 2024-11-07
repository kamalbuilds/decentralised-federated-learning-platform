import { Card } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <div className="md:col-span-8">
        {/* Model Training Status Skeleton */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse rounded" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-muted rounded-lg">
                  <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded mb-2" />
                  <div className="h-8 w-16 bg-muted-foreground/20 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Dataset Stats Skeleton */}
        <Card className="p-6 mt-6">
          <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded mb-2" />
                <div className="h-8 w-16 bg-muted-foreground/20 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Participant List Skeleton */}
      <div className="md:col-span-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-40 bg-muted animate-pulse rounded" />
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-muted rounded-lg">
                <div className="h-4 w-32 bg-muted-foreground/20 animate-pulse rounded mb-2" />
                <div className="h-4 w-24 bg-muted-foreground/20 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}