interface Navigator {
    appName: string;
    appVersion: string;
    estimate: any;
    storage: any;
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: string;
    effectiveType?: string;
    serviceWorker?: {
        controller?: string;
    };
    sendBeacon?: any;
}
export declare const W: Window & typeof globalThis;
export declare const D: Document;
export declare const C: Console;
export declare const WNav: Navigator;
export declare const WPer: Performance;
export declare const getMem: () => number;
export declare const getCpu: () => number;
export {};
//# sourceMappingURL=constants.d.ts.map