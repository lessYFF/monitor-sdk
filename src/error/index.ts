import { AskPriority, ErrorType } from '../typings';
import { config } from '../config';
import { W } from '../data';

export default class ErrorTrace {
    // Todo后期可以优化成一个队列进行上报
    // Todo rrweb监控在这里接入
    private errorInfo;

    // 监控全局同步和异步的异常
    private grobalError() {
        W.onerror = (
            event: Event,
            source?: string,
            lineno?: number, 
            colno?: number, 
            error?: Error
        ): boolean => {
            console.log('[ ❌全局捕获错误 ]', error);
            //通过错误信息还原sourcemap源文件地址
            const errorInfo = JSON.stringify({
                source,
                lineno,
                colno,
                error,
                type: ErrorType[1],
            });
            config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);
            return true;
        }
    }

    // 监控promise异常
    private promiseError() {
        W.addEventListener('unhandledrejection', function(e) {
            console.log('[ ❌promise捕获错误 ]', e);
            e.preventDefault();
            // 上报primise异常
            const errorInfo = JSON.stringify({ 
                e,
                type: ErrorType[2],
            });
            config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);
            return true;
        });
    }

    // 监控资源请求异常
    private networkError() {
        W.addEventListener('error', function(e: ErrorEvent){
            if (e.target !== W) {
                console.log('[ ❌资源请求捕获错误 ]', e.target);
                const errorInfo = JSON.stringify({
                    e,
                    type: ErrorType[2]
                })
                config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);
            }
        }, true);
    }

    // 重写console.error
    private consoleErrorReflect() {
        const consoleError = W.console.error;

        W.console.error = function() {
            console.log('[ ❌console.error捕获错误 ]');
            //config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);
            consoleError.apply(W, [...arguments]);
        }
    }

    // 初始化异常监听
    public run() {
        this.grobalError();
        this.promiseError();
        this.networkError();
        this.consoleErrorReflect();
    }
}