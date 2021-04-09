import { config } from '../config';
import { isEstimateSupported, isVisibleChangeSupported, didVisibilityChange } from '../helps';
import { WNav, D, metrics, logMetric, logInfo } from '../data';
import { performanceObserver } from './observe';
import  { initPaint } from './paint';
import { getNavigationTiming } from './navigationTiming';
import { getStorageEstimate } from './storageEstimate';

// 根据参数监听相关指标
const initPerformanceObserver = (): void => {
    console.log('⏰ 性能收集开始', Math.random())
    performanceObserver.poConnect('paint', initPaint)
    // performanceObserver.poConnect('first-input-delay', initFirstInputDelay);
    // performanceObserver.poConnect('largest-contentful-paint', initLargestContentfulPaint);
    // performanceObserver.poConnect('cumulative-layout-shift', initCumulativeLayoutShift);

    // if (config.isResoureTiming) {
    //     performanceObserver.poConnect('resource', initResource);
    // }
    // if (config.isPerformanceTiming) {
    //     performanceObserver.poConnect('element', initElement);
    // }
}

// 根据相关检测指标解除监听
const disconnectPerformanceObserve = (args: string[] | string): void => {
    const list = Array.isArray(args) ? args : [args];

    list.forEach(metric => {
        performanceObserver.poDisconnect(metric);
        logMetric(metric, metrics[metric]);
    });
}

// 初始化性能监控
export const initPerformanceTraceEntry = (): void => {
    //监控相关指标
    initPerformanceObserver();

    //页面性能
    logInfo('navigationTiming', getNavigationTiming());

    //管理离线缓存数据
    if (isEstimateSupported()) {
        WNav.storage.estimate().then(getStorageEstimate);
    }

    //页面切换时解除观察
    if (isVisibleChangeSupported()) {
        D.addEventListener('visibilitychange', didVisibilityChange.bind(this, disconnectPerformanceObserveHidden));
    }
}

// 页面隐藏时解除监听性能指标
export const disconnectPerformanceObserveHidden = (): void => {
    disconnectPerformanceObserve(['paint']);
}