/**
 * 一款开源的性能、异常监控sdk
 * @remarks
 * 目前支持监控的性能指标：FCP、LCP、FID、TBT、CLS
 * @packageDocumentation
 */


declare enum AskPriority {
  URGENT = 1,
  IDLE = 2,
}

declare type EffectiveConnectionType =
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'slow-2g'
  | 'lte';

/**
 * 分析工具参数
 * @param metricName - 分析指标
 * @param data - 分析数据
 * @param eventProperties - 分析事件属性
 * @param navigatorInformation - 
 * @param score - 分析评分
 */
declare interface YAnalyticsTrackerOptions {
    metricName: string;
    data: YMonitorData;
    customProperties: object;
    navigatorInfo: YNavigatorInfo;
    netWorkInfo?: YNetworkInfo;
    score: YScore;
}

declare interface YConsumption {
  css: number;
  img: number;
  other: number;
  script: number;
  total: number;
  beacon: number;
  fetch: number;
  xmlhttprequest: number;
}

export declare class YMonitor {
    private version;
    private report;
    constructor(options: YMonitorOptions);
    initErrorMonitor(args: YMonitorConfig): void;
    initPerformanceMonitor(args: YMonitorConfig): void;
}

declare interface YMonitorConfig {
    isPerformanceTiming?: boolean;
    isResoureTiming?: boolean;
    isErrorCapture?: boolean;
    maxTime?: number;
    report: YMonitorReport;
    analyticsTracker?: (options: YAnalyticsTrackerOptions) => void;
}

declare type YMonitorData = YNavigationTiming | YConsumption;

/**
 * 监控入口参数
 * @param isPerformanceTiming - 是否开启性能监控
 * @param isResoureTiming - 是否开启资源监控
 * @param isErrorCapture - 是否开启异常监控
 * @param maxMeasureTime - 最大监控时间
 * @param upUrl - 上报url
 * @param analyticsTracker - 监控方法
 */
declare interface YMonitorOptions {
    isPerformanceTiming?: boolean;
    isResoureTiming?: boolean;
    isErrorCapture?: boolean;
    maxMeasureTime?: number;
    upUrl: string;
    analyticsTracker?: (options: YAnalyticsTrackerOptions) => void;
}

declare interface YMonitorReport {
    sendToAnalytics(level: AskPriority, data: string, uri?: string): void;
}

/**
 * 页面请求渲染时间
 */
declare interface YNavigationTiming {
  fetchTime?: number;
  workerTime?: number;
  totalTime?: number;
  downloadTime?: number;
  timeToFirstByte?: number;
  headerSize?: number;
  dnsLookupTime?: number;
  tcpTime?: number;
  whiteTime?: number;
  domTime?: number;
  loadTime?: number;
  parseDomTime?: number;
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
declare interface YNavigatorInfo {
    appName?: string;
    appVersion?: string;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    isLowEndDevice?: boolean;
    isLowEndExperience?: boolean;
    serviceWorkerStatus?: 'controlled' | 'supported' | 'unSupported';
}

declare interface YNetworkInfo {
  downlink?: number;
  effectiveType?: EffectiveConnectionType;
  onchange?: () => void;
  rtt?: number;
  saveData?: boolean;
}

declare type YScore = 'good' | 'needsImprovement' | 'poor';

export { }
