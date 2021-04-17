import { YPerformanceEntry } from '../typings'
import { logInfo, rt } from '../data'
import { config } from '../config'

// 初始化资源时间
export const initResourceTiming = (performanceEntries: YPerformanceEntry[]): void => {
    performanceEntries.forEach(entry => {
        if (config.isResoureTiming) {
            logInfo('resourceTiming', entry)
        }
        if (entry.decodedBodySize && entry.initiatorType) {
            const bodySize = entry.decodedBodySize / 1000
            rt.value[entry.initiatorType] += bodySize;
            rt.value.total += bodySize;
        }
    });
}