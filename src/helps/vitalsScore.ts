import { YScore, YMonitorData } from '../typings';

// https://web.dev/vitals/
const fcpScope = [1000, 2500];
const lcpScope = [2500, 4000];
const fidScope = [100, 300];
const clsScope = [0.1, 0.25];
const tbtScope = [300, 600];

export const webVitalsScore: Record<string, number[]> = {
    fp: fcpScope,
    fcp: fcpScope,
    lcp: lcpScope,
    lcpFinal: lcpScope,
    fid: fidScope,
    fidVital: fidScope,
    cls: clsScope,
    clsFinal: clsScope,
    tbt: tbtScope,
    tbt5s: tbtScope,
    tbt10s: tbtScope,
    tbtFinal: tbtScope,
}

export const getVitalScope = (measureName: string, value: YMonitorData): YScore => {
    if (!webVitalsScore[measureName]) return null;

    if (value <= webVitalsScore[measureName][0]) return 'good';

    return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';
} 
