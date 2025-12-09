import { FunnelChart, Funnel, Cell, LabelList, ResponsiveContainer, Tooltip } from 'recharts'
import { VideoMetrics } from '../data/mockData'

interface VideoMetricsListProps {
  data: VideoMetrics[]
}

export default function VideoMetricsList({ data }: VideoMetricsListProps) {
  const top5Videos = data.slice(0, 5)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-white mb-1">{payload[0].name}</p>
          <p className="text-xs text-dark-textSecondary">
            数值: {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">视频深度指标分析 (Top 5)</h2>
      
      <div className="space-y-6">
        {top5Videos.map((video) => (
          <div key={video.id} className="border-b border-dark-border pb-6 last:border-0 last:pb-0">
            <div className="mb-4">
              <h3 className="text-base font-medium text-white mb-2">{video.name}</h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-dark-textSecondary mb-1">3秒完播率</p>
                  <p className="text-white font-semibold">{video.play3sRate}%</p>
                </div>
                <div>
                  <p className="text-dark-textSecondary mb-1">50%进度</p>
                  <p className="text-white font-semibold">{video.play50Rate}%</p>
                </div>
                <div>
                  <p className="text-dark-textSecondary mb-1">完播率</p>
                  <p className="text-white font-semibold">{video.completeRate}%</p>
                </div>
                <div>
                  <p className="text-dark-textSecondary mb-1">转化率</p>
                  <p className="text-white font-semibold">{video.conversionRate}%</p>
                </div>
              </div>
            </div>

            {/* 漏斗图 */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Funnel
                    dataKey="value"
                    data={video.lossAnalysis}
                    isAnimationActive
                  >
                    {video.lossAnalysis.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={
                          index === 0 ? '#3b82f6' :
                          index === 1 ? '#10b981' :
                          index === 2 ? '#f59e0b' :
                          '#ef4444'
                        }
                      />
                    ))}
                    <LabelList 
                      position="right" 
                      fill="#94a3b8" 
                      stroke="none" 
                      dataKey="stage"
                      formatter={(value: string) => `${value}`}
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>

            {/* 流失分析说明 */}
            <div className="mt-3 text-xs text-dark-textSecondary">
              <p>流失分析：从 {video.lossAnalysis[0].value}% 到 {video.lossAnalysis[video.lossAnalysis.length - 1].value}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

