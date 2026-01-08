import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SeverityBadge } from './SeverityBadge'
import { blindSpotCategories } from '@/lib/constants'
import { BlindSpot } from '@/lib/db'

interface BlindSpotCardProps {
  blindSpot: BlindSpot
  onClick?: () => void
  isSelected?: boolean
}

export const BlindSpotCard: React.FC<BlindSpotCardProps> = ({ blindSpot, onClick, isSelected }) => {
  const category = blindSpotCategories[blindSpot.category as keyof typeof blindSpotCategories]
  const Icon = category?.icon

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{blindSpot.title}</CardTitle>
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
        >
          {Icon && <Icon className="w-4 h-4" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mt-2">
          <SeverityBadge severity={blindSpot.severity} />
          {Number(blindSpot.industrySpecific) > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 border border-blue-200 rounded-full">
              Industry-Specific
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3 line-clamp-2">
          {blindSpot.description}
        </p>
      </CardContent>
    </Card>
  )
}
