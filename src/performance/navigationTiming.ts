import { YNavigationTiming } from '../typings';
import { isPerformanceSupported } from '../helps/isSupported';

/**
 * Navigation Timing API provides performance metrics for HTML documents.
 * w3c.github.io/navigation-timing/
 * developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 */
export const getNavigationTiming = ():YNavigationTiming => {
    // 不支持性能检测api直接返回
    if (!isPerformanceSupported) return {};

    // 这里直接的物理赋值performance.timing 已被弃用
    const t = performance.getEntriesByType('navigation')[0] as any;
    if (!t) return {};

    const responseStart = t.responseStart;
    const responseEnd = t.responseEnd;

    return {
        // fetchStart marks when the browser starts to fetch a resource
        // responseEnd marks when the last byte of the response arrives
        fetchTime: responseEnd - t.fetchStart || 0,
        // serviecworker time plus response time
        workerTime: t.workerStart ? responseEnd - t.workerStart : 0,
        // requset plus response time (network noly)
        totalTime: responseEnd - t.requestStart || 0,
        // response time only 
        downloadTime: responseEnd - responseStart || 0,
        // TTFB
        timeToFirstByte: responseStart - t.fetchStart || 0,
        // http header size
        headerSize: t.transferSize - t.encodedBodySize || 0,
        // DNS解析时间
        dnsLookupTime: t.dnsLookupTimeEnd - t.dnsLookupTimeStart || 0,
        // tcp建立链接时间
        tcpTime: t.connectEnd - t.connectStart || 0,
        // 白屏时间
        whiteTime: responseStart - t.navigationStart || 0,
        // 页面渲染dom时间
        domTime: t.domContentLoadedEventEnd - t.navigationStart || 0,
        // 页面加载时间
        loadTime: t.loadEventEnd - t.navigationStart || 0,
        // DOM解析时间
        parseDomTime: t.domComplete - t.domInteractive || 0,
    }
}