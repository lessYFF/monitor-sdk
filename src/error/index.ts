import record from 'rrweb/lib/record/rrweb-record'
import { AskPriority, ErrorType } from '../typings'
import { config } from '../config'
import { W } from '../data'

export default class ErrorTrace {
    // 上报的错误信息
    private errorInfo
    // rrweb录播的信息
    private recordEvents

    constructor() {
        this.recordEvents = [];
    }

    // rrweb录播形象方法
    private recordAction() {
        const _this = this;
        record({
            emit(event, isCheckout) {
                // isCheckout 是一个标识，告诉你重新制作了快照
                if (isCheckout) _this.recordEvents = []

                _this.recordEvents.push(event)
            },
            checkoutEveryNth: 1000, // 每 100个event 重新制作快照
            checkoutEveryNms: 5 * 60 * 1000, // 每5分钟重新制作快照
        })
    }

    // 监控全局同步和异步的异常
    private grobalError() {
        W.onerror = (event: Event, source?: string, lineno?: number, colno?: number, error?: Error): boolean => {
            console.log('[ ❌全局捕获错误 ]', error)
            //通过错误信息还原sourcemap源文件地址
            const errorInfo = JSON.stringify({
                info: {
                    source,
                    lineno,
                    colno,
                    error,
                },
                type: ErrorType[1],
                record: this.recordEvents.slice(-50),
            })
            config.report.sendToAnalytics(AskPriority.IDLE, errorInfo)
            return true
        }
    }

    // 监控promise异常
    private promiseError() {
        const _this = this;
        W.addEventListener('unhandledrejection', function (e) {
            // 上报primise异常
            e.preventDefault()
            console.log('[ ❌promise捕获错误 ]', e)
            const errorInfo = JSON.stringify({
                type: ErrorType[2],
                info: { type: e.type, reason: e.reason },
            })
            config.report.sendToAnalytics(AskPriority.IDLE, errorInfo)
            return true
        })
    }

    // 监控资源请求异常
    private networkError() {
        const _this = this;
        W.addEventListener(
            'error',
            function (e: ErrorEvent) {
                if (e.target !== W) {
                    console.log('[ ❌资源请求捕获错误 ]', e)
                    const errorInfo = JSON.stringify({
                        info: { type: e.type, reason: (e.target as any).outerHTML },
                        type: ErrorType[2],
                    })
                    config.report.sendToAnalytics(AskPriority.IDLE, errorInfo)
                }
            },
            true
        )
    }

    // 重写console.error
    private consoleErrorReflect() {
        const consoleError = W.console.error

        W.console.error = function () {
            console.log('[ ❌console.error捕获错误 ]')
            //config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);
            consoleError.apply(W, [...arguments])
        }
    }

    // 初始化异常监听
    public run() {
        this.grobalError()
        this.promiseError()
        this.networkError()
        this.consoleErrorReflect()
        this.recordAction()
    }
}
