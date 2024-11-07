export function useDatasetStats() {
    return {
      stats: {
        totalParticipants: 0,
        participantChange: 0,
        totalRecords: 0,
        recordChange: 0,
        activeNodes: 0,
        nodeChange: 0,
        dataQuality: 0,
        qualityChange: 0
      }
    }
  }