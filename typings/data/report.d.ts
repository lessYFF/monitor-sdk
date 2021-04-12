import { AskPriority, YMonitorReport, ReportOtions } from '../typings';
export declare class Report implements YMonitorReport {
    private upUrl;
    constructor(options: ReportOtions);
    /**
     * 统一上报方法
     * @param level - 上报等级
     * @param data - 上报数据
     * @param uri - 上报uri
     */
    sendToAnalytics(level: AskPriority, data: string, uri?: string): void;
    /**
     * 性能上报方法
     * @param metricName - 性能指标
     * @param data - 性能数据
     * @param customProperties - 自定义数据
     */
    static reportPerformance(metricName: string, data: any, customProperties?: object): void;
}
//# sourceMappingURL=report.d.ts.map