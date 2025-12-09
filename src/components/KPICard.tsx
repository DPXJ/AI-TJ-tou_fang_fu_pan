import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { KPIData } from '../data/mockData'

interface KPICardProps {
  data: KPIData
}

export default function KPICard({ data }: KPICardProps) {
  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-dark-success" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-dark-danger" />
      default:
        return <Minus className="w-4 h-4 text-dark-textSecondary" />
    }
  }

  const getChangeColor = () => {
    if (data.isWarning) return 'text-red-400'
    if (data.trend === 'up') return 'text-dark-success'
    if (data.trend === 'down') return 'text-dark-danger'
    return 'text-dark-textSecondary'
  }

  return (
    <div className={`bg-dark-card border border-dark-border rounded-lg p-5 hover:border-dark-accent transition-all ${
      data.isWarning ? 'ring-2 ring-red-500/50' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm text-dark-textSecondary">{data.name}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="mb-2">
        <span className={`text-2xl font-bold ${
          data.isWarning ? 'text-red-400' : 'text-white'
        }`}>
          {data.value}
        </span>
      </div>
      
      <div className="flex items-center gap-1 text-xs">
        <span className={getChangeColor()}>
          {data.change > 0 ? '🔼' : data.change < 0 ? '🔽' : '➖'} {Math.abs(data.change)}%
        </span>
        <span className="text-dark-textSecondary">同比/环比</span>
      </div>
    </div>
  )
}

