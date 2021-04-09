import { AskPriority, YMonitorReport, ReportOtions } from '../typings'
import { W, WNav } from '../data';
import { config } from '../config';
import { visibility, pushTask, getNavgatorInfo, getNetworkInfo, getVitalScope } from '../helps';

export class Report implements YMonitorReport {
    private upUrl: string;

    constructor(options: ReportOtions) {
        if (!options.upUrl) {
            throw Error('监控sdk需提供上报uri!');
        }
        this.upUrl = options.upUrl;
    }

    /**
     * 统一上报方法
     * @param level - 上报等级
     * @param data - 上报数据
     * @param uri - 上报uri
     */
    sendToAnalytics(level: AskPriority, data: string, uri?: string): void {
        const upUrl = uri || this.upUrl;

        // 高优先级处理
        if (level === AskPriority.URGENT) {
            if (!!W.fetch) {
                fetch(upUrl, { method: 'post', body: data, keepalive: true });
            } else {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open('post', upUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(data);
                xhr.onload = function() {
                    if (this.status === 200 || this.status === 304) {
                        console.log('xhr response', this.response);
                    }
                    //及时清理以防多次创建
                    xhr = null;
                }
            }
        } else if (level === AskPriority.IDLE) {
            if (!!WNav.sendBeacon) {
                WNav.sendBeacon(upUrl, data);
            } else {
                let img: HTMLImageElement = new Image();
                img.src = `${upUrl}?body=${data}`;
                img.onload = function() {
                    //统计完成收回创建的元素防止内存泄露
                    img = null;
                }
            }
        }
    }

    /**
     * 性能上报方法
     * @param metricName - 性能指标
     * @param data - 性能数据
     * @param customProperties - 自定义数据
     */ 
    static reportPerformance(metricName: string, data: any, customProperties?: object) {
        pushTask(() => {
            if ((visibility.isHidden  && metricName.indexOf('Final') < 0) || !config.analyticsTracker) return;
            console.log('pushTask callback exec!!');
            config.analyticsTracker({
                data,
                metricName, 
                customProperties,
                score: getVitalScope(metricName, data),
                netWorkInfo: getNetworkInfo(),
                navigatorInfo: getNavgatorInfo(),
            })
        })
    }
}