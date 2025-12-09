import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MaterialData } from '../data/mockData'
import { useState } from 'react'
import { X } from 'lucide-react'

interface MaterialQuadrantProps {
  data: MaterialData[]
}

interface TooltipContent {
  active?: boolean
  payload?: any[]
}

export default function MaterialQuadrant({ data }: MaterialQuadrantProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialData | null>(null)

  // 计算象限中心点（用于划分象限）
  const avgCost = data.reduce((sum, d) => sum + d.cost, 0) / data.length
  const avgCpa = data.reduce((sum, d) => sum + d.cpa, 0) / data.length

  const getQuadrantColor = (material: MaterialData) => {
    switch (material.quadrant) {
      case 'explosive':
        return '#10b981' // 绿色 - 爆款
      case 'blackhole':
        return '#ef4444' // 红色 - 黑洞
      case 'potential':
        return '#3b82f6' // 蓝色 - 潜力
      default:
        return '#94a3b8' // 灰色 - 待观察
    }
  }

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case 'explosive':
        return '🟢 爆款素材区'
      case 'blackhole':
        return '🔴 黑洞素材区'
      case 'potential':
        return '🔵 潜力素材区'
      default:
        return '⚪ 待观察区'
    }
  }

  const getSuggestion = (quadrant: string) => {
    switch (quadrant) {
      case 'explosive':
        return '系统建议：快速复制/加量'
      case 'blackhole':
        return '系统建议：立即止损/关停'
      case 'potential':
        return '系统建议：提升出价培养'
      default:
        return '系统建议：持续观察'
    }
  }

  const CustomTooltip = ({ active, payload }: TooltipContent) => {
    if (active && payload && payload.length) {
      const material = payload[0].payload as MaterialData
      return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-2">{material.name}</p>
          <p className="text-xs text-dark-textSecondary mb-1">
            消耗: ¥{material.cost.toLocaleString()}
          </p>
          <p className="text-xs text-dark-textSecondary mb-2">
            转化成本: ¥{material.cpa}
          </p>
          <p className="text-xs font-medium mb-1">{getQuadrantLabel(material.quadrant)}</p>
          <p className="text-xs text-dark-accent">{getSuggestion(material.quadrant)}</p>
          <button
            onClick={() => setSelectedMaterial(material)}
            className="mt-2 w-full text-xs bg-dark-accent hover:bg-dark-accentHover text-white px-3 py-1.5 rounded transition-colors"
          >
            查看详情
          </button>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">素材象限分布图</h2>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-dark-textSecondary">爆款</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-dark-textSecondary">黑洞</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-dark-textSecondary">潜力</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
          <XAxis 
            type="number" 
            dataKey="cpa" 
            name="转化成本(CPA)"
            label={{ value: '转化成本 (CPA)', position: 'insideBottom', offset: -5, style: { fill: '#94a3b8' } }}
            stroke="#94a3b8"
            domain={['dataMin - 50', 'dataMax + 50']}
          />
          <YAxis 
            type="number" 
            dataKey="cost" 
            name="消耗金额"
            label={{ value: '消耗金额 (Cost)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
            stroke="#94a3b8"
            domain={['dataMin - 5000', 'dataMax + 5000']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getQuadrantColor(entry)} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* 象限说明 */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
        <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
          <p className="text-green-400 font-medium mb-1">🟢 爆款素材区 (左上)</p>
          <p className="text-dark-textSecondary">高消耗 + 低成本</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
          <p className="text-red-400 font-medium mb-1">🔴 黑洞素材区 (右上/右下)</p>
          <p className="text-dark-textSecondary">高消耗 + 高成本</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
          <p className="text-blue-400 font-medium mb-1">🔵 潜力素材区 (左下)</p>
          <p className="text-dark-textSecondary">低消耗 + 低成本</p>
        </div>
        <div className="bg-gray-500/10 border border-gray-500/30 rounded p-3">
          <p className="text-gray-400 font-medium mb-1">⚪ 待观察区</p>
          <p className="text-dark-textSecondary">中等表现</p>
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedMaterial(null)}>
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">素材详情</h3>
              <button onClick={() => setSelectedMaterial(null)} className="text-dark-textSecondary hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-dark-textSecondary mb-1">素材名称</p>
                <p className="text-white">{selectedMaterial.name}</p>
              </div>
              <div>
                <p className="text-sm text-dark-textSecondary mb-1">素材ID</p>
                <p className="text-white">{selectedMaterial.id}</p>
              </div>
              <div>
                <p className="text-sm text-dark-textSecondary mb-1">消耗金额</p>
                <p className="text-white">¥{selectedMaterial.cost.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-dark-textSecondary mb-1">转化成本</p>
                <p className="text-white">¥{selectedMaterial.cpa}</p>
              </div>
              <div>
                <p className="text-sm text-dark-textSecondary mb-1">象限分类</p>
                <p className="text-white">{getQuadrantLabel(selectedMaterial.quadrant)}</p>
              </div>
              <div className="bg-dark-surface rounded p-3 mt-4">
                <p className="text-sm font-medium text-dark-accent">{getSuggestion(selectedMaterial.quadrant)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

