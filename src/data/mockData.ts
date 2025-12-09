// 模拟数据文件

export interface KPIData {
  name: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  isWarning?: boolean
}

export interface MaterialData {
  id: string
  name: string
  cost: number
  cpa: number
  quadrant: 'explosive' | 'blackhole' | 'potential' | 'observe'
  videoUrl?: string
}

export interface VideoMetrics {
  id: string
  name: string
  play3sRate: number
  play50Rate: number
  completeRate: number
  conversionRate: number
  lossAnalysis: {
    stage: string
    value: number
  }[]
}

export interface ChannelData {
  name: string
  cpm: number
  cpl: number
  attendanceRate: number
}

export interface CrowdData {
  date: string
  middleLibrary: {
    cpl: number
    attendanceRate: number
    dealAmount: number
  }
  normal: {
    cpl: number
    attendanceRate: number
    dealAmount: number
  }
}

// KPI数据
export const kpiData: KPIData[] = [
  {
    name: '总花费',
    value: '¥ 125,000',
    change: 12,
    trend: 'up'
  },
  {
    name: '总线索量',
    value: '350 个',
    change: 5,
    trend: 'up'
  },
  {
    name: '线索成本',
    value: '¥ 357.1',
    change: 8,
    trend: 'up',
    isWarning: true
  },
  {
    name: '参会率',
    value: '45%',
    change: 0,
    trend: 'stable'
  },
  {
    name: 'ROI',
    value: '1:2.5',
    change: 0.3,
    trend: 'up'
  }
]

// 素材象限数据
export const materialData: MaterialData[] = [
  { id: 'M001', name: '科技营销视频A', cost: 45000, cpa: 280, quadrant: 'explosive' },
  { id: 'M002', name: '老板云宣传片', cost: 38000, cpa: 320, quadrant: 'explosive' },
  { id: 'M003', name: '思想领导力视频', cost: 52000, cpa: 680, quadrant: 'blackhole' },
  { id: 'M004', name: '产品介绍视频', cost: 15000, cpa: 420, quadrant: 'blackhole' },
  { id: 'M005', name: '案例分享视频', cost: 8000, cpa: 250, quadrant: 'potential' },
  { id: 'M006', name: '行业洞察视频', cost: 12000, cpa: 380, quadrant: 'potential' },
  { id: 'M007', name: '品牌宣传视频', cost: 22000, cpa: 550, quadrant: 'observe' },
  { id: 'M008', name: '客户见证视频', cost: 18000, cpa: 480, quadrant: 'observe' },
]

// 视频深度指标
export const videoMetrics: VideoMetrics[] = [
  {
    id: 'V001',
    name: '科技营销视频A',
    play3sRate: 85,
    play50Rate: 72,
    completeRate: 58,
    conversionRate: 12.5,
    lossAnalysis: [
      { stage: '3秒播放', value: 100 },
      { stage: '50%进度', value: 85 },
      { stage: '完播', value: 72 },
      { stage: '转化', value: 12.5 }
    ]
  },
  {
    id: 'V002',
    name: '老板云宣传片',
    play3sRate: 78,
    play50Rate: 65,
    completeRate: 52,
    conversionRate: 10.8,
    lossAnalysis: [
      { stage: '3秒播放', value: 100 },
      { stage: '50%进度', value: 78 },
      { stage: '完播', value: 65 },
      { stage: '转化', value: 10.8 }
    ]
  },
  {
    id: 'V003',
    name: '思想领导力视频',
    play3sRate: 62,
    play50Rate: 48,
    completeRate: 35,
    conversionRate: 5.2,
    lossAnalysis: [
      { stage: '3秒播放', value: 100 },
      { stage: '50%进度', value: 62 },
      { stage: '完播', value: 48 },
      { stage: '转化', value: 5.2 }
    ]
  },
  {
    id: 'V004',
    name: '产品介绍视频',
    play3sRate: 70,
    play50Rate: 55,
    completeRate: 42,
    conversionRate: 7.8,
    lossAnalysis: [
      { stage: '3秒播放', value: 100 },
      { stage: '50%进度', value: 70 },
      { stage: '完播', value: 55 },
      { stage: '转化', value: 7.8 }
    ]
  },
  {
    id: 'V005',
    name: '案例分享视频',
    play3sRate: 88,
    play50Rate: 75,
    completeRate: 62,
    conversionRate: 14.2,
    lossAnalysis: [
      { stage: '3秒播放', value: 100 },
      { stage: '50%进度', value: 88 },
      { stage: '完播', value: 75 },
      { stage: '转化', value: 14.2 }
    ]
  }
]

// 渠道数据
export const channelData: ChannelData[] = [
  {
    name: '巨量引擎',
    cpm: 45.2,
    cpl: 320.5,
    attendanceRate: 38
  },
  {
    name: '腾讯广点通',
    cpm: 52.8,
    cpl: 385.6,
    attendanceRate: 52
  }
]

// 人群包数据（最近7天）
export const crowdData: CrowdData[] = [
  {
    date: '2024-01-15',
    middleLibrary: { cpl: 420, attendanceRate: 58, dealAmount: 125000 },
    normal: { cpl: 320, attendanceRate: 35, dealAmount: 68000 }
  },
  {
    date: '2024-01-16',
    middleLibrary: { cpl: 435, attendanceRate: 62, dealAmount: 142000 },
    normal: { cpl: 315, attendanceRate: 32, dealAmount: 72000 }
  },
  {
    date: '2024-01-17',
    middleLibrary: { cpl: 410, attendanceRate: 55, dealAmount: 118000 },
    normal: { cpl: 328, attendanceRate: 38, dealAmount: 75000 }
  },
  {
    date: '2024-01-18',
    middleLibrary: { cpl: 445, attendanceRate: 60, dealAmount: 135000 },
    normal: { cpl: 322, attendanceRate: 34, dealAmount: 71000 }
  },
  {
    date: '2024-01-19',
    middleLibrary: { cpl: 430, attendanceRate: 59, dealAmount: 128000 },
    normal: { cpl: 318, attendanceRate: 36, dealAmount: 69000 }
  },
  {
    date: '2024-01-20',
    middleLibrary: { cpl: 425, attendanceRate: 61, dealAmount: 138000 },
    normal: { cpl: 325, attendanceRate: 37, dealAmount: 74000 }
  },
  {
    date: '2024-01-21',
    middleLibrary: { cpl: 440, attendanceRate: 57, dealAmount: 132000 },
    normal: { cpl: 320, attendanceRate: 35, dealAmount: 70000 }
  }
]

