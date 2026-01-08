import { blink } from './blink'

export interface Analysis {
  id: string
  userId: string
  industry: string
  market: string | null
  input: string
  complianceMode: string | number // SQLite boolean as "0"/"1"
  securityMode: string | number
  createdAt: string
}

export interface BlindSpot {
  id: string
  analysisId: string
  category: string
  title: string
  severity: string
  riskScore: number
  description: string
  impact: string
  recommendation: string
  timeline: string
  effort: string
  coordinates: string // JSON string
  industrySpecific: string | number
}

export const db = {
  analyses: {
    async create(data: Omit<Analysis, 'id' | 'createdAt'>) {
      return await blink.db.table<Analysis>('analyses').create(data)
    },
    async list(userId: string) {
      return await blink.db.table<Analysis>('analyses').list({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
    },
    async get(id: string) {
      return await blink.db.table<Analysis>('analyses').get(id)
    },
    async delete(id: string) {
      return await blink.db.table<Analysis>('analyses').delete(id)
    }
  },
  blindspots: {
    async createMany(items: Omit<BlindSpot, 'id'>[]) {
      return await blink.db.table<BlindSpot>('blindspots').createMany(items)
    },
    async listForAnalysis(analysisId: string) {
      return await blink.db.table<BlindSpot>('blindspots').list({
        where: { analysisId }
      })
    }
  }
}
