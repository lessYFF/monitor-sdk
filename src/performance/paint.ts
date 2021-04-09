import { YPerformanceEntry } from '../typings';
import { logMetric, metrics } from '../data';
import { performanceObserver } from './observe';

// 初始化首次绘制
export const initPaint = (performanceEntries: YPerformanceEntry[]): void => {
    performanceEntries.forEach(entry => {
        if (entry.name === 'first-paint') {
            logMetric('fp', entry.startTime);
        } else if (entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
            logMetric('fcp', metrics.fcp);
        }
    });
}