"use client"

import { useState, useEffect } from "react"
import { useNearWallet } from "./use-near-wallet"

interface Participant {
  id: string
  name: string
  status: 'active' | 'inactive'
  lastUpdate: string
  contribution: number
}

export function useParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { contract } = useNearWallet()

  useEffect(() => {
    async function fetchParticipants() {
      if (!contract) return

      try {
        const data = await contract.get_participants()
        setParticipants(data)
      } catch (error) {
        console.error("Failed to fetch participants:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchParticipants()
  }, [contract])

  return { participants, isLoading }
}