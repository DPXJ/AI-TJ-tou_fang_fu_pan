import { 
  LayoutDashboard, 
  BarChart3, 
  Film, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: '全局指挥舱', icon: LayoutDashboard },
    { 
      id: 'reports', 
      label: '多维报表分析', 
      icon: BarChart3,
      children: [
        { id: 'project', label: '项目分析' },
        { id: 'channel', label: '渠道分析' },
        { id: 'crowd', label: '人群包分析' }
      ]
    },
    { id: 'material', label: '智能素材引擎', icon: Film },
    { id: 'settings', label: '配置管理', icon: Settings }
  ]

  return (
    <div className={`bg-dark-surface border-r border-dark-border transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    } flex flex-col`}>
      {/* Logo区域 */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border">
        {isOpen && (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white">熵变智元</span>
            <span className="text-xs text-dark-textSecondary">智能营销中枢</span>
          </div>
        )}
        {!isOpen && (
          <div className="text-2xl font-bold text-white">熵</div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-dark-card transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5 text-dark-textSecondary" />
          ) : (
            <ChevronRight className="w-5 h-5 text-dark-textSecondary" />
          )}
        </button>
      </div>

      {/* 菜单项 */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeMenu === item.id
          
          return (
            <div key={item.id}>
              <button
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-1 transition-colors ${
                  isActive 
                    ? 'bg-dark-accent text-white' 
                    : 'text-dark-textSecondary hover:bg-dark-card hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="text-sm">{item.label}</span>}
              </button>
              
              {/* 子菜单 */}
              {isOpen && item.children && isActive && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      className="w-full text-left px-4 py-2 text-sm text-dark-textSecondary hover:text-white hover:bg-dark-card rounded transition-colors"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

