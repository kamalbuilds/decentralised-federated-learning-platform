"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useParticipants } from "@/hooks/use-participants"

export function ParticipantList() {
  const { participants, isLoading } = useParticipants()

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Active Participants</h2>
        <span className="text-sm text-muted-foreground">
          {participants.length} nodes
        </span>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {participants.map((participant) => (
            <ParticipantCard
              key={participant.id}
              participant={participant}
            />
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

function ParticipantCard({ participant }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
      <div className="flex-1 space-y-1">
        <p className="font-medium">{participant.name}</p>
        <p className="text-sm text-muted-foreground">
          Last Update: {participant.lastUpdate}
        </p>
      </div>
      <div className={`w-3 h-3 rounded-full ${
        participant.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
      }`} />
    </div>
  )
}