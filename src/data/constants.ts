interface Navigator {
    appName: string
    appVersion: string
    estimate: any
    storage: any
    deviceMemory?: number
    hardwareConcurrency?: number
    connection?: string
    effectiveType?: string
    serviceWorker?: {
        controller?: string
    }
    sendBeacon?: any
}
export const W = window
export const D = document
export const C = W.console
export const WNav = (W.navigator as unknown) as Navigator
export const WPer = W.performance

//内存
export const getMem = () => WNav.deviceMemory ?? 0
//cpu核数
export const getCpu = () => WNav.hardwareConcurrency ?? 0
