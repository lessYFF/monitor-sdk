/**
 * 监控入口参数
 * @param isPerformanceTrace - 是否开启性能监控
 * @param isErrorCapture -  是否开启异常监控
 * @param isResoureTiming - 是否开启资源监控
 * @param isElementTiming - 是否开启元素监控
 * @param maxMeasureTime -  最大监控时间
 * @param upUrl - 上报url
 * @param analyticsTracker - 监控方法
 */
export interface YMonitorOptions {
    isPerformanceTrace?: boolean
    isErrorCapture?: boolean
    isResoureTiming?: boolean
    isElementTiming?: boolean
    maxMeasureTime?: number
    upUrl: string
    analyticsTracker?: (options: YAnalyticsTrackerOptions) => void
}

// 监控配置参数
export interface YMonitorConfig {
    isPerformanceTrace?: boolean
    isResoureTiming?: boolean
    isElementTiming?: boolean
    isErrorCapture?: boolean
    maxTime?: number
    report: YMonitorReport
    analyticsTracker?: (options: YAnalyticsTrackerOptions) => void
}

/**
 * 分析工具参数
 * @param metricName - 分析指标
 * @param data - 分析数据
 * @param eventProperties - 分析事件属性
 * @param navigatorInformation -
 * @param score - 分析评分
 */
export interface YAnalyticsTrackerOptions {
    metricName: string
    data: YMonitorData
    customProperties: object
    navigatorInfo: YNavigatorInfo
    netWorkInfo?: YNetworkInfo
    score: YScore
}

// 监控指标的相关信息
export type YMonitorData = YNavigationTiming | YConsumption

/**
 * 页面请求渲染时间
 */
export interface YNavigationTiming {
    fetchTime?: number
    workerTime?: number
    totalTime?: number
    downloadTime?: number
    timeToFirstByte?: number
    headerSize?: number
    dnsLookupTime?: number
    tcpTime?: number
    whiteTime?: number
    domTime?: number
    loadTime?: number
    parseDomTime?: number
}

// 监控资源类别
export interface YConsumption {
    css: number
    img: number
    other: number
    script: number
    total: number
    beacon: number
    fetch: number
    xmlhttprequest: number
}

// 网络类型
export type EffectiveConnectionType = '2g' | '3g' | '4g' | '5g' | 'slow-2g' | 'lte'

// 网络信息
export interface YNetworkInfo {
    downlink?: number
    effectiveType?: EffectiveConnectionType
    onchange?: () => void
    rtt?: number
    saveData?: boolean
}

/**
 * 浏览器信息
 * @param appName - 应用名称
 * @param appVersion - 应用版本
 * @param deviceMemory - 设备内存
 * @param hardwareConcurrency - cpu核数
 * @param serviceWorkerStatus - serviceWorker状态
 * @param isLowEndDevice - 是否低性能设备
 * @param isLowEndExperience - 是否体验欠佳设备
 */
export interface YNavigatorInfo {
    appName?: string
    appVersion?: string
    deviceMemory?: number
    hardwareConcurrency?: number
    isLowEndDevice?: boolean
    isLowEndExperience?: boolean
    serviceWorkerStatus?: 'controlled' | 'supported' | 'unSupported'
}

// 评分等级
export type YScore = 'good' | 'needsImprovement' | 'poor'

// 监控上报方法
export interface YMonitorReport {
    sendToAnalytics(level: AskPriority, data: string, uri?: string): void
}

// 优先级
export enum AskPriority {
    URGENT = 1,
    IDLE = 2,
}

// 上报参数
export type ReportOtions = {
    upUrl: string
}

// 错误类型枚举
export enum ErrorType {
    'SCRIPT' = 1,
    'PROMISE' = 2,
    'NETWORK' = 3,
}

// 性能监控对象
export interface YPerObservers {
    [measure: string]: any
}

// 性能指标
export type YPerformanceObserverType =
    | 'paint'
    | 'first-input'
    | 'largest-contentful-paint'
    | 'layout-shift'
    | 'longtask'
    | 'element'
    | 'resource'
    | 'measure'
    | 'navigation'

// 测量指标数据
export interface YMetricMap {
    [measureName: string]: number
}

// 测试资源入口
export interface YPerformanceEntry {
    processingStart: number
    decodedBodySize?: number
    duration: number
    entryType: YPerformanceObserverType
    initiatorType?: keyof YConsumption
    loadTime: number
    name: string
    renderTime: number
    startTime: number
    hadRecentInput?: boolean
    value?: number
    identifier?: string
}
