import { kpiData, materialData, videoMetrics, channelData, crowdData } from '../data/mockData'
import KPICard from '../components/KPICard'
import MaterialQuadrant from '../components/MaterialQuadrant'
import VideoMetricsList from '../components/VideoMetricsList'
import ChannelComparison from '../components/ChannelComparison'
import CrowdROIAnalysis from '../components/CrowdROIAnalysis'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 第一屏：大盘核心水位 */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">全局指挥舱</h1>
        <p className="text-sm text-dark-textSecondary mb-6">
          一屏掌控大盘水位，实时监控关键指标变化
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} data={kpi} />
          ))}
        </div>
      </div>

      {/* 第二屏：智能素材复盘引擎 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaterialQuadrant data={materialData} />
        <VideoMetricsList data={videoMetrics} />
      </div>

      {/* 第三屏：多维归因钻取 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChannelComparison data={channelData} />
        <CrowdROIAnalysis data={crowdData} />
      </div>
    </div>
  )
}

