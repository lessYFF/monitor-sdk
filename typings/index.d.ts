/**
 * 一款开源的性能、异常监控sdk
 * @remarks
 * 目前支持监控的性能指标：FCP、LCP、FID、TBT、CLS
 * @packageDocumentation
 */
import { YMonitorOptions, YMonitorConfig } from './typings';
export declare class YMonitor {
    private version;
    private report;
    constructor(options: YMonitorOptions);
    initErrorMonitor(args: YMonitorConfig): void;
    initPerformanceMonitor(args: YMonitorConfig): void;
}
//# sourceMappingURL=index.d.ts.map