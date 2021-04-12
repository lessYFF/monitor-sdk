import { YPerformanceObserverType } from '../typings';
declare class PerformanceObserve {
    private perfObserveMap;
    constructor();
    poConnect(observeType: YPerformanceObserverType, cb: (args: any[]) => void): void;
    poDisconnect(observeType: any): void;
}
export declare const performanceObserver: PerformanceObserve;
export {};
//# sourceMappingURL=observe.d.ts.map