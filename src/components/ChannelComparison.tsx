import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { ChannelData } from '../data/mockData'

interface ChannelComparisonProps {
  data: ChannelData[]
}

export default function ChannelComparison({ data }: ChannelComparisonProps) {
  // 准备CPM数据
  const cpmData = data.map(item => ({
    name: item.name,
    CPM: item.cpm
  }))

  // 准备CPL数据
  const cplData = data.map(item => ({
    name: item.name,
    CPL: item.cpl
  }))

  // 准备参会率数据
  const attendanceData = data.map(item => ({
    name: item.name,
    参会率: item.attendanceRate
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-2">{payload[0].payload.name}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs text-dark-textSecondary">
              {entry.name}: {entry.value}{entry.name === 'CPM' || entry.name === 'CPL' ? '元' : '%'}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const colors = ['#3b82f6', '#10b981']

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">渠道效能对比</h2>
      
      <div className="space-y-8">
        {/* CPM对比 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">千次曝光成本 (CPM) 对比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cpmData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'CPM (元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="CPM" radius={[8, 8, 0, 0]}>
                {cpmData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CPL对比 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">线索成本 (CPL) 对比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cplData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: 'CPL (元)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="CPL" radius={[8, 8, 0, 0]}>
                {cplData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 参会率对比 */}
        <div>
          <h3 className="text-sm font-medium text-dark-textSecondary mb-4">参会率对比</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253159" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" label={{ value: '参会率 (%)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="参会率" radius={[8, 8, 0, 0]}>
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 结论展示 */}
        <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
          <p className="text-sm text-white mb-2">📊 分析结论：</p>
          <p className="text-xs text-dark-textSecondary">
            巨量引擎获客成本较低（CPL: ¥{data[0].cpl}），但腾讯广点通后端参会率更高（{data[1].attendanceRate}% vs {data[0].attendanceRate}%），
            建议根据业务目标平衡投放策略。
          </p>
        </div>
      </div>
    </div>
  )
}

