import { Report } from './report';
import { config } from '../config';
import { formatByTwo } from '../helps';

export const logInfo = (measureName: string, data: any, customProperties?: object) => {
    Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'number') {
            data[key] = formatByTwo(data[key]);
        }
    });
    // Sends the metric to an external tracking service
    Report.reportPerformance(measureName, data, customProperties);
}

export const logMetric = (measureName: string, data: any, customProperties?: object) => {
    const duration2Decimal = formatByTwo(data);
    if (duration2Decimal >= 0 && duration2Decimal <= config.maxTime) {
        Report.reportPerformance(measureName, duration2Decimal, customProperties);
    }
}