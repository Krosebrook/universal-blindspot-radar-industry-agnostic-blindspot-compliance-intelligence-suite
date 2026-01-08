import React, { useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { blindSpotCategories } from '@/lib/constants'
import { BlindSpot } from '@/lib/db'

interface RadarVisualizationProps {
  radarData: BlindSpot[]
  filterCategory: string
  onPointClick: (blindSpot: BlindSpot) => void
}

export const RadarVisualization: React.FC<RadarVisualizationProps> = ({ 
  radarData, 
  filterCategory,
  onPointClick 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawRadar = () => {
    const canvas = canvasRef.current
    if (!canvas || radarData.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 60

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Concentric circles
    const riskLevels = ['Low Risk', 'Medium Risk', 'High Risk', 'Critical Risk', 'Extreme Risk']
    const riskColors = ['#10b981', '#f59e0b', '#ef4444', '#dc2626', '#991b1b']
    
    for (let i = 1; i <= 5; i++) {
      const radius = (maxRadius / 5) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = riskColors[i - 1] + '40'
      ctx.stroke()
    }

    // Risk level labels
    ctx.font = 'bold 11px Inter, system-ui, sans-serif'
    ctx.textAlign = 'center'
    riskLevels.forEach((level, i) => {
      const radius = (maxRadius / 5) * (i + 1)
      ctx.fillStyle = riskColors[i]
      ctx.fillText(level, centerX, centerY - radius + 12)
    })

    // Draw category sectors
    const categories = Object.entries(blindSpotCategories)
    const sectorCount = categories.length
    const sectorAngle = (2 * Math.PI) / sectorCount

    categories.forEach(([key, category], index) => {
      const angle = index * sectorAngle - Math.PI / 2
      
      ctx.strokeStyle = '#d1d5db'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + Math.cos(angle) * maxRadius,
        centerY + Math.sin(angle) * maxRadius
      )
      ctx.stroke()

      ctx.fillStyle = category.color
      ctx.font = 'bold 12px Inter, system-ui, sans-serif'
      ctx.textAlign = 'center'
      const labelX = centerX + Math.cos(angle) * (maxRadius + 35)
      const labelY = centerY + Math.sin(angle) * (maxRadius + 35)
      
      const words = category.label.split(' ')
      if (words.length > 1) {
        ctx.fillText(words[0], labelX, labelY - 6)
        ctx.fillText(words.slice(1).join(' '), labelX, labelY + 8)
      } else {
        ctx.fillText(category.label, labelX, labelY)
      }
    })

    // Draw blindspot points
    radarData.forEach(blindSpot => {
      if (filterCategory !== 'all' && blindSpot.category !== filterCategory) return

      const category = blindSpotCategories[blindSpot.category as keyof typeof blindSpotCategories]
      const coords = typeof blindSpot.coordinates === 'string' ? JSON.parse(blindSpot.coordinates) : blindSpot.coordinates
      const angle = (coords.angle * Math.PI) / 180 - Math.PI / 2
      const radius = (coords.radius / 100) * maxRadius
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      const pointSize = Number(blindSpot.industrySpecific) > 0 ? 8 : 6
      const ringSize = blindSpot.severity === 'Critical' ? 14 : 10

      if (Number(blindSpot.industrySpecific) > 0) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pointSize)
        gradient.addColorStop(0, category?.color || '#3b82f6')
        gradient.addColorStop(1, (category?.color || '#3b82f6') + '80')
        ctx.fillStyle = gradient
      } else {
        ctx.fillStyle = category?.color || '#3b82f6'
      }

      ctx.beginPath()
      ctx.arc(x, y, pointSize, 0, 2 * Math.PI)
      ctx.fill()

      if (blindSpot.severity === 'Critical') {
        ctx.strokeStyle = '#dc2626'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, ringSize, 0, 2 * Math.PI)
        ctx.stroke()
      }
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 60

    let closestBlindSpot = null
    let minDistance = Infinity

    radarData.forEach(blindSpot => {
      if (filterCategory !== 'all' && blindSpot.category !== filterCategory) return
      
      const coords = typeof blindSpot.coordinates === 'string' ? JSON.parse(blindSpot.coordinates) : blindSpot.coordinates
      const angle = (coords.angle * Math.PI) / 180 - Math.PI / 2
      const radius = (coords.radius / 100) * maxRadius
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2)
      if (distance <= 20 && distance < minDistance) {
        minDistance = distance
        closestBlindSpot = blindSpot
      }
    })

    if (closestBlindSpot) {
      onPointClick(closestBlindSpot)
    }
  }

  useEffect(() => {
    drawRadar()
  }, [radarData, filterCategory])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        onClick={handleClick}
        className="w-full h-auto border border-gray-200 rounded-lg cursor-pointer bg-slate-50/50"
      />
      {radarData.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Complete industry setup and analysis to populate radar</p>
          </div>
        </div>
      )}
    </div>
  )
}
