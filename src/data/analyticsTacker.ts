import { YAnalyticsTrackerOptions } from "../typings";

// 自定义分析器
export const analyticsTracker = function(options: YAnalyticsTrackerOptions) {
    console.log('analyticsTracker', options);
}