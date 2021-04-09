import { logInfo } from '../data';
import { convertToKB } from '../helps';

/**
 * The estimate() method of the StorageManager interface asks the Storage Manager
 * for how much storage the app takes up (usage),
 * and how much space is available (quota).
 */
export const getStorageEstimate = (storageInfo: StorageEstimate) => {
    const estimateUsageDetails = (storageInfo as any).useageDetails || {};

    logInfo('storageEstimate', {
        quota: convertToKB(storageInfo.quota),
        usage: convertToKB(storageInfo.usage),
        caches: convertToKB(estimateUsageDetails.caches),
        indexedDB: convertToKB(estimateUsageDetails.indexedDB),
        ServiceWorker: convertToKB(estimateUsageDetails.ServiceWorker),
    });
}