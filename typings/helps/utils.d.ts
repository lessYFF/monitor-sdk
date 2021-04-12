/**
 * pushTask - 将任务推入主线程空闲队列
 * @param cb - 执行的回调方法
 */
export declare const pushTask: (cb: () => void) => void;
/**
 * formatByTwo - 格式化数值
 * @param num - 待格式化数值
 * @returns 保留2位小数位的数值
 */
export declare const formatByTwo: (num: number) => number;
/**
 * convertToKB - 将字节转化位kb
 * @param byte - 字节长度
 * @returns kb大小
 */
export declare const convertToKB: (byte: number) => number | null;
//# sourceMappingURL=utils.d.ts.map