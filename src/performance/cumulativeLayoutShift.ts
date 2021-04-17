import { YPerformanceEntry } from '../typings'
import { logMetric, metrics } from '../data'

// 初始化累计位移偏移
export const initCumulativeLayoutShift = (performanceEntries: YPerformanceEntry[]): void => {
    const lastEntry = performanceEntries.pop();

    if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
        metrics.cls += lastEntry.value
        logMetric('cls', metrics.cls)
    }
}