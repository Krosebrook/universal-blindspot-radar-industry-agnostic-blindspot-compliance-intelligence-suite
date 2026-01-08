import React from 'react'
import { FileText, Trash2, Calendar, Building, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Analysis } from '@/lib/db'
import { format } from 'date-fns'

interface AnalysisHistoryProps {
  analyses: Analysis[]
  onSelect: (analysis: Analysis) => void
  onDelete: (id: string) => void
}

export const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ analyses, onSelect, onDelete }) => {
  if (analyses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Analysis History</h3>
        <p className="text-gray-500 max-w-sm mx-auto mt-2">
          Run your first industry-specific analysis to see it here and track your risk history.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {analyses.map((analysis) => (
        <Card key={analysis.id} className="group hover:shadow-lg transition-all border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-base font-bold text-gray-900 line-clamp-1">
                  {analysis.industry}
                </CardTitle>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <Calendar className="w-3 h-3" />
                  <span>{format(new Date(analysis.createdAt), 'MMM d, yyyy • HH:mm')}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(analysis.id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2 italic">
                "{analysis.input}"
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  {Number(analysis.complianceMode) > 0 && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full" title="Compliance Focus"></div>
                  )}
                  {Number(analysis.securityMode) > 0 && (
                    <div className="w-2 h-2 bg-red-500 rounded-full" title="Security Focus"></div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs h-8"
                  onClick={() => onSelect(analysis)}
                >
                  View Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
