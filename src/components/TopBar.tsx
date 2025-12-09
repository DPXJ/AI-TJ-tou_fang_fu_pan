import { Bell, Calendar, Filter } from 'lucide-react'
import { useState } from 'react'

export default function TopBar() {
  const [selectedTime, setSelectedTime] = useState('yesterday')
  const [selectedProject, setSelectedProject] = useState('all')
  const [hasAlert, setHasAlert] = useState(true)

  const timeOptions = [
    { value: 'yesterday', label: '昨日' },
    { value: '7days', label: '近7天' },
    { value: 'month', label: '本月' },
    { value: 'custom', label: '自定义范围' }
  ]

  const projectOptions = [
    { value: 'all', label: '全部项目' },
    { value: 'tech', label: '科技营销获客' },
    { value: 'leadership', label: '思想领导力涨粉' },
    { value: 'boss', label: '老板云' }
  ]

  return (
    <div className="h-16 bg-dark-surface border-b border-dark-border flex items-center justify-between px-6">
      {/* 左侧：筛选器 */}
      <div className="flex items-center gap-4">
        {/* 时间选择器 */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-dark-textSecondary" />
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="bg-dark-card border border-dark-border rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-dark-accent"
          >
            {timeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 项目筛选器 */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-dark-textSecondary" />
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="bg-dark-card border border-dark-border rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-dark-accent"
          >
            {projectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 右侧：预警通知 */}
      <div className="flex items-center gap-4">
        {hasAlert && (
          <div className="relative">
            <button className="relative p-2 hover:bg-dark-card rounded transition-colors">
              <Bell className="w-5 h-5 text-dark-textSecondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            {/* 提示框 */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-dark-card border border-dark-border rounded-lg shadow-xl p-3 z-50">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white mb-1">检测到异常</p>
                  <p className="text-xs text-dark-textSecondary">
                    检测到"黑洞素材"消耗异常，建议关停
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

