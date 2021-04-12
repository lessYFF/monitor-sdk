import { W } from '../data/constants';

/**
 * pushTask - 将任务推入主线程空闲队列
 * @param cb - 执行的回调方法
 */
export const pushTask = function(cb: ()=> void) {
    if ('requestIdleCallback' in W) {
        (W as any).requestIdleCallback(cb, { timeOut: 3000 });
    } else {
        cb();
    }
}

/**
 * formatByTwo - 格式化数值
 * @param num - 待格式化数值
 * @returns 保留2位小数位的数值
 */
export const formatByTwo = function(num: number): number {
    return parseFloat(num.toFixed(2));
}

/**
 * convertToKB - 将字节转化位kb
 * @param byte - 字节长度
 * @returns kb大小
 */
export const convertToKB = function(byte: number): number|null  {
    if (typeof byte !== 'number') return null;

    return formatByTwo(byte / Math.pow(1024, 2));
}