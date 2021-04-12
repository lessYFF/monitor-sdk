import { YPerObservers, YPerformanceObserverType } from '../typings';
import { C } from '../data/constants';

class PerformanceObserve {
    private perfObserveMap: YPerObservers;

    constructor() {
        this.perfObserveMap = new Map();
    }

    // 观察单个性能指标
    poConnect(observeType: YPerformanceObserverType, cb: (args: any[]) => void) {
        try {
            const perfObserver = new PerformanceObserver(entryList => {
                cb(entryList.getEntries());
            });

            // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例
            perfObserver.observe({ type: observeType, buffered: true });
            this.perfObserveMap.set(observeType, perfObserver);
        } catch(msg) {
            C.warn('poConnect warn', msg);
        }
    }

    // 断开观察单个性能指标
    poDisconnect(observeType: any) {
        if (this.perfObserveMap.get(observeType)) {
            this.perfObserveMap.get(observeType).disconnect();
            this.perfObserveMap.delete(observeType);
        }
    }
}

export const performanceObserver = new PerformanceObserve();