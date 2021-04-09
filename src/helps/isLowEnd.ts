import { EffectiveConnectionType } from '../typings';
import { WNav, getCpu, getMem } from "../data";

// 是否低等级设备
export const isLowEndDevice = function(): boolean {
    // If number of logical processors available to run threads <= 4
    if (getCpu() && getCpu() <= 4) {
        return true;
    }
    // If the approximate amount of RAM client device has <= 4
    if (getMem() && getMem() <= 4) {
        return true;
    }

    return false;
}

// 是否低体验设备
export const isLowEndExperience = function(): boolean {
    if (!WNav.connection || typeof WNav.connection !== 'object') return true;

    const effectiveType: EffectiveConnectionType = (WNav.connection as any).effectiveType;
    
    if (['lte', 'slow-2g', '2g', '3g'].includes(effectiveType) || isLowEndDevice) return true;

    return false;
}
