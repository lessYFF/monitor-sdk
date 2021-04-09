/**
 * 一款开源的性能、异常监控sdk
 * @remarks
 * 目前支持监控的性能指标：FCP、LCP、FID、TBT、CLS
 * @packageDocumentation
 */

import { YMonitorOptions, YMonitorConfig, YMonitorReport } from './typings'
import { isPerformanceSupported } from './helps'
import { Report, analyticsTracker } from './data'
import { initPerformanceTraceEntry } from './performance'
import { config } from './config'
import ErrorTrace from './error'

export class YMonitor {
    private version: string = '0.0.1'
    private report: YMonitorReport

    constructor(options: YMonitorOptions) {
        if (!options.upUrl) {
            throw Error(`监控sdk-${this.version}需提供上报uri!`)
        }

        Object.assign(config, options)
        config.report = new Report({ upUrl: options.upUrl })
        config.analyticsTracker = config.analyticsTracker || analyticsTracker
        // 对外暴露上报接口
        this.report = config.report

        // 初始化
        this.initErrorMonitor(config)
        this.initPerformanceMonitor(config)
    }

    // 初始化异常监控
    initErrorMonitor(args: YMonitorConfig) {
        if (!args.isErrorCapture) return

        new ErrorTrace().run()
    }

    // 初始化性能监控
    initPerformanceMonitor(args: YMonitorConfig) {
        //如果浏览器不支持性能指标或者未开启则放弃
        if (!isPerformanceSupported() || !args.isPerformanceTiming) return

        //浏览器支持的起FRP这样的Observer统计性能
        initPerformanceTraceEntry()
    }
}
