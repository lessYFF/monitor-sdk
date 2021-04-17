import { YPerformanceEntry } from '../typings'
import { logInfo, logMetric, metrics, rt } from '../data'
import { performanceObserver } from './observe'

// 初始化首次输入延迟
export const initFirstInputDelay = (performanceEntries: YPerformanceEntry[]):void => {
    const lastEntry = performanceEntries.pop()

    if (lastEntry) {
        // 传统fid测量
        logMetric('fid', lastEntry.duration, {
            performanceEntries: lastEntry,
        })
        logMetric('fidVitals', lastEntry.processingStart - lastEntry.startTime, {
            performanceEntries: lastEntry,
        })
    }
    performanceObserver.poDisconnect('first-input')

    logMetric('tbt', metrics.tbt)
    logMetric('cls', metrics.cls)
    // TBT with 5 second delay after FID
    setTimeout(() => {
        logMetric('tbt5S', metrics.tbt)
    }, 5000)
    // TBT with 10 second delay after FID
    setTimeout(() => {
        logMetric('tbt10S', metrics.tbt)
        //FID被激活以后10S的整体数据消耗
        logInfo('consumptionInfo', rt.value)
    }, 10000)
}