import {
    YMonitor
} from '../../src';

const Test = new YMonitor({
    upUrl: 'http://localhost:3000/api/error',
})
console.log('YMonitor', Test);

// 模拟一个长任务
const start = Date.now();
while (Date.now() - start < 1000) {}