import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CrowdData } from '../data/mockData'
import { format } from 'date-fns'

interface CrowdROIAnalysisProps {
  data: CrowdData[]
}

export default function CrowdROIAnalysis({ data }: CrowdROIAnalysisProps) {
  // 转换数据格式
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MM/dd'),
    中间库CPL: item.middleLibrary.cpl,
    普通人群CPL: item.normal.cpl,
    中间库参会率: item.middleLibrary.attendanceRate,
    普通人群参会率: item.normal.attendanceRate,
    中间库成交金额: item.middleLibrary.dealAmount / 1000, // 转换为千元
    普通人群成交金额: item.normal.dealAmount / 1000
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.name.includes('CPL') ? '元' : entry.name.includes('成交金额') ? '千元' : '%'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  // 计算平均值
  const avgMiddleLibraryCPL = data.reduce((sum, d) => sum + d.middleLibrary.cpl, 0) / data.length
  const avgNormalCPL = data.reduce((sum, d) => sum + d.normal.cpl, 0) / data.length
  const avgMiddleLibraryAttendance = data.reduce((sum, d) => sum + d.middleLibrary.attendanceRate, 0) / data.length
  const avgNormalAttendance = data.reduce((sum, d) => sum + d.normal.attendanceRate, 0) / data.length
  const avgMiddleLibraryDeal = data.reduce((sum, d) => sum + d.middleLibrary.dealAmount, 0) / data.length
  const avgNormalDeal = data.reduce((sum, d) => sum + d.normal.dealAmount, 0) / data.length

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">人群包价值验证 (中间库 vs 普通人群)</h2>
      
      <div className="space-y-8">
        {/* CPL对比折线图 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">线索成本 (CPL) 趋势对比</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'CPL (元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="中间库CPL" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="普通人群CPL" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 参会率对比折线图 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">参会率趋势对比</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: '参会率 (%)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="中间库参会率" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="普通人群参会率" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 成交金额对比折线图 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">成交金额趋势对比 (千元)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: '成交金额 (千元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="中间库成交金额" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="普通人群成交金额" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 数据汇总卡片 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-dark-textSecondary mb-2">平均CPL</p>
            <div className="space-y-1">
              <p className="text-sm text-blue-400">中间库: ¥{avgMiddleLibraryCPL.toFixed(1)}</p>
              <p className="text-sm text-green-400">普通人群: ¥{avgNormalCPL.toFixed(1)}</p>
              <p className="text-xs text-dark-textSecondary mt-2">
                差异: +{((avgMiddleLibraryCPL / avgNormalCPL - 1) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-dark-textSecondary mb-2">平均参会率</p>
            <div className="space-y-1">
              <p className="text-sm text-blue-400">中间库: {avgMiddleLibraryAttendance.toFixed(1)}%</p>
              <p className="text-sm text-green-400">普通人群: {avgNormalAttendance.toFixed(1)}%</p>
              <p className="text-xs text-dark-textSecondary mt-2">
                提升: +{((avgMiddleLibraryAttendance / avgNormalAttendance - 1) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <p className="text-xs text-dark-textSecondary mb-2">平均成交金额</p>
            <div className="space-y-1">
              <p className="text-sm text-blue-400">中间库: ¥{(avgMiddleLibraryDeal / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-400">普通人群: ¥{(avgNormalDeal / 1000).toFixed(0)}k</p>
              <p className="text-xs text-dark-textSecondary mt-2">
                提升: +{((avgMiddleLibraryDeal / avgNormalDeal - 1) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* 业务价值说明 */}
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <p className="text-sm text-white mb-2">💡 业务价值分析：</p>
          <p className="text-xs text-dark-textSecondary leading-relaxed">
            虽然"中间库"人群前端CPL略高（平均高{((avgMiddleLibraryCPL / avgNormalCPL - 1) * 100).toFixed(1)}%），
            但后端的"参会率"和"成交金额"显著更高（参会率提升{((avgMiddleLibraryAttendance / avgNormalAttendance - 1) * 100).toFixed(1)}%，
            成交金额提升{((avgMiddleLibraryDeal / avgNormalDeal - 1) * 100).toFixed(1)}%）。
            数据证明了"百日冲刺博鳌"等特定人群包的实际效果，建议继续加大中间库人群的投放力度。
          </p>
        </div>
      </div>
    </div>
  )
}

