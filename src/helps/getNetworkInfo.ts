import { YNetworkInfo } from "../typings";
import { WNav } from '../data/constants';

export const getNetworkInfo = function():YNetworkInfo  {
    if ('connection' in WNav) {
        const connection = (WNav as any).connection;

        if (typeof connection !== 'object') return {};

        return {
            rtt: connection.rtt,
            downlink: connection.downlink,
            saveData: connection.saveData,
            effectiveType: connection.effectiveType,
        }
    } else {
        // 多谱勒测速
    }
}