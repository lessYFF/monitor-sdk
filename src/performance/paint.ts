import { YPerformanceEntry } from '../typings'
import { logMetric, metrics } from '../data'
import { performanceObserver } from './observe'

// 初始化首次绘制
export const initPaint = (performanceEntries: YPerformanceEntry[]): void => {
    performanceEntries.some((entry) => {
        if (entry.name === 'first-paint') {
            logMetric('fp', entry.startTime)
            return true
        } else if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime
            logMetric('fcp', metrics.fcp)
            return true
        }
    })
    // 解除监听
    performanceObserver.poDisconnect('paint')
}

// 初始化最大内容绘制
export const initLargestContentfulPaint = (performanceEntries: YPerformanceEntry[]): void => {
    const lastEntry = performanceEntries.pop()

    if (lastEntry) {
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime
        logMetric('lcp', metrics.lcp)
    }
}

// 初始化元素渲染时间
export const initElementTiming = (performanceEntries: YPerformanceEntry[]): void => {
    performanceEntries.some(entry => {
        if (entry.identifier) {
            logMetric(entry.identifier, entry.startTime)
        }
    })
}
