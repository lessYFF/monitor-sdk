import { YNavigatorInfo } from "../typings";
import { WNav, getMem, getCpu } from '../data/constants';
import { isLowEndDevice, isLowEndExperience } from './isLowEnd';

/**
 * 如下信息来源于 window.navigator:
 * 1. Device Memory
 * 2. Hardware Concurency
 * 3. Status of the service worker:
 *     - controlled: a service worker is controlling the page
 *     - supported: the browser supports service worker
 *     - unsupported: the user's browser does not support service worker
 */
export const getNavgatorInfo = function(): YNavigatorInfo {
    if (!WNav) return {};

    return {
        appName: WNav.appName,
        appVersion: WNav.appVersion,
        deviceMemory: getMem() || 0,
        hardwareConcurrency: getCpu() || 0,
        isLowEndDevice: isLowEndDevice(),
        isLowEndExperience: isLowEndExperience(),
        serviceWorkerStatus: 
            'serviceWorker' in WNav ? 
                WNav.serviceWorker!.controller ? 
                'controlled'
                : 'supported'
            : 'unSupported',
    }
}