import { YMetricMap, YConsumption } from '../typings'

// 测量指标数据
export const metrics: YMetricMap = {
    fid: 0, // 首次输入延迟 -- first input delay
    fcp: 0, // 首次有内容渲染耗时 -- first contentful paint
    lcp: 0, // 最大内容渲染耗时 -- largest contentful paint 
    cls: 0, // 累计位移偏移 -- cumulative layout shift
    tbt: 0, // 阻塞总时间 -- total blocking time
}
// 测试资源耗时
export const rt: { value: YConsumption} = {
    value: {
        css: 0,
        img: 0,
        other: 0,
        script: 0,
        total: 0,
        beacon: 0,
        fetch: 0,
        xmlhttprequest: 0,
    }
}