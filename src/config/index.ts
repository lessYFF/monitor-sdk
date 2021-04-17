import { YMonitorConfig } from '../typings'

export const config: YMonitorConfig = {
    isPerformanceTrace: true,
    isErrorCapture: true,
    isResoureTiming: true,
    isElementTiming: true,
    maxTime: 15000,
    report: null,
    analyticsTracker: null,
}