import React from 'react'
import { AlertTriangle, Filter } from 'lucide-react'
import { SeverityBadge } from './SeverityBadge'
import { blindSpotCategories } from '@/lib/constants'
import { BlindSpot } from '@/lib/db'

interface DetailedListProps {
  blindSpots: BlindSpot[]
}

export const DetailedList: React.FC<DetailedListProps> = ({ blindSpots }) => {
  if (blindSpots.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No blindspots detected. Complete industry setup and run analysis.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Comprehensive BlindSpot Analysis</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {blindSpots.filter(bs => Number(bs.industrySpecific) > 0).length} industry-specific
          </span>
          <Filter className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {blindSpots.map((blindSpot) => {
          const category = blindSpotCategories[blindSpot.category as keyof typeof blindSpotCategories]
          const Icon = category?.icon
          return (
            <div key={blindSpot.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div 
                  className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0"
                  style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 truncate">{blindSpot.title}</h3>
                      <p className="text-sm text-gray-500">{category?.label}</p>
                    </div>
                    <div className="flex flex-col items-end space-y-2 shrink-0">
                      <div className="flex items-center space-x-2">
                        <SeverityBadge severity={blindSpot.severity} />
                        {Number(blindSpot.industrySpecific) > 0 && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 rounded-full">
                            Industry-Specific
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 font-medium">Risk Score: {blindSpot.riskScore}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{blindSpot.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Business Impact:</span>
                      <p className="text-gray-600">{blindSpot.impact}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 block mb-1">Recommended Action:</span>
                      <p className="text-gray-600">{blindSpot.recommendation}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Timeline:</span>
                        <span>{blindSpot.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Effort:</span>
                        <span>{blindSpot.effort}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
