// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/data/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCpu = exports.getMem = exports.WPer = exports.WNav = exports.C = exports.D = exports.W = void 0;
var W = window;
exports.W = W;
var D = document;
exports.D = D;
var C = W.console;
exports.C = C;
var WNav = W.navigator;
exports.WNav = WNav;
var WPer = W.performance; //内存

exports.WPer = WPer;

var getMem = function getMem() {
  var _WNav$deviceMemory;

  return (_WNav$deviceMemory = WNav.deviceMemory) !== null && _WNav$deviceMemory !== void 0 ? _WNav$deviceMemory : 0;
}; //cpu核数


exports.getMem = getMem;

var getCpu = function getCpu() {
  var _WNav$hardwareConcurr;

  return (_WNav$hardwareConcurr = WNav.hardwareConcurrency) !== null && _WNav$hardwareConcurr !== void 0 ? _WNav$hardwareConcurr : 0;
};

exports.getCpu = getCpu;
},{}],"../src/helps/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToKB = exports.formatByTwo = exports.pushTask = void 0;

var _constants = require("../data/constants");

/**
 * pushTask - 将任务推入主线程空闲队列
 * @param cb - 执行的回调方法
 */
var pushTask = function pushTask(cb) {
  if ('requestIdleCallback' in _constants.W) {
    _constants.W.requestIdleCallback(cb, {
      timeOut: 3000
    });
  } else {
    cb();
  }
};
/**
 * formatByTwo - 格式化数值
 * @param num - 待格式化数值
 * @returns 保留2位小数位的数值
 */


exports.pushTask = pushTask;

var formatByTwo = function formatByTwo(num) {
  return parseFloat(num.toFixed(2));
};
/**
 * convertToKB - 将字节转化位kb
 * @param byte - 字节长度
 * @returns kb大小
 */


exports.formatByTwo = formatByTwo;

var convertToKB = function convertToKB(byte) {
  if (typeof byte !== 'number') return null;
  return formatByTwo(byte / Math.pow(1024, 2));
};

exports.convertToKB = convertToKB;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helps/isSupported.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVisibleChangeSupported = exports.isEstimateSupported = exports.isPerformanceSupported = void 0;

var _constants = require("../data/constants");

/**
 * True if the browser supports the Navigation Timing API,
 * User Timing API and the PerformanceObserver Interface.
 * In Safari, the User Timing API (performance.mark()) is not available,
 * so the DevTools timeline will not be annotated with marks.
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * Support: developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 */
var isPerformanceSupported = function isPerformanceSupported() {
  return _constants.WPer && !!_constants.WPer.getEntriesByType && !!_constants.WPer.now && !!_constants.WPer.mark && !!_constants.W.PerformanceObserver;
};

exports.isPerformanceSupported = isPerformanceSupported;

var isEstimateSupported = function isEstimateSupported() {
  return _constants.WNav && _constants.WNav.storage && typeof _constants.WNav.storage.estimate === 'function';
};

exports.isEstimateSupported = isEstimateSupported;

var isVisibleChangeSupported = function isVisibleChangeSupported() {
  return typeof _constants.D.hidden !== "undefined";
};

exports.isVisibleChangeSupported = isVisibleChangeSupported;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helps/vitalsScore.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVitalScope = exports.webVitalsScore = void 0;
// https://web.dev/vitals/
var fcpScope = [1000, 2500];
var lcpScope = [2500, 4000];
var fidScope = [100, 300];
var clsScope = [0.1, 0.25];
var tbtScope = [300, 600];
var webVitalsScore = {
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
  tbtFinal: tbtScope
};
exports.webVitalsScore = webVitalsScore;

var getVitalScope = function getVitalScope(measureName, value) {
  if (!webVitalsScore[measureName]) return null;
  if (value <= webVitalsScore[measureName][0]) return 'good';
  return value <= webVitalsScore[measureName][1] ? 'needsImprovement' : 'poor';
};

exports.getVitalScope = getVitalScope;
},{}],"../src/helps/getNetworkInfo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkInfo = void 0;

var _constants = require("../data/constants");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getNetworkInfo = function getNetworkInfo() {
  if ('connection' in _constants.WNav) {
    var connection = _constants.WNav.connection;
    if (_typeof(connection) !== 'object') return {};
    return {
      rtt: connection.rtt,
      downlink: connection.downlink,
      saveData: connection.saveData,
      effectiveType: connection.effectiveType
    };
  } else {// 多谱勒测速
  }
};

exports.getNetworkInfo = getNetworkInfo;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helps/isLowEnd.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLowEndExperience = exports.isLowEndDevice = void 0;

var _constants = require("../data/constants");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 是否低等级设备
var isLowEndDevice = function isLowEndDevice() {
  // If number of logical processors available to run threads <= 4
  if ((0, _constants.getCpu)() && (0, _constants.getCpu)() <= 4) {
    return true;
  } // If the approximate amount of RAM client device has <= 4


  if ((0, _constants.getMem)() && (0, _constants.getMem)() <= 4) {
    return true;
  }

  return false;
}; // 是否低体验设备


exports.isLowEndDevice = isLowEndDevice;

var isLowEndExperience = function isLowEndExperience() {
  if (!_constants.WNav.connection || _typeof(_constants.WNav.connection) !== 'object') return true;
  var effectiveType = _constants.WNav.connection.effectiveType;
  if (['lte', 'slow-2g', '2g', '3g'].includes(effectiveType) || isLowEndDevice) return true;
  return false;
};

exports.isLowEndExperience = isLowEndExperience;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helps/getNavigatorInfo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavgatorInfo = void 0;

var _constants = require("../data/constants");

var _isLowEnd = require("./isLowEnd");

/**
 * 如下信息来源于 window.navigator:
 * 1. Device Memory
 * 2. Hardware Concurency
 * 3. Status of the service worker:
 *     - controlled: a service worker is controlling the page
 *     - supported: the browser supports service worker
 *     - unsupported: the user's browser does not support service worker
 */
var getNavgatorInfo = function getNavgatorInfo() {
  if (!_constants.WNav) return {};
  return {
    appName: _constants.WNav.appName,
    appVersion: _constants.WNav.appVersion,
    deviceMemory: (0, _constants.getMem)() || 0,
    hardwareConcurrency: (0, _constants.getCpu)() || 0,
    isLowEndDevice: (0, _isLowEnd.isLowEndDevice)(),
    isLowEndExperience: (0, _isLowEnd.isLowEndExperience)(),
    serviceWorkerStatus: 'serviceWorker' in _constants.WNav ? _constants.WNav.serviceWorker.controller ? 'controlled' : 'supported' : 'unSupported'
  };
};

exports.getNavgatorInfo = getNavgatorInfo;
},{"../data/constants":"../src/data/constants.ts","./isLowEnd":"../src/helps/isLowEnd.ts"}],"../src/helps/onVisibilityChange.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.didVisibilityChange = exports.visibility = void 0;

var _constants = require("../data/constants");

var visibility = {
  isHidden: false
};
/**
 * From visibilitychange listener it saves only when
 * the page gets hidden, because it's important to not
 * use the wrong "hidden" value when send timing or logging.
 */

exports.visibility = visibility;

var didVisibilityChange = function didVisibilityChange(cb) {
  if (_constants.D.hidden) {
    cb();
    visibility.isHidden = _constants.D.hidden;
  }
};

exports.didVisibilityChange = didVisibilityChange;
},{"../data/constants":"../src/data/constants.ts"}],"../src/helps/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

var _isSupported = require("./isSupported");

Object.keys(_isSupported).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isSupported[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSupported[key];
    }
  });
});

var _vitalsScore = require("./vitalsScore");

Object.keys(_vitalsScore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vitalsScore[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vitalsScore[key];
    }
  });
});

var _getNetworkInfo = require("./getNetworkInfo");

Object.keys(_getNetworkInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getNetworkInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getNetworkInfo[key];
    }
  });
});

var _getNavigatorInfo = require("./getNavigatorInfo");

Object.keys(_getNavigatorInfo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getNavigatorInfo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getNavigatorInfo[key];
    }
  });
});

var _onVisibilityChange = require("./onVisibilityChange");

Object.keys(_onVisibilityChange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _onVisibilityChange[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _onVisibilityChange[key];
    }
  });
});
},{"./utils":"../src/helps/utils.ts","./isSupported":"../src/helps/isSupported.ts","./vitalsScore":"../src/helps/vitalsScore.ts","./getNetworkInfo":"../src/helps/getNetworkInfo.ts","./getNavigatorInfo":"../src/helps/getNavigatorInfo.ts","./onVisibilityChange":"../src/helps/onVisibilityChange.ts"}],"../src/typings/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorType = exports.AskPriority = void 0;
// 优先级
var AskPriority;
exports.AskPriority = AskPriority;

(function (AskPriority) {
  AskPriority[AskPriority["URGENT"] = 1] = "URGENT";
  AskPriority[AskPriority["IDLE"] = 2] = "IDLE";
})(AskPriority || (exports.AskPriority = AskPriority = {})); // 错误类型枚举


var ErrorType;
exports.ErrorType = ErrorType;

(function (ErrorType) {
  ErrorType[ErrorType["SCRIPT"] = 1] = "SCRIPT";
  ErrorType[ErrorType["PROMISE"] = 2] = "PROMISE";
  ErrorType[ErrorType["NETWORK"] = 3] = "NETWORK";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
},{}],"../src/config/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  isPerformanceTrace: true,
  isErrorCapture: true,
  isResoureTiming: true,
  isElementTiming: true,
  maxTime: 15000,
  report: null,
  analyticsTracker: null
};
exports.config = config;
},{}],"../src/data/report.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Report = void 0;

var _typings = require("../typings");

var _config = require("../config");

var _constants = require("./constants");

var _helps = require("../helps");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Report = /*#__PURE__*/function () {
  function Report(options) {
    _classCallCheck(this, Report);

    if (!options.upUrl) {
      throw Error('监控sdk需提供上报uri!');
    }

    this.upUrl = options.upUrl;
  }
  /**
   * 统一上报方法
   * @param level - 上报等级
   * @param data - 上报数据
   * @param uri - 上报uri
   */


  _createClass(Report, [{
    key: "sendToAnalytics",
    value: function sendToAnalytics(level, data, uri) {
      var upUrl = uri || this.upUrl; // 高优先级处理

      if (level === _typings.AskPriority.URGENT) {
        if (!!_constants.W.fetch) {
          fetch(upUrl, {
            method: 'post',
            body: data,
            keepalive: true
          });
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('post', upUrl, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(data);

          xhr.onload = function () {
            if (this.status === 200 || this.status === 304) {
              console.log('xhr response', this.response);
            } //及时清理以防多次创建


            xhr = null;
          };
        }
      } else if (level === _typings.AskPriority.IDLE) {
        if (!!_constants.WNav.sendBeacon) {
          _constants.WNav.sendBeacon(upUrl, data);
        } else {
          var img = new Image();
          img.src = "".concat(upUrl, "?body=").concat(data);

          img.onload = function () {
            //统计完成收回创建的元素防止内存泄露
            img = null;
          };
        }
      }
    }
    /**
     * 性能上报方法
     * @param metricName - 性能指标
     * @param data - 性能数据
     * @param customProperties - 自定义数据
     */

  }], [{
    key: "reportPerformance",
    value: function reportPerformance(metricName, data, customProperties) {
      (0, _helps.pushTask)(function () {
        if (_helps.visibility.isHidden && metricName.indexOf('Final') < 0 || !_config.config.analyticsTracker) return;

        _config.config.analyticsTracker({
          data: data,
          metricName: metricName,
          customProperties: customProperties,
          score: (0, _helps.getVitalScope)(metricName, data),
          netWorkInfo: (0, _helps.getNetworkInfo)(),
          navigatorInfo: (0, _helps.getNavgatorInfo)()
        });
      });
    }
  }]);

  return Report;
}();

exports.Report = Report;
},{"../typings":"../src/typings/index.ts","../config":"../src/config/index.ts","./constants":"../src/data/constants.ts","../helps":"../src/helps/index.ts"}],"../src/data/log.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logMetric = exports.logInfo = void 0;

var _report = require("./report");

var _config = require("../config");

var _helps = require("../helps");

var logInfo = function logInfo(measureName, data, customProperties) {
  Object.keys(data).forEach(function (key) {
    if (typeof data[key] === 'number') {
      data[key] = (0, _helps.formatByTwo)(data[key]);
    }
  }); // Sends the metric to an external tracking service

  _report.Report.reportPerformance(measureName, data, customProperties);
};

exports.logInfo = logInfo;

var logMetric = function logMetric(measureName, data, customProperties) {
  var duration2Decimal = (0, _helps.formatByTwo)(data);

  if (duration2Decimal >= 0 && duration2Decimal <= _config.config.maxTime) {
    _report.Report.reportPerformance(measureName, duration2Decimal, customProperties);
  }
};

exports.logMetric = logMetric;
},{"./report":"../src/data/report.ts","../config":"../src/config/index.ts","../helps":"../src/helps/index.ts"}],"../src/data/metrics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rt = exports.metrics = void 0;
// 测量指标数据
var metrics = {
  fid: 0,
  fcp: 0,
  lcp: 0,
  cls: 0,
  tbt: 0 // 阻塞总时间 -- total blocking time

}; // 测试资源耗时

exports.metrics = metrics;
var rt = {
  value: {
    css: 0,
    img: 0,
    other: 0,
    script: 0,
    total: 0,
    beacon: 0,
    fetch: 0,
    xmlhttprequest: 0
  }
};
exports.rt = rt;
},{}],"../src/data/analyticsTacker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyticsTracker = void 0;

// 自定义分析器
var analyticsTracker = function analyticsTracker(options) {
  console.log('analyticsTracker', options);
};

exports.analyticsTracker = analyticsTracker;
},{}],"../src/data/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require("./log");

Object.keys(_log).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _log[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _log[key];
    }
  });
});

var _report = require("./report");

Object.keys(_report).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _report[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _report[key];
    }
  });
});

var _metrics = require("./metrics");

Object.keys(_metrics).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _metrics[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metrics[key];
    }
  });
});

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _analyticsTacker = require("./analyticsTacker");

Object.keys(_analyticsTacker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _analyticsTacker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _analyticsTacker[key];
    }
  });
});
},{"./log":"../src/data/log.ts","./report":"../src/data/report.ts","./metrics":"../src/data/metrics.ts","./constants":"../src/data/constants.ts","./analyticsTacker":"../src/data/analyticsTacker.ts"}],"../src/performance/observe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performanceObserver = void 0;

var _constants = require("../data/constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PerformanceObserve = /*#__PURE__*/function () {
  function PerformanceObserve() {
    _classCallCheck(this, PerformanceObserve);

    this.perfObserveMap = new Map();
  } // 观察单个性能指标


  _createClass(PerformanceObserve, [{
    key: "poConnect",
    value: function poConnect(observeType, cb) {
      try {
        var perfObserver = new PerformanceObserver(function (entryList) {
          cb(entryList.getEntries());
        }); // 订阅时间或者开始计时 buffered不立即执行在内存中留下PerformanceObserver实例

        perfObserver.observe({
          type: observeType,
          buffered: true
        });
        this.perfObserveMap.set(observeType, perfObserver);
      } catch (msg) {
        _constants.C.warn('poConnect warn', msg);
      }
    } // 断开观察单个性能指标

  }, {
    key: "poDisconnect",
    value: function poDisconnect(observeType) {
      if (this.perfObserveMap.get(observeType)) {
        this.perfObserveMap.get(observeType).disconnect();
        this.perfObserveMap.delete(observeType);
      }
    }
  }]);

  return PerformanceObserve;
}();

var performanceObserver = new PerformanceObserve();
exports.performanceObserver = performanceObserver;
},{"../data/constants":"../src/data/constants.ts"}],"../src/performance/navigationTiming.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavigationTiming = void 0;

var _isSupported = require("../helps/isSupported");

/**
 * Navigation Timing API provides performance metrics for HTML documents.
 * w3c.github.io/navigation-timing/
 * developers.google.com/web/fundamentals/performance/navigation-and-resource-timing
 */
var getNavigationTiming = function getNavigationTiming() {
  // 不支持性能检测api直接返回
  if (!_isSupported.isPerformanceSupported) return {}; // 这里直接的物理赋值performance.timing 已被弃用

  var t = performance.getEntriesByType('navigation')[0];
  if (!t) return {};
  var responseStart = t.responseStart;
  var responseEnd = t.responseEnd;
  return {
    // fetchStart marks when the browser starts to fetch a resource
    // responseEnd marks when the last byte of the response arrives
    fetchTime: responseEnd - t.fetchStart || 0,
    // serviecworker time plus response time
    workerTime: t.workerStart ? responseEnd - t.workerStart : 0,
    // requset plus response time (network noly)
    totalTime: responseEnd - t.requestStart || 0,
    // response time only 
    downloadTime: responseEnd - responseStart || 0,
    // TTFB
    timeToFirstByte: responseStart - t.fetchStart || 0,
    // http header size
    headerSize: t.transferSize - t.encodedBodySize || 0,
    // DNS解析时间
    dnsLookupTime: t.dnsLookupTimeEnd - t.dnsLookupTimeStart || 0,
    // tcp建立链接时间
    tcpTime: t.connectEnd - t.connectStart || 0,
    // 白屏时间
    whiteTime: responseStart - t.navigationStart || 0,
    // 页面渲染dom时间
    domTime: t.domContentLoadedEventEnd - t.navigationStart || 0,
    // 页面加载时间
    loadTime: t.loadEventEnd - t.navigationStart || 0,
    // DOM解析时间
    parseDomTime: t.domComplete - t.domInteractive || 0
  };
};

exports.getNavigationTiming = getNavigationTiming;
},{"../helps/isSupported":"../src/helps/isSupported.ts"}],"../src/performance/storageEstimate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStorageEstimate = void 0;

var _data = require("../data");

var _helps = require("../helps");

/**
 * The estimate() method of the StorageManager interface asks the Storage Manager
 * for how much storage the app takes up (usage),
 * and how much space is available (quota).
 */
var getStorageEstimate = function getStorageEstimate(storageInfo) {
  var estimateUsageDetails = storageInfo.useageDetails || {};
  (0, _data.logInfo)('storageEstimate', {
    quota: (0, _helps.convertToKB)(storageInfo.quota),
    usage: (0, _helps.convertToKB)(storageInfo.usage),
    caches: (0, _helps.convertToKB)(estimateUsageDetails.caches),
    indexedDB: (0, _helps.convertToKB)(estimateUsageDetails.indexedDB),
    ServiceWorker: (0, _helps.convertToKB)(estimateUsageDetails.ServiceWorker)
  });
};

exports.getStorageEstimate = getStorageEstimate;
},{"../data":"../src/data/index.ts","../helps":"../src/helps/index.ts"}],"../src/performance/resourceTiming.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initResourceTiming = void 0;

var _data = require("../data");

var _config = require("../config");

// 初始化资源时间
var initResourceTiming = function initResourceTiming(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    if (_config.config.isResoureTiming) {
      (0, _data.logInfo)('resourceTiming', entry);
    }

    if (entry.decodedBodySize && entry.initiatorType) {
      var bodySize = entry.decodedBodySize / 1000;
      _data.rt.value[entry.initiatorType] += bodySize;
      _data.rt.value.total += bodySize;
    }
  });
};

exports.initResourceTiming = initResourceTiming;
},{"../data":"../src/data/index.ts","../config":"../src/config/index.ts"}],"../src/performance/firstInputDelay.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initFirstInputDelay = void 0;

var _data = require("../data");

var _observe = require("./observe");

// 初始化首次输入延迟
var initFirstInputDelay = function initFirstInputDelay(performanceEntries) {
  var lastEntry = performanceEntries.pop();

  if (lastEntry) {
    // 传统fid测量
    (0, _data.logMetric)('fid', lastEntry.duration, {
      performanceEntries: lastEntry
    });
    (0, _data.logMetric)('fidVitals', lastEntry.processingStart - lastEntry.startTime, {
      performanceEntries: lastEntry
    });
  }

  _observe.performanceObserver.poDisconnect('first-input');

  (0, _data.logMetric)('tbt', _data.metrics.tbt);
  (0, _data.logMetric)('cls', _data.metrics.cls); // TBT with 5 second delay after FID

  setTimeout(function () {
    (0, _data.logMetric)('tbt5S', _data.metrics.tbt);
  }, 5000); // TBT with 10 second delay after FID

  setTimeout(function () {
    (0, _data.logMetric)('tbt10S', _data.metrics.tbt); //FID被激活以后10S的整体数据消耗

    (0, _data.logInfo)('consumptionInfo', _data.rt.value);
  }, 10000);
};

exports.initFirstInputDelay = initFirstInputDelay;
},{"../data":"../src/data/index.ts","./observe":"../src/performance/observe.ts"}],"../src/performance/cumulativeLayoutShift.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initCumulativeLayoutShift = void 0;

var _data = require("../data");

// 初始化累计位移偏移
var initCumulativeLayoutShift = function initCumulativeLayoutShift(performanceEntries) {
  var lastEntry = performanceEntries.pop();

  if (lastEntry && !lastEntry.hadRecentInput && lastEntry.value) {
    _data.metrics.cls += lastEntry.value;
    (0, _data.logMetric)('cls', _data.metrics.cls);
  }
};

exports.initCumulativeLayoutShift = initCumulativeLayoutShift;
},{"../data":"../src/data/index.ts"}],"../src/performance/paint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initElementTiming = exports.initLargestContentfulPaint = exports.initPaint = void 0;

var _data = require("../data");

var _observe = require("./observe");

// 初始化首次绘制
var initPaint = function initPaint(performanceEntries) {
  performanceEntries.some(function (entry) {
    if (entry.name === 'first-paint') {
      (0, _data.logMetric)('fp', entry.startTime);
      return true;
    } else if (entry.name === 'first-contentful-paint') {
      _data.metrics.fcp = entry.startTime;
      (0, _data.logMetric)('fcp', _data.metrics.fcp);
      return true;
    }
  }); // 解除监听

  _observe.performanceObserver.poDisconnect('paint');
}; // 初始化最大内容绘制


exports.initPaint = initPaint;

var initLargestContentfulPaint = function initLargestContentfulPaint(performanceEntries) {
  var lastEntry = performanceEntries.pop();

  if (lastEntry) {
    _data.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
    (0, _data.logMetric)('lcp', _data.metrics.lcp);
  }
}; // 初始化元素渲染时间


exports.initLargestContentfulPaint = initLargestContentfulPaint;

var initElementTiming = function initElementTiming(performanceEntries) {
  performanceEntries.some(function (entry) {
    if (entry.identifier) {
      (0, _data.logMetric)(entry.identifier, entry.startTime);
    }
  });
};

exports.initElementTiming = initElementTiming;
},{"../data":"../src/data/index.ts","./observe":"../src/performance/observe.ts"}],"../src/performance/performanceEntry.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectPerformanceObserveHidden = exports.initPerformanceTraceEntry = void 0;

var _config = require("../config");

var _helps = require("../helps");

var _data = require("../data");

var _observe = require("./observe");

var _navigationTiming = require("./navigationTiming");

var _storageEstimate = require("./storageEstimate");

var _resourceTiming = require("./resourceTiming");

var _firstInputDelay = require("./firstInputDelay");

var _cumulativeLayoutShift = require("./cumulativeLayoutShift");

var _paint = require("./paint");

var _this = void 0;

// 根据参数监听相关指标
var initPerformanceObserver = function initPerformanceObserver() {
  console.log('⏰ 性能收集开始', Math.random());

  _observe.performanceObserver.poConnect('paint', _paint.initPaint);

  _observe.performanceObserver.poConnect('first-input', _firstInputDelay.initFirstInputDelay);

  _observe.performanceObserver.poConnect('layout-shift', _cumulativeLayoutShift.initCumulativeLayoutShift);

  _observe.performanceObserver.poConnect('largest-contentful-paint', _paint.initLargestContentfulPaint);

  if (_config.config.isResoureTiming) {
    _observe.performanceObserver.poConnect('resource', _resourceTiming.initResourceTiming);
  }

  if (_config.config.isElementTiming) {
    _observe.performanceObserver.poConnect('element', _paint.initElementTiming);
  }
}; // 根据相关检测指标解除监听


var disconnectPerformanceObserve = function disconnectPerformanceObserve(args) {
  var list = Array.isArray(args) ? args : [args];
  list.forEach(function (metric) {
    _observe.performanceObserver.poDisconnect(metric);
  });
}; // 初始化性能监控


var initPerformanceTraceEntry = function initPerformanceTraceEntry() {
  //监控相关指标
  initPerformanceObserver(); //页面性能

  (0, _data.logInfo)('navigationTiming', (0, _navigationTiming.getNavigationTiming)()); //管理离线缓存数据

  if ((0, _helps.isEstimateSupported)()) {
    _data.WNav.storage.estimate().then(_storageEstimate.getStorageEstimate);
  } //页面切换时解除观察


  if ((0, _helps.isVisibleChangeSupported)()) {
    _data.D.addEventListener('visibilitychange', _helps.didVisibilityChange.bind(_this, disconnectPerformanceObserveHidden));
  }
}; // 页面隐藏时解除监听性能指标


exports.initPerformanceTraceEntry = initPerformanceTraceEntry;

var disconnectPerformanceObserveHidden = function disconnectPerformanceObserveHidden() {
  disconnectPerformanceObserve(['paint', 'element', 'largest-contentful-paint', 'resource', 'layout-shift', 'first-input']);
};

exports.disconnectPerformanceObserveHidden = disconnectPerformanceObserveHidden;
},{"../config":"../src/config/index.ts","../helps":"../src/helps/index.ts","../data":"../src/data/index.ts","./observe":"../src/performance/observe.ts","./navigationTiming":"../src/performance/navigationTiming.ts","./storageEstimate":"../src/performance/storageEstimate.ts","./resourceTiming":"../src/performance/resourceTiming.ts","./firstInputDelay":"../src/performance/firstInputDelay.ts","./cumulativeLayoutShift":"../src/performance/cumulativeLayoutShift.ts","./paint":"../src/performance/paint.ts"}],"../src/performance/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observe = require("./observe");

Object.keys(_observe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _observe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _observe[key];
    }
  });
});

var _performanceEntry = require("./performanceEntry");

Object.keys(_performanceEntry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _performanceEntry[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _performanceEntry[key];
    }
  });
});
},{"./observe":"../src/performance/observe.ts","./performanceEntry":"../src/performance/performanceEntry.ts"}],"../node_modules/rrweb/lib/record/rrweb-record.js":[function(require,module,exports) {
'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var NodeType;
(function (NodeType) {
    NodeType[NodeType["Document"] = 0] = "Document";
    NodeType[NodeType["DocumentType"] = 1] = "DocumentType";
    NodeType[NodeType["Element"] = 2] = "Element";
    NodeType[NodeType["Text"] = 3] = "Text";
    NodeType[NodeType["CDATA"] = 4] = "CDATA";
    NodeType[NodeType["Comment"] = 5] = "Comment";
})(NodeType || (NodeType = {}));

var _id = 1;
var tagNameRegex = RegExp('[^a-z1-6-_]');
var IGNORED_NODE = -2;
function genId() {
    return _id++;
}
function getValidTagName(element) {
    if (element instanceof HTMLFormElement) {
        return 'form';
    }
    var processedTagName = element.tagName.toLowerCase().trim();
    if (tagNameRegex.test(processedTagName)) {
        return 'div';
    }
    return processedTagName;
}
function getCssRulesString(s) {
    try {
        var rules = s.rules || s.cssRules;
        return rules ? Array.from(rules).map(getCssRuleString).join('') : null;
    }
    catch (error) {
        return null;
    }
}
function getCssRuleString(rule) {
    return isCSSImportRule(rule)
        ? getCssRulesString(rule.styleSheet) || ''
        : rule.cssText;
}
function isCSSImportRule(rule) {
    return 'styleSheet' in rule;
}
function extractOrigin(url) {
    var origin;
    if (url.indexOf('//') > -1) {
        origin = url.split('/').slice(0, 3).join('/');
    }
    else {
        origin = url.split('/')[0];
    }
    origin = origin.split('?')[0];
    return origin;
}
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm;
var RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/;
var DATA_URI = /^(data:)([^,]*),(.*)/i;
function absoluteToStylesheet(cssText, href) {
    return (cssText || '').replace(URL_IN_CSS_REF, function (origin, quote1, path1, quote2, path2, path3) {
        var filePath = path1 || path2 || path3;
        var maybeQuote = quote1 || quote2 || '';
        if (!filePath) {
            return origin;
        }
        if (!RELATIVE_PATH.test(filePath)) {
            return "url(" + maybeQuote + filePath + maybeQuote + ")";
        }
        if (DATA_URI.test(filePath)) {
            return "url(" + maybeQuote + filePath + maybeQuote + ")";
        }
        if (filePath[0] === '/') {
            return "url(" + maybeQuote + (extractOrigin(href) + filePath) + maybeQuote + ")";
        }
        var stack = href.split('/');
        var parts = filePath.split('/');
        stack.pop();
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (part === '.') {
                continue;
            }
            else if (part === '..') {
                stack.pop();
            }
            else {
                stack.push(part);
            }
        }
        return "url(" + maybeQuote + stack.join('/') + maybeQuote + ")";
    });
}
function getAbsoluteSrcsetString(doc, attributeValue) {
    if (attributeValue.trim() === '') {
        return attributeValue;
    }
    var srcsetValues = attributeValue.split(',');
    var resultingSrcsetString = srcsetValues
        .map(function (srcItem) {
        var trimmedSrcItem = srcItem.trimLeft().trimRight();
        var urlAndSize = trimmedSrcItem.split(' ');
        if (urlAndSize.length === 2) {
            var absUrl = absoluteToDoc(doc, urlAndSize[0]);
            return absUrl + " " + urlAndSize[1];
        }
        else if (urlAndSize.length === 1) {
            var absUrl = absoluteToDoc(doc, urlAndSize[0]);
            return "" + absUrl;
        }
        return '';
    })
        .join(', ');
    return resultingSrcsetString;
}
function absoluteToDoc(doc, attributeValue) {
    if (!attributeValue || attributeValue.trim() === '') {
        return attributeValue;
    }
    var a = doc.createElement('a');
    a.href = attributeValue;
    return a.href;
}
function isSVGElement(el) {
    return el.tagName === 'svg' || el instanceof SVGElement;
}
function transformAttribute(doc, name, value) {
    if (name === 'src' || ((name === 'href' || name === 'xlink:href') && value)) {
        return absoluteToDoc(doc, value);
    }
    else if (name === 'srcset' && value) {
        return getAbsoluteSrcsetString(doc, value);
    }
    else if (name === 'style' && value) {
        return absoluteToStylesheet(value, location.href);
    }
    else {
        return value;
    }
}
function _isBlockedElement(element, blockClass, blockSelector) {
    if (typeof blockClass === 'string') {
        if (element.classList.contains(blockClass)) {
            return true;
        }
    }
    else {
        element.classList.forEach(function (className) {
            if (blockClass.test(className)) {
                return true;
            }
        });
    }
    if (blockSelector) {
        return element.matches(blockSelector);
    }
    return false;
}
function serializeNode(n, options) {
    var doc = options.doc, blockClass = options.blockClass, blockSelector = options.blockSelector, inlineStylesheet = options.inlineStylesheet, _a = options.maskInputOptions, maskInputOptions = _a === void 0 ? {} : _a, recordCanvas = options.recordCanvas;
    switch (n.nodeType) {
        case n.DOCUMENT_NODE:
            return {
                type: NodeType.Document,
                childNodes: [],
            };
        case n.DOCUMENT_TYPE_NODE:
            return {
                type: NodeType.DocumentType,
                name: n.name,
                publicId: n.publicId,
                systemId: n.systemId,
            };
        case n.ELEMENT_NODE:
            var needBlock = _isBlockedElement(n, blockClass, blockSelector);
            var tagName = getValidTagName(n);
            var attributes_1 = {};
            for (var _i = 0, _b = Array.from(n.attributes); _i < _b.length; _i++) {
                var _c = _b[_i], name = _c.name, value = _c.value;
                attributes_1[name] = transformAttribute(doc, name, value);
            }
            if (tagName === 'link' && inlineStylesheet) {
                var stylesheet = Array.from(doc.styleSheets).find(function (s) {
                    return s.href === n.href;
                });
                var cssText = getCssRulesString(stylesheet);
                if (cssText) {
                    delete attributes_1.rel;
                    delete attributes_1.href;
                    attributes_1._cssText = absoluteToStylesheet(cssText, stylesheet.href);
                }
            }
            if (tagName === 'style' &&
                n.sheet &&
                !(n.innerText ||
                    n.textContent ||
                    '').trim().length) {
                var cssText = getCssRulesString(n.sheet);
                if (cssText) {
                    attributes_1._cssText = absoluteToStylesheet(cssText, location.href);
                }
            }
            if (tagName === 'input' ||
                tagName === 'textarea' ||
                tagName === 'select') {
                var value = n.value;
                if (attributes_1.type !== 'radio' &&
                    attributes_1.type !== 'checkbox' &&
                    attributes_1.type !== 'submit' &&
                    attributes_1.type !== 'button' &&
                    value) {
                    attributes_1.value =
                        maskInputOptions[attributes_1.type] ||
                            maskInputOptions[tagName]
                            ? '*'.repeat(value.length)
                            : value;
                }
                else if (n.checked) {
                    attributes_1.checked = n.checked;
                }
            }
            if (tagName === 'option') {
                var selectValue = n.parentElement;
                if (attributes_1.value === selectValue.value) {
                    attributes_1.selected = n.selected;
                }
            }
            if (tagName === 'canvas' && recordCanvas) {
                attributes_1.rr_dataURL = n.toDataURL();
            }
            if (tagName === 'audio' || tagName === 'video') {
                attributes_1.rr_mediaState = n.paused
                    ? 'paused'
                    : 'played';
            }
            if (n.scrollLeft) {
                attributes_1.rr_scrollLeft = n.scrollLeft;
            }
            if (n.scrollTop) {
                attributes_1.rr_scrollTop = n.scrollTop;
            }
            if (needBlock) {
                var _d = n.getBoundingClientRect(), width = _d.width, height = _d.height;
                attributes_1 = {
                    class: attributes_1.class,
                    rr_width: width + "px",
                    rr_height: height + "px",
                };
            }
            return {
                type: NodeType.Element,
                tagName: tagName,
                attributes: attributes_1,
                childNodes: [],
                isSVG: isSVGElement(n) || undefined,
                needBlock: needBlock,
            };
        case n.TEXT_NODE:
            var parentTagName = n.parentNode && n.parentNode.tagName;
            var textContent = n.textContent;
            var isStyle = parentTagName === 'STYLE' ? true : undefined;
            if (isStyle && textContent) {
                textContent = absoluteToStylesheet(textContent, location.href);
            }
            if (parentTagName === 'SCRIPT') {
                textContent = 'SCRIPT_PLACEHOLDER';
            }
            return {
                type: NodeType.Text,
                textContent: textContent || '',
                isStyle: isStyle,
            };
        case n.CDATA_SECTION_NODE:
            return {
                type: NodeType.CDATA,
                textContent: '',
            };
        case n.COMMENT_NODE:
            return {
                type: NodeType.Comment,
                textContent: n.textContent || '',
            };
        default:
            return false;
    }
}
function lowerIfExists(maybeAttr) {
    if (maybeAttr === undefined) {
        return '';
    }
    else {
        return maybeAttr.toLowerCase();
    }
}
function slimDOMExcluded(sn, slimDOMOptions) {
    if (slimDOMOptions.comment && sn.type === NodeType.Comment) {
        return true;
    }
    else if (sn.type === NodeType.Element) {
        if (slimDOMOptions.script &&
            (sn.tagName === 'script' ||
                (sn.tagName === 'link' &&
                    sn.attributes.rel === 'preload' &&
                    sn.attributes.as === 'script'))) {
            return true;
        }
        else if (slimDOMOptions.headFavicon &&
            ((sn.tagName === 'link' && sn.attributes.rel === 'shortcut icon') ||
                (sn.tagName === 'meta' &&
                    (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) ||
                        lowerIfExists(sn.attributes.name) === 'application-name' ||
                        lowerIfExists(sn.attributes.rel) === 'icon' ||
                        lowerIfExists(sn.attributes.rel) === 'apple-touch-icon' ||
                        lowerIfExists(sn.attributes.rel) === 'shortcut icon')))) {
            return true;
        }
        else if (sn.tagName === 'meta') {
            if (slimDOMOptions.headMetaDescKeywords &&
                lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
                return true;
            }
            else if (slimDOMOptions.headMetaSocial &&
                (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) ||
                    lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) ||
                    lowerIfExists(sn.attributes.name) === 'pinterest')) {
                return true;
            }
            else if (slimDOMOptions.headMetaRobots &&
                (lowerIfExists(sn.attributes.name) === 'robots' ||
                    lowerIfExists(sn.attributes.name) === 'googlebot' ||
                    lowerIfExists(sn.attributes.name) === 'bingbot')) {
                return true;
            }
            else if (slimDOMOptions.headMetaHttpEquiv &&
                sn.attributes['http-equiv'] !== undefined) {
                return true;
            }
            else if (slimDOMOptions.headMetaAuthorship &&
                (lowerIfExists(sn.attributes.name) === 'author' ||
                    lowerIfExists(sn.attributes.name) === 'generator' ||
                    lowerIfExists(sn.attributes.name) === 'framework' ||
                    lowerIfExists(sn.attributes.name) === 'publisher' ||
                    lowerIfExists(sn.attributes.name) === 'progid' ||
                    lowerIfExists(sn.attributes.property).match(/^article:/) ||
                    lowerIfExists(sn.attributes.property).match(/^product:/))) {
                return true;
            }
            else if (slimDOMOptions.headMetaVerification &&
                (lowerIfExists(sn.attributes.name) === 'google-site-verification' ||
                    lowerIfExists(sn.attributes.name) === 'yandex-verification' ||
                    lowerIfExists(sn.attributes.name) === 'csrf-token' ||
                    lowerIfExists(sn.attributes.name) === 'p:domain_verify' ||
                    lowerIfExists(sn.attributes.name) === 'verify-v1' ||
                    lowerIfExists(sn.attributes.name) === 'verification' ||
                    lowerIfExists(sn.attributes.name) === 'shopify-checkout-api-token')) {
                return true;
            }
        }
    }
    return false;
}
function serializeNodeWithId(n, options) {
    var doc = options.doc, map = options.map, blockClass = options.blockClass, blockSelector = options.blockSelector, _a = options.skipChild, skipChild = _a === void 0 ? false : _a, _b = options.inlineStylesheet, inlineStylesheet = _b === void 0 ? true : _b, _c = options.maskInputOptions, maskInputOptions = _c === void 0 ? {} : _c, slimDOMOptions = options.slimDOMOptions, _d = options.recordCanvas, recordCanvas = _d === void 0 ? false : _d;
    var _e = options.preserveWhiteSpace, preserveWhiteSpace = _e === void 0 ? true : _e;
    var _serializedNode = serializeNode(n, {
        doc: doc,
        blockClass: blockClass,
        blockSelector: blockSelector,
        inlineStylesheet: inlineStylesheet,
        maskInputOptions: maskInputOptions,
        recordCanvas: recordCanvas,
    });
    if (!_serializedNode) {
        console.warn(n, 'not serialized');
        return null;
    }
    var id;
    if ('__sn' in n) {
        id = n.__sn.id;
    }
    else if (slimDOMExcluded(_serializedNode, slimDOMOptions) ||
        (!preserveWhiteSpace &&
            _serializedNode.type === NodeType.Text &&
            !_serializedNode.isStyle &&
            !_serializedNode.textContent.replace(/^\s+|\s+$/gm, '').length)) {
        id = IGNORED_NODE;
    }
    else {
        id = genId();
    }
    var serializedNode = Object.assign(_serializedNode, { id: id });
    n.__sn = serializedNode;
    if (id === IGNORED_NODE) {
        return null;
    }
    map[id] = n;
    var recordChild = !skipChild;
    if (serializedNode.type === NodeType.Element) {
        recordChild = recordChild && !serializedNode.needBlock;
        delete serializedNode.needBlock;
    }
    if ((serializedNode.type === NodeType.Document ||
        serializedNode.type === NodeType.Element) &&
        recordChild) {
        if (slimDOMOptions.headWhitespace &&
            _serializedNode.type === NodeType.Element &&
            _serializedNode.tagName === 'head') {
            preserveWhiteSpace = false;
        }
        for (var _i = 0, _f = Array.from(n.childNodes); _i < _f.length; _i++) {
            var childN = _f[_i];
            var serializedChildNode = serializeNodeWithId(childN, {
                doc: doc,
                map: map,
                blockClass: blockClass,
                blockSelector: blockSelector,
                skipChild: skipChild,
                inlineStylesheet: inlineStylesheet,
                maskInputOptions: maskInputOptions,
                slimDOMOptions: slimDOMOptions,
                recordCanvas: recordCanvas,
                preserveWhiteSpace: preserveWhiteSpace,
            });
            if (serializedChildNode) {
                serializedNode.childNodes.push(serializedChildNode);
            }
        }
    }
    return serializedNode;
}
function snapshot(n, options) {
    var _a = options || {}, _b = _a.blockClass, blockClass = _b === void 0 ? 'rr-block' : _b, _c = _a.inlineStylesheet, inlineStylesheet = _c === void 0 ? true : _c, _d = _a.recordCanvas, recordCanvas = _d === void 0 ? false : _d, _e = _a.blockSelector, blockSelector = _e === void 0 ? null : _e, _f = _a.maskAllInputs, maskAllInputs = _f === void 0 ? false : _f, _g = _a.slimDOM, slimDOM = _g === void 0 ? false : _g;
    var idNodeMap = {};
    var maskInputOptions = maskAllInputs === true
        ? {
            color: true,
            date: true,
            'datetime-local': true,
            email: true,
            month: true,
            number: true,
            range: true,
            search: true,
            tel: true,
            text: true,
            time: true,
            url: true,
            week: true,
            textarea: true,
            select: true,
        }
        : maskAllInputs === false
            ? {}
            : maskAllInputs;
    var slimDOMOptions = slimDOM === true || slimDOM === 'all'
        ?
            {
                script: true,
                comment: true,
                headFavicon: true,
                headWhitespace: true,
                headMetaDescKeywords: slimDOM === 'all',
                headMetaSocial: true,
                headMetaRobots: true,
                headMetaHttpEquiv: true,
                headMetaAuthorship: true,
                headMetaVerification: true,
            }
        : slimDOM === false
            ? {}
            : slimDOM;
    return [
        serializeNodeWithId(n, {
            doc: n,
            map: idNodeMap,
            blockClass: blockClass,
            blockSelector: blockSelector,
            skipChild: false,
            inlineStylesheet: inlineStylesheet,
            maskInputOptions: maskInputOptions,
            slimDOMOptions: slimDOMOptions,
            recordCanvas: recordCanvas,
        }),
        idNodeMap,
    ];
}

var EventType;
(function (EventType) {
    EventType[EventType["DomContentLoaded"] = 0] = "DomContentLoaded";
    EventType[EventType["Load"] = 1] = "Load";
    EventType[EventType["FullSnapshot"] = 2] = "FullSnapshot";
    EventType[EventType["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
    EventType[EventType["Meta"] = 4] = "Meta";
    EventType[EventType["Custom"] = 5] = "Custom";
})(EventType || (EventType = {}));
var IncrementalSource;
(function (IncrementalSource) {
    IncrementalSource[IncrementalSource["Mutation"] = 0] = "Mutation";
    IncrementalSource[IncrementalSource["MouseMove"] = 1] = "MouseMove";
    IncrementalSource[IncrementalSource["MouseInteraction"] = 2] = "MouseInteraction";
    IncrementalSource[IncrementalSource["Scroll"] = 3] = "Scroll";
    IncrementalSource[IncrementalSource["ViewportResize"] = 4] = "ViewportResize";
    IncrementalSource[IncrementalSource["Input"] = 5] = "Input";
    IncrementalSource[IncrementalSource["TouchMove"] = 6] = "TouchMove";
    IncrementalSource[IncrementalSource["MediaInteraction"] = 7] = "MediaInteraction";
    IncrementalSource[IncrementalSource["StyleSheetRule"] = 8] = "StyleSheetRule";
    IncrementalSource[IncrementalSource["CanvasMutation"] = 9] = "CanvasMutation";
    IncrementalSource[IncrementalSource["Font"] = 10] = "Font";
    IncrementalSource[IncrementalSource["Log"] = 11] = "Log";
})(IncrementalSource || (IncrementalSource = {}));
var MouseInteractions;
(function (MouseInteractions) {
    MouseInteractions[MouseInteractions["MouseUp"] = 0] = "MouseUp";
    MouseInteractions[MouseInteractions["MouseDown"] = 1] = "MouseDown";
    MouseInteractions[MouseInteractions["Click"] = 2] = "Click";
    MouseInteractions[MouseInteractions["ContextMenu"] = 3] = "ContextMenu";
    MouseInteractions[MouseInteractions["DblClick"] = 4] = "DblClick";
    MouseInteractions[MouseInteractions["Focus"] = 5] = "Focus";
    MouseInteractions[MouseInteractions["Blur"] = 6] = "Blur";
    MouseInteractions[MouseInteractions["TouchStart"] = 7] = "TouchStart";
    MouseInteractions[MouseInteractions["TouchMove_Departed"] = 8] = "TouchMove_Departed";
    MouseInteractions[MouseInteractions["TouchEnd"] = 9] = "TouchEnd";
})(MouseInteractions || (MouseInteractions = {}));
var MediaInteractions;
(function (MediaInteractions) {
    MediaInteractions[MediaInteractions["Play"] = 0] = "Play";
    MediaInteractions[MediaInteractions["Pause"] = 1] = "Pause";
})(MediaInteractions || (MediaInteractions = {}));
var ReplayerEvents;
(function (ReplayerEvents) {
    ReplayerEvents["Start"] = "start";
    ReplayerEvents["Pause"] = "pause";
    ReplayerEvents["Resume"] = "resume";
    ReplayerEvents["Resize"] = "resize";
    ReplayerEvents["Finish"] = "finish";
    ReplayerEvents["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
    ReplayerEvents["LoadStylesheetStart"] = "load-stylesheet-start";
    ReplayerEvents["LoadStylesheetEnd"] = "load-stylesheet-end";
    ReplayerEvents["SkipStart"] = "skip-start";
    ReplayerEvents["SkipEnd"] = "skip-end";
    ReplayerEvents["MouseInteraction"] = "mouse-interaction";
    ReplayerEvents["EventCast"] = "event-cast";
    ReplayerEvents["CustomEvent"] = "custom-event";
    ReplayerEvents["Flush"] = "flush";
    ReplayerEvents["StateChange"] = "state-change";
})(ReplayerEvents || (ReplayerEvents = {}));

function on(type, fn, target) {
    if (target === void 0) { target = document; }
    var options = { capture: true, passive: true };
    target.addEventListener(type, fn, options);
    return function () { return target.removeEventListener(type, fn, options); };
}
var mirror = {
    map: {},
    getId: function (n) {
        if (!n.__sn) {
            return -1;
        }
        return n.__sn.id;
    },
    getNode: function (id) {
        return mirror.map[id] || null;
    },
    removeNodeFromMap: function (n) {
        var id = n.__sn && n.__sn.id;
        delete mirror.map[id];
        if (n.childNodes) {
            n.childNodes.forEach(function (child) {
                return mirror.removeNodeFromMap(child);
            });
        }
    },
    has: function (id) {
        return mirror.map.hasOwnProperty(id);
    },
};
function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var timeout = null;
    var previous = 0;
    return function (arg) {
        var now = Date.now();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        var context = this;
        var args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = window.setTimeout(function () {
                previous = options.leading === false ? 0 : Date.now();
                timeout = null;
                func.apply(context, args);
            }, remaining);
        }
    };
}
function hookSetter(target, key, d, isRevoked, win) {
    if (win === void 0) { win = window; }
    var original = win.Object.getOwnPropertyDescriptor(target, key);
    win.Object.defineProperty(target, key, isRevoked
        ? d
        : {
            set: function (value) {
                var _this = this;
                setTimeout(function () {
                    d.set.call(_this, value);
                }, 0);
                if (original && original.set) {
                    original.set.call(this, value);
                }
            },
        });
    return function () { return hookSetter(target, key, original || {}, true); };
}
function patch(source, name, replacement) {
    try {
        if (!(name in source)) {
            return function () { };
        }
        var original_1 = source[name];
        var wrapped = replacement(original_1);
        if (typeof wrapped === 'function') {
            wrapped.prototype = wrapped.prototype || {};
            Object.defineProperties(wrapped, {
                __rrweb_original__: {
                    enumerable: false,
                    value: original_1,
                },
            });
        }
        source[name] = wrapped;
        return function () {
            source[name] = original_1;
        };
    }
    catch (_a) {
        return function () { };
    }
}
function getWindowHeight() {
    return (window.innerHeight ||
        (document.documentElement && document.documentElement.clientHeight) ||
        (document.body && document.body.clientHeight));
}
function getWindowWidth() {
    return (window.innerWidth ||
        (document.documentElement && document.documentElement.clientWidth) ||
        (document.body && document.body.clientWidth));
}
function isBlocked(node, blockClass) {
    if (!node) {
        return false;
    }
    if (node.nodeType === node.ELEMENT_NODE) {
        var needBlock_1 = false;
        if (typeof blockClass === 'string') {
            needBlock_1 = node.classList.contains(blockClass);
        }
        else {
            node.classList.forEach(function (className) {
                if (blockClass.test(className)) {
                    needBlock_1 = true;
                }
            });
        }
        return needBlock_1 || isBlocked(node.parentNode, blockClass);
    }
    if (node.nodeType === node.TEXT_NODE) {
        return isBlocked(node.parentNode, blockClass);
    }
    return isBlocked(node.parentNode, blockClass);
}
function isIgnored(n) {
    if ('__sn' in n) {
        return n.__sn.id === IGNORED_NODE;
    }
    return false;
}
function isAncestorRemoved(target) {
    var id = mirror.getId(target);
    if (!mirror.has(id)) {
        return true;
    }
    if (target.parentNode &&
        target.parentNode.nodeType === target.DOCUMENT_NODE) {
        return false;
    }
    if (!target.parentNode) {
        return true;
    }
    return isAncestorRemoved(target.parentNode);
}
function isTouchEvent(event) {
    return Boolean(event.changedTouches);
}
function polyfill(win) {
    if (win === void 0) { win = window; }
    if ('NodeList' in win && !win.NodeList.prototype.forEach) {
        win.NodeList.prototype.forEach = Array.prototype
            .forEach;
    }
    if ('DOMTokenList' in win && !win.DOMTokenList.prototype.forEach) {
        win.DOMTokenList.prototype.forEach = Array.prototype
            .forEach;
    }
}

function isNodeInLinkedList(n) {
    return '__ln' in n;
}
var DoubleLinkedList = (function () {
    function DoubleLinkedList() {
        this.length = 0;
        this.head = null;
    }
    DoubleLinkedList.prototype.get = function (position) {
        if (position >= this.length) {
            throw new Error('Position outside of list range');
        }
        var current = this.head;
        for (var index = 0; index < position; index++) {
            current = (current === null || current === void 0 ? void 0 : current.next) || null;
        }
        return current;
    };
    DoubleLinkedList.prototype.addNode = function (n) {
        var node = {
            value: n,
            previous: null,
            next: null,
        };
        n.__ln = node;
        if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
            var current = n.previousSibling.__ln.next;
            node.next = current;
            node.previous = n.previousSibling.__ln;
            n.previousSibling.__ln.next = node;
            if (current) {
                current.previous = node;
            }
        }
        else if (n.nextSibling && isNodeInLinkedList(n.nextSibling)) {
            var current = n.nextSibling.__ln.previous;
            node.previous = current;
            node.next = n.nextSibling.__ln;
            n.nextSibling.__ln.previous = node;
            if (current) {
                current.next = node;
            }
        }
        else {
            if (this.head) {
                this.head.previous = node;
            }
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    };
    DoubleLinkedList.prototype.removeNode = function (n) {
        var current = n.__ln;
        if (!this.head) {
            return;
        }
        if (!current.previous) {
            this.head = current.next;
            if (this.head) {
                this.head.previous = null;
            }
        }
        else {
            current.previous.next = current.next;
            if (current.next) {
                current.next.previous = current.previous;
            }
        }
        if (n.__ln) {
            delete n.__ln;
        }
        this.length--;
    };
    return DoubleLinkedList;
}());
var moveKey = function (id, parentId) { return id + "@" + parentId; };
function isINode(n) {
    return '__sn' in n;
}
var MutationBuffer = (function () {
    function MutationBuffer() {
        var _this = this;
        this.frozen = false;
        this.texts = [];
        this.attributes = [];
        this.removes = [];
        this.mapRemoves = [];
        this.movedMap = {};
        this.addedSet = new Set();
        this.movedSet = new Set();
        this.droppedSet = new Set();
        this.processMutations = function (mutations) {
            mutations.forEach(_this.processMutation);
            if (!_this.frozen) {
                _this.emit();
            }
        };
        this.emit = function () {
            var e_1, _a, e_2, _b;
            var adds = [];
            var addList = new DoubleLinkedList();
            var getNextId = function (n) {
                var ns = n;
                var nextId = IGNORED_NODE;
                while (nextId === IGNORED_NODE) {
                    ns = ns && ns.nextSibling;
                    nextId = ns && mirror.getId(ns);
                }
                if (nextId === -1 && isBlocked(n.nextSibling, _this.blockClass)) {
                    nextId = null;
                }
                return nextId;
            };
            var pushAdd = function (n) {
                if (!n.parentNode || !document.contains(n)) {
                    return;
                }
                var parentId = mirror.getId(n.parentNode);
                var nextId = getNextId(n);
                if (parentId === -1 || nextId === -1) {
                    return addList.addNode(n);
                }
                var sn = serializeNodeWithId(n, {
                    doc: document,
                    map: mirror.map,
                    blockClass: _this.blockClass,
                    blockSelector: _this.blockSelector,
                    skipChild: true,
                    inlineStylesheet: _this.inlineStylesheet,
                    maskInputOptions: _this.maskInputOptions,
                    slimDOMOptions: _this.slimDOMOptions,
                    recordCanvas: _this.recordCanvas,
                });
                if (sn) {
                    adds.push({
                        parentId: parentId,
                        nextId: nextId,
                        node: sn,
                    });
                }
            };
            while (_this.mapRemoves.length) {
                mirror.removeNodeFromMap(_this.mapRemoves.shift());
            }
            try {
                for (var _c = __values(_this.movedSet), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var n = _d.value;
                    if (isParentRemoved(_this.removes, n) &&
                        !_this.movedSet.has(n.parentNode)) {
                        continue;
                    }
                    pushAdd(n);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(_this.addedSet), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var n = _f.value;
                    if (!isAncestorInSet(_this.droppedSet, n) &&
                        !isParentRemoved(_this.removes, n)) {
                        pushAdd(n);
                    }
                    else if (isAncestorInSet(_this.movedSet, n)) {
                        pushAdd(n);
                    }
                    else {
                        _this.droppedSet.add(n);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var candidate = null;
            while (addList.length) {
                var node = null;
                if (candidate) {
                    var parentId = mirror.getId(candidate.value.parentNode);
                    var nextId = getNextId(candidate.value);
                    if (parentId !== -1 && nextId !== -1) {
                        node = candidate;
                    }
                }
                if (!node) {
                    for (var index = addList.length - 1; index >= 0; index--) {
                        var _node = addList.get(index);
                        var parentId = mirror.getId(_node.value.parentNode);
                        var nextId = getNextId(_node.value);
                        if (parentId !== -1 && nextId !== -1) {
                            node = _node;
                            break;
                        }
                    }
                }
                if (!node) {
                    while (addList.head) {
                        addList.removeNode(addList.head.value);
                    }
                    break;
                }
                candidate = node.previous;
                addList.removeNode(node.value);
                pushAdd(node.value);
            }
            var payload = {
                texts: _this.texts
                    .map(function (text) { return ({
                    id: mirror.getId(text.node),
                    value: text.value,
                }); })
                    .filter(function (text) { return mirror.has(text.id); }),
                attributes: _this.attributes
                    .map(function (attribute) { return ({
                    id: mirror.getId(attribute.node),
                    attributes: attribute.attributes,
                }); })
                    .filter(function (attribute) { return mirror.has(attribute.id); }),
                removes: _this.removes,
                adds: adds,
            };
            if (!payload.texts.length &&
                !payload.attributes.length &&
                !payload.removes.length &&
                !payload.adds.length) {
                return;
            }
            _this.texts = [];
            _this.attributes = [];
            _this.removes = [];
            _this.addedSet = new Set();
            _this.movedSet = new Set();
            _this.droppedSet = new Set();
            _this.movedMap = {};
            _this.emissionCallback(payload);
        };
        this.processMutation = function (m) {
            if (isIgnored(m.target)) {
                return;
            }
            switch (m.type) {
                case 'characterData': {
                    var value = m.target.textContent;
                    if (!isBlocked(m.target, _this.blockClass) && value !== m.oldValue) {
                        _this.texts.push({
                            value: value,
                            node: m.target,
                        });
                    }
                    break;
                }
                case 'attributes': {
                    var value = m.target.getAttribute(m.attributeName);
                    if (isBlocked(m.target, _this.blockClass) || value === m.oldValue) {
                        return;
                    }
                    var item = _this.attributes.find(function (a) { return a.node === m.target; });
                    if (!item) {
                        item = {
                            node: m.target,
                            attributes: {},
                        };
                        _this.attributes.push(item);
                    }
                    item.attributes[m.attributeName] = transformAttribute(document, m.attributeName, value);
                    break;
                }
                case 'childList': {
                    m.addedNodes.forEach(function (n) { return _this.genAdds(n, m.target); });
                    m.removedNodes.forEach(function (n) {
                        var nodeId = mirror.getId(n);
                        var parentId = mirror.getId(m.target);
                        if (isBlocked(n, _this.blockClass) ||
                            isBlocked(m.target, _this.blockClass) ||
                            isIgnored(n)) {
                            return;
                        }
                        if (_this.addedSet.has(n)) {
                            deepDelete(_this.addedSet, n);
                            _this.droppedSet.add(n);
                        }
                        else if (_this.addedSet.has(m.target) && nodeId === -1) ;
                        else if (isAncestorRemoved(m.target)) ;
                        else if (_this.movedSet.has(n) &&
                            _this.movedMap[moveKey(nodeId, parentId)]) {
                            deepDelete(_this.movedSet, n);
                        }
                        else {
                            _this.removes.push({
                                parentId: parentId,
                                id: nodeId,
                            });
                        }
                        _this.mapRemoves.push(n);
                    });
                    break;
                }
            }
        };
        this.genAdds = function (n, target) {
            if (isBlocked(n, _this.blockClass)) {
                return;
            }
            if (target && isBlocked(target, _this.blockClass)) {
                return;
            }
            if (isINode(n)) {
                if (isIgnored(n)) {
                    return;
                }
                _this.movedSet.add(n);
                var targetId = null;
                if (target && isINode(target)) {
                    targetId = target.__sn.id;
                }
                if (targetId) {
                    _this.movedMap[moveKey(n.__sn.id, targetId)] = true;
                }
            }
            else {
                _this.addedSet.add(n);
                _this.droppedSet.delete(n);
            }
            n.childNodes.forEach(function (childN) { return _this.genAdds(childN); });
        };
    }
    MutationBuffer.prototype.init = function (cb, blockClass, blockSelector, inlineStylesheet, maskInputOptions, recordCanvas, slimDOMOptions) {
        this.blockClass = blockClass;
        this.blockSelector = blockSelector;
        this.inlineStylesheet = inlineStylesheet;
        this.maskInputOptions = maskInputOptions;
        this.recordCanvas = recordCanvas;
        this.slimDOMOptions = slimDOMOptions;
        this.emissionCallback = cb;
    };
    MutationBuffer.prototype.freeze = function () {
        this.frozen = true;
    };
    MutationBuffer.prototype.unfreeze = function () {
        this.frozen = false;
    };
    MutationBuffer.prototype.isFrozen = function () {
        return this.frozen;
    };
    return MutationBuffer;
}());
function deepDelete(addsSet, n) {
    addsSet.delete(n);
    n.childNodes.forEach(function (childN) { return deepDelete(addsSet, childN); });
}
function isParentRemoved(removes, n) {
    var parentNode = n.parentNode;
    if (!parentNode) {
        return false;
    }
    var parentId = mirror.getId(parentNode);
    if (removes.some(function (r) { return r.id === parentId; })) {
        return true;
    }
    return isParentRemoved(removes, parentNode);
}
function isAncestorInSet(set, n) {
    var parentNode = n.parentNode;
    if (!parentNode) {
        return false;
    }
    if (set.has(parentNode)) {
        return true;
    }
    return isAncestorInSet(set, parentNode);
}

function pathToSelector(node) {
    if (!node || !node.outerHTML) {
        return '';
    }
    var path = '';
    while (node.parentElement) {
        var name = node.localName;
        if (!name)
            break;
        name = name.toLowerCase();
        var parent = node.parentElement;
        var domSiblings = [];
        if (parent.children && parent.children.length > 0) {
            for (var i = 0; i < parent.children.length; i++) {
                var sibling = parent.children[i];
                if (sibling.localName && sibling.localName.toLowerCase) {
                    if (sibling.localName.toLowerCase() === name) {
                        domSiblings.push(sibling);
                    }
                }
            }
        }
        if (domSiblings.length > 1) {
            name += ':eq(' + domSiblings.indexOf(node) + ')';
        }
        path = name + (path ? '>' + path : '');
        node = parent;
    }
    return path;
}
function stringify(obj, stringifyOptions) {
    var options = {
        numOfKeysLimit: 50,
    };
    Object.assign(options, stringifyOptions);
    var stack = [], keys = [];
    return JSON.stringify(obj, function (key, value) {
        if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value)) {
                if (stack[0] === value)
                    value = '[Circular ~]';
                else
                    value =
                        '[Circular ~.' +
                            keys.slice(0, stack.indexOf(value)).join('.') +
                            ']';
            }
        }
        else
            stack.push(value);
        if (value === null || value === undefined)
            return value;
        if (shouldToString(value)) {
            return toString(value);
        }
        if (value instanceof Event) {
            var eventResult = {};
            for (var key_1 in value) {
                var eventValue = value[key_1];
                if (Array.isArray(eventValue))
                    eventResult[key_1] = pathToSelector(eventValue.length ? eventValue[0] : null);
                else
                    eventResult[key_1] = eventValue;
            }
            return eventResult;
        }
        else if (value instanceof Node) {
            if (value instanceof HTMLElement)
                return value ? value.outerHTML : '';
            return value.nodeName;
        }
        return value;
    });
    function shouldToString(obj) {
        if (typeof obj === 'object' &&
            Object.keys(obj).length > options.numOfKeysLimit)
            return true;
        if (typeof obj === 'function')
            return true;
        return false;
    }
    function toString(obj) {
        var str = obj.toString();
        if (options.stringLengthLimit && str.length > options.stringLengthLimit) {
            str = str.slice(0, options.stringLengthLimit) + "...";
        }
        return str;
    }
}

var mutationBuffer = new MutationBuffer();
function initMutationObserver(cb, blockClass, blockSelector, inlineStylesheet, maskInputOptions, recordCanvas, slimDOMOptions) {
    mutationBuffer.init(cb, blockClass, blockSelector, inlineStylesheet, maskInputOptions, recordCanvas, slimDOMOptions);
    var observer = new MutationObserver(mutationBuffer.processMutations.bind(mutationBuffer));
    observer.observe(document, {
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true,
    });
    return observer;
}
function initMoveObserver(cb, sampling) {
    if (sampling.mousemove === false) {
        return function () { };
    }
    var threshold = typeof sampling.mousemove === 'number' ? sampling.mousemove : 50;
    var positions = [];
    var timeBaseline;
    var wrappedCb = throttle(function (isTouch) {
        var totalOffset = Date.now() - timeBaseline;
        cb(positions.map(function (p) {
            p.timeOffset -= totalOffset;
            return p;
        }), isTouch ? IncrementalSource.TouchMove : IncrementalSource.MouseMove);
        positions = [];
        timeBaseline = null;
    }, 500);
    var updatePosition = throttle(function (evt) {
        var target = evt.target;
        var _a = isTouchEvent(evt)
            ? evt.changedTouches[0]
            : evt, clientX = _a.clientX, clientY = _a.clientY;
        if (!timeBaseline) {
            timeBaseline = Date.now();
        }
        positions.push({
            x: clientX,
            y: clientY,
            id: mirror.getId(target),
            timeOffset: Date.now() - timeBaseline,
        });
        wrappedCb(isTouchEvent(evt));
    }, threshold, {
        trailing: false,
    });
    var handlers = [
        on('mousemove', updatePosition),
        on('touchmove', updatePosition),
    ];
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initMouseInteractionObserver(cb, blockClass, sampling) {
    if (sampling.mouseInteraction === false) {
        return function () { };
    }
    var disableMap = sampling.mouseInteraction === true ||
        sampling.mouseInteraction === undefined
        ? {}
        : sampling.mouseInteraction;
    var handlers = [];
    var getHandler = function (eventKey) {
        return function (event) {
            if (isBlocked(event.target, blockClass)) {
                return;
            }
            var id = mirror.getId(event.target);
            var _a = isTouchEvent(event)
                ? event.changedTouches[0]
                : event, clientX = _a.clientX, clientY = _a.clientY;
            cb({
                type: MouseInteractions[eventKey],
                id: id,
                x: clientX,
                y: clientY,
            });
        };
    };
    Object.keys(MouseInteractions)
        .filter(function (key) {
        return Number.isNaN(Number(key)) &&
            !key.endsWith('_Departed') &&
            disableMap[key] !== false;
    })
        .forEach(function (eventKey) {
        var eventName = eventKey.toLowerCase();
        var handler = getHandler(eventKey);
        handlers.push(on(eventName, handler));
    });
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initScrollObserver(cb, blockClass, sampling) {
    var updatePosition = throttle(function (evt) {
        if (!evt.target || isBlocked(evt.target, blockClass)) {
            return;
        }
        var id = mirror.getId(evt.target);
        if (evt.target === document) {
            var scrollEl = (document.scrollingElement || document.documentElement);
            cb({
                id: id,
                x: scrollEl.scrollLeft,
                y: scrollEl.scrollTop,
            });
        }
        else {
            cb({
                id: id,
                x: evt.target.scrollLeft,
                y: evt.target.scrollTop,
            });
        }
    }, sampling.scroll || 100);
    return on('scroll', updatePosition);
}
function initViewportResizeObserver(cb) {
    var last_h = -1;
    var last_w = -1;
    var updateDimension = throttle(function () {
        var height = getWindowHeight();
        var width = getWindowWidth();
        if (last_h !== height || last_w != width) {
            cb({
                width: Number(width),
                height: Number(height),
            });
            last_h = height;
            last_w = width;
        }
    }, 200);
    return on('resize', updateDimension, window);
}
var INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
var lastInputValueMap = new WeakMap();
function initInputObserver(cb, blockClass, ignoreClass, maskInputOptions, maskInputFn, sampling) {
    function eventHandler(event) {
        var target = event.target;
        if (!target ||
            !target.tagName ||
            INPUT_TAGS.indexOf(target.tagName) < 0 ||
            isBlocked(target, blockClass)) {
            return;
        }
        var type = target.type;
        if (type === 'password' ||
            target.classList.contains(ignoreClass)) {
            return;
        }
        var text = target.value;
        var isChecked = false;
        if (type === 'radio' || type === 'checkbox') {
            isChecked = target.checked;
        }
        else if (maskInputOptions[target.tagName.toLowerCase()] ||
            maskInputOptions[type]) {
            if (maskInputFn) {
                text = maskInputFn(text);
            }
            else {
                text = '*'.repeat(text.length);
            }
        }
        cbWithDedup(target, { text: text, isChecked: isChecked });
        var name = target.name;
        if (type === 'radio' && name && isChecked) {
            document
                .querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]")
                .forEach(function (el) {
                if (el !== target) {
                    cbWithDedup(el, {
                        text: el.value,
                        isChecked: !isChecked,
                    });
                }
            });
        }
    }
    function cbWithDedup(target, v) {
        var lastInputValue = lastInputValueMap.get(target);
        if (!lastInputValue ||
            lastInputValue.text !== v.text ||
            lastInputValue.isChecked !== v.isChecked) {
            lastInputValueMap.set(target, v);
            var id = mirror.getId(target);
            cb(__assign(__assign({}, v), { id: id }));
        }
    }
    var events = sampling.input === 'last' ? ['change'] : ['input', 'change'];
    var handlers = events.map(function (eventName) { return on(eventName, eventHandler); });
    var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    var hookProperties = [
        [HTMLInputElement.prototype, 'value'],
        [HTMLInputElement.prototype, 'checked'],
        [HTMLSelectElement.prototype, 'value'],
        [HTMLTextAreaElement.prototype, 'value'],
        [HTMLSelectElement.prototype, 'selectedIndex'],
    ];
    if (propertyDescriptor && propertyDescriptor.set) {
        handlers.push.apply(handlers, __spread(hookProperties.map(function (p) {
            return hookSetter(p[0], p[1], {
                set: function () {
                    eventHandler({ target: this });
                },
            });
        })));
    }
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initStyleSheetObserver(cb) {
    var insertRule = CSSStyleSheet.prototype.insertRule;
    CSSStyleSheet.prototype.insertRule = function (rule, index) {
        var id = mirror.getId(this.ownerNode);
        if (id !== -1) {
            cb({
                id: id,
                adds: [{ rule: rule, index: index }],
            });
        }
        return insertRule.apply(this, arguments);
    };
    var deleteRule = CSSStyleSheet.prototype.deleteRule;
    CSSStyleSheet.prototype.deleteRule = function (index) {
        var id = mirror.getId(this.ownerNode);
        if (id !== -1) {
            cb({
                id: id,
                removes: [{ index: index }],
            });
        }
        return deleteRule.apply(this, arguments);
    };
    return function () {
        CSSStyleSheet.prototype.insertRule = insertRule;
        CSSStyleSheet.prototype.deleteRule = deleteRule;
    };
}
function initMediaInteractionObserver(mediaInteractionCb, blockClass) {
    var handler = function (type) { return function (event) {
        var target = event.target;
        if (!target || isBlocked(target, blockClass)) {
            return;
        }
        mediaInteractionCb({
            type: type === 'play' ? MediaInteractions.Play : MediaInteractions.Pause,
            id: mirror.getId(target),
        });
    }; };
    var handlers = [on('play', handler('play')), on('pause', handler('pause'))];
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initCanvasMutationObserver(cb, blockClass) {
    var e_1, _a;
    var props = Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype);
    var handlers = [];
    var _loop_1 = function (prop) {
        try {
            if (typeof CanvasRenderingContext2D.prototype[prop] !== 'function') {
                return "continue";
            }
            var restoreHandler = patch(CanvasRenderingContext2D.prototype, prop, function (original) {
                return function () {
                    var _this = this;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (!isBlocked(this.canvas, blockClass)) {
                        setTimeout(function () {
                            var recordArgs = __spread(args);
                            if (prop === 'drawImage') {
                                if (recordArgs[0] &&
                                    recordArgs[0] instanceof HTMLCanvasElement) {
                                    recordArgs[0] = recordArgs[0].toDataURL();
                                }
                            }
                            cb({
                                id: mirror.getId(_this.canvas),
                                property: prop,
                                args: recordArgs,
                            });
                        }, 0);
                    }
                    return original.apply(this, args);
                };
            });
            handlers.push(restoreHandler);
        }
        catch (_a) {
            var hookHandler = hookSetter(CanvasRenderingContext2D.prototype, prop, {
                set: function (v) {
                    cb({
                        id: mirror.getId(this.canvas),
                        property: prop,
                        args: [v],
                        setter: true,
                    });
                },
            });
            handlers.push(hookHandler);
        }
    };
    try {
        for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
            var prop = props_1_1.value;
            _loop_1(prop);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initFontObserver(cb) {
    var handlers = [];
    var fontMap = new WeakMap();
    var originalFontFace = FontFace;
    window.FontFace = function FontFace(family, source, descriptors) {
        var fontFace = new originalFontFace(family, source, descriptors);
        fontMap.set(fontFace, {
            family: family,
            buffer: typeof source !== 'string',
            descriptors: descriptors,
            fontSource: typeof source === 'string'
                ? source
                :
                    JSON.stringify(Array.from(new Uint8Array(source))),
        });
        return fontFace;
    };
    var restoreHandler = patch(document.fonts, 'add', function (original) {
        return function (fontFace) {
            setTimeout(function () {
                var p = fontMap.get(fontFace);
                if (p) {
                    cb(p);
                    fontMap.delete(fontFace);
                }
            }, 0);
            return original.apply(this, [fontFace]);
        };
    });
    handlers.push(function () {
        window.FonFace = originalFontFace;
    });
    handlers.push(restoreHandler);
    return function () {
        handlers.forEach(function (h) { return h(); });
    };
}
function initLogObserver(cb, logOptions) {
    var e_2, _a;
    var _this = this;
    var logger = logOptions.logger;
    if (!logger)
        return function () { };
    var logCount = 0;
    var cancelHandlers = [];
    if (logOptions.level.includes('error')) {
        if (window) {
            var originalOnError_1 = window.onerror;
            window.onerror = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                originalOnError_1 && originalOnError_1.apply(_this, args);
                var stack = [];
                if (args[args.length - 1] instanceof Error)
                    stack = parseStack(args[args.length - 1].stack, 0);
                var payload = [stringify(args[0], logOptions.stringifyOptions)];
                cb({
                    level: 'error',
                    trace: stack,
                    payload: payload,
                });
            };
            cancelHandlers.push(function () {
                window.onerror = originalOnError_1;
            });
        }
    }
    try {
        for (var _b = __values(logOptions.level), _c = _b.next(); !_c.done; _c = _b.next()) {
            var levelType = _c.value;
            cancelHandlers.push(replace(logger, levelType));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return function () {
        cancelHandlers.forEach(function (h) { return h(); });
    };
    function replace(logger, level) {
        var _this = this;
        if (!logger[level])
            return function () { };
        return patch(logger, level, function (original) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                original.apply(_this, args);
                try {
                    var stack = parseStack(new Error().stack);
                    var payload = args.map(function (s) {
                        return stringify(s, logOptions.stringifyOptions);
                    });
                    logCount++;
                    if (logCount < logOptions.lengthThreshold)
                        cb({
                            level: level,
                            trace: stack,
                            payload: payload,
                        });
                    else if (logCount === logOptions.lengthThreshold)
                        cb({
                            level: 'warn',
                            trace: [],
                            payload: [
                                stringify('The number of log records reached the threshold.'),
                            ],
                        });
                }
                catch (error) {
                    original.apply(void 0, __spread(['rrweb logger error:', error], args));
                }
            };
        });
    }
    function parseStack(stack, omitDepth) {
        if (omitDepth === void 0) { omitDepth = 1; }
        var stacks = [];
        if (stack) {
            stacks = stack
                .split('at')
                .splice(1 + omitDepth)
                .map(function (s) { return s.trim(); });
        }
        return stacks;
    }
}
function mergeHooks(o, hooks) {
    var mutationCb = o.mutationCb, mousemoveCb = o.mousemoveCb, mouseInteractionCb = o.mouseInteractionCb, scrollCb = o.scrollCb, viewportResizeCb = o.viewportResizeCb, inputCb = o.inputCb, mediaInteractionCb = o.mediaInteractionCb, styleSheetRuleCb = o.styleSheetRuleCb, canvasMutationCb = o.canvasMutationCb, fontCb = o.fontCb, logCb = o.logCb;
    o.mutationCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.mutation) {
            hooks.mutation.apply(hooks, __spread(p));
        }
        mutationCb.apply(void 0, __spread(p));
    };
    o.mousemoveCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.mousemove) {
            hooks.mousemove.apply(hooks, __spread(p));
        }
        mousemoveCb.apply(void 0, __spread(p));
    };
    o.mouseInteractionCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.mouseInteraction) {
            hooks.mouseInteraction.apply(hooks, __spread(p));
        }
        mouseInteractionCb.apply(void 0, __spread(p));
    };
    o.scrollCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.scroll) {
            hooks.scroll.apply(hooks, __spread(p));
        }
        scrollCb.apply(void 0, __spread(p));
    };
    o.viewportResizeCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.viewportResize) {
            hooks.viewportResize.apply(hooks, __spread(p));
        }
        viewportResizeCb.apply(void 0, __spread(p));
    };
    o.inputCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.input) {
            hooks.input.apply(hooks, __spread(p));
        }
        inputCb.apply(void 0, __spread(p));
    };
    o.mediaInteractionCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.mediaInteaction) {
            hooks.mediaInteaction.apply(hooks, __spread(p));
        }
        mediaInteractionCb.apply(void 0, __spread(p));
    };
    o.styleSheetRuleCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.styleSheetRule) {
            hooks.styleSheetRule.apply(hooks, __spread(p));
        }
        styleSheetRuleCb.apply(void 0, __spread(p));
    };
    o.canvasMutationCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.canvasMutation) {
            hooks.canvasMutation.apply(hooks, __spread(p));
        }
        canvasMutationCb.apply(void 0, __spread(p));
    };
    o.fontCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.font) {
            hooks.font.apply(hooks, __spread(p));
        }
        fontCb.apply(void 0, __spread(p));
    };
    o.logCb = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        if (hooks.log) {
            hooks.log.apply(hooks, __spread(p));
        }
        logCb.apply(void 0, __spread(p));
    };
}
function initObservers(o, hooks) {
    if (hooks === void 0) { hooks = {}; }
    mergeHooks(o, hooks);
    var mutationObserver = initMutationObserver(o.mutationCb, o.blockClass, o.blockSelector, o.inlineStylesheet, o.maskInputOptions, o.recordCanvas, o.slimDOMOptions);
    var mousemoveHandler = initMoveObserver(o.mousemoveCb, o.sampling);
    var mouseInteractionHandler = initMouseInteractionObserver(o.mouseInteractionCb, o.blockClass, o.sampling);
    var scrollHandler = initScrollObserver(o.scrollCb, o.blockClass, o.sampling);
    var viewportResizeHandler = initViewportResizeObserver(o.viewportResizeCb);
    var inputHandler = initInputObserver(o.inputCb, o.blockClass, o.ignoreClass, o.maskInputOptions, o.maskInputFn, o.sampling);
    var mediaInteractionHandler = initMediaInteractionObserver(o.mediaInteractionCb, o.blockClass);
    var styleSheetObserver = initStyleSheetObserver(o.styleSheetRuleCb);
    var canvasMutationObserver = o.recordCanvas
        ? initCanvasMutationObserver(o.canvasMutationCb, o.blockClass)
        : function () { };
    var fontObserver = o.collectFonts ? initFontObserver(o.fontCb) : function () { };
    var logObserver = o.logOptions
        ? initLogObserver(o.logCb, o.logOptions)
        : function () { };
    return function () {
        mutationObserver.disconnect();
        mousemoveHandler();
        mouseInteractionHandler();
        scrollHandler();
        viewportResizeHandler();
        inputHandler();
        mediaInteractionHandler();
        styleSheetObserver();
        canvasMutationObserver();
        fontObserver();
        logObserver();
    };
}

function wrapEvent(e) {
    return __assign(__assign({}, e), { timestamp: Date.now() });
}
var wrappedEmit;
function record(options) {
    if (options === void 0) { options = {}; }
    var emit = options.emit, checkoutEveryNms = options.checkoutEveryNms, checkoutEveryNth = options.checkoutEveryNth, _a = options.blockClass, blockClass = _a === void 0 ? 'rr-block' : _a, _b = options.blockSelector, blockSelector = _b === void 0 ? null : _b, _c = options.ignoreClass, ignoreClass = _c === void 0 ? 'rr-ignore' : _c, _d = options.inlineStylesheet, inlineStylesheet = _d === void 0 ? true : _d, maskAllInputs = options.maskAllInputs, _maskInputOptions = options.maskInputOptions, _slimDOMOptions = options.slimDOMOptions, maskInputFn = options.maskInputFn, hooks = options.hooks, packFn = options.packFn, _e = options.sampling, sampling = _e === void 0 ? {} : _e, mousemoveWait = options.mousemoveWait, _f = options.recordCanvas, recordCanvas = _f === void 0 ? false : _f, _g = options.collectFonts, collectFonts = _g === void 0 ? false : _g, _h = options.recordLog, recordLog = _h === void 0 ? false : _h;
    if (!emit) {
        throw new Error('emit function is required');
    }
    if (mousemoveWait !== undefined && sampling.mousemove === undefined) {
        sampling.mousemove = mousemoveWait;
    }
    var maskInputOptions = maskAllInputs === true
        ? {
            color: true,
            date: true,
            'datetime-local': true,
            email: true,
            month: true,
            number: true,
            range: true,
            search: true,
            tel: true,
            text: true,
            time: true,
            url: true,
            week: true,
            textarea: true,
            select: true,
        }
        : _maskInputOptions !== undefined
            ? _maskInputOptions
            : {};
    var slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === 'all'
        ? {
            script: true,
            comment: true,
            headFavicon: true,
            headWhitespace: true,
            headMetaSocial: true,
            headMetaRobots: true,
            headMetaHttpEquiv: true,
            headMetaVerification: true,
            headMetaAuthorship: _slimDOMOptions === 'all',
            headMetaDescKeywords: _slimDOMOptions === 'all',
        }
        : _slimDOMOptions
            ? _slimDOMOptions
            : {};
    var defaultLogOptions = {
        level: [
            'assert',
            'clear',
            'count',
            'countReset',
            'debug',
            'dir',
            'dirxml',
            'error',
            'group',
            'groupCollapsed',
            'groupEnd',
            'info',
            'log',
            'table',
            'time',
            'timeEnd',
            'timeLog',
            'trace',
            'warn',
        ],
        lengthThreshold: 1000,
        logger: console,
    };
    var logOptions = recordLog
        ? recordLog === true
            ? defaultLogOptions
            : Object.assign({}, defaultLogOptions, recordLog)
        : {};
    polyfill();
    var lastFullSnapshotEvent;
    var incrementalSnapshotCount = 0;
    wrappedEmit = function (e, isCheckout) {
        if (mutationBuffer.isFrozen() &&
            e.type !== EventType.FullSnapshot &&
            !(e.type === EventType.IncrementalSnapshot &&
                e.data.source === IncrementalSource.Mutation)) {
            mutationBuffer.emit();
            mutationBuffer.unfreeze();
        }
        emit((packFn ? packFn(e) : e), isCheckout);
        if (e.type === EventType.FullSnapshot) {
            lastFullSnapshotEvent = e;
            incrementalSnapshotCount = 0;
        }
        else if (e.type === EventType.IncrementalSnapshot) {
            incrementalSnapshotCount++;
            var exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
            var exceedTime = checkoutEveryNms &&
                e.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
            if (exceedCount || exceedTime) {
                takeFullSnapshot(true);
            }
        }
    };
    function takeFullSnapshot(isCheckout) {
        var _a, _b, _c, _d;
        if (isCheckout === void 0) { isCheckout = false; }
        wrappedEmit(wrapEvent({
            type: EventType.Meta,
            data: {
                href: window.location.href,
                width: getWindowWidth(),
                height: getWindowHeight(),
            },
        }), isCheckout);
        var wasFrozen = mutationBuffer.isFrozen();
        mutationBuffer.freeze();
        var _e = __read(snapshot(document, {
            blockClass: blockClass,
            blockSelector: blockSelector,
            inlineStylesheet: inlineStylesheet,
            maskAllInputs: maskInputOptions,
            slimDOM: slimDOMOptions,
            recordCanvas: recordCanvas,
        }), 2), node = _e[0], idNodeMap = _e[1];
        if (!node) {
            return console.warn('Failed to snapshot the document');
        }
        mirror.map = idNodeMap;
        wrappedEmit(wrapEvent({
            type: EventType.FullSnapshot,
            data: {
                node: node,
                initialOffset: {
                    left: window.pageXOffset !== undefined
                        ? window.pageXOffset
                        : (document === null || document === void 0 ? void 0 : document.documentElement.scrollLeft) || ((_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.scrollLeft) || (document === null || document === void 0 ? void 0 : document.body.scrollLeft) ||
                            0,
                    top: window.pageYOffset !== undefined
                        ? window.pageYOffset
                        : (document === null || document === void 0 ? void 0 : document.documentElement.scrollTop) || ((_d = (_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.scrollTop) || (document === null || document === void 0 ? void 0 : document.body.scrollTop) ||
                            0,
                },
            },
        }));
        if (!wasFrozen) {
            mutationBuffer.emit();
            mutationBuffer.unfreeze();
        }
    }
    try {
        var handlers_1 = [];
        handlers_1.push(on('DOMContentLoaded', function () {
            wrappedEmit(wrapEvent({
                type: EventType.DomContentLoaded,
                data: {},
            }));
        }));
        var init_1 = function () {
            takeFullSnapshot();
            handlers_1.push(initObservers({
                mutationCb: function (m) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.Mutation }, m),
                    }));
                },
                mousemoveCb: function (positions, source) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: {
                            source: source,
                            positions: positions,
                        },
                    }));
                },
                mouseInteractionCb: function (d) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.MouseInteraction }, d),
                    }));
                },
                scrollCb: function (p) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.Scroll }, p),
                    }));
                },
                viewportResizeCb: function (d) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.ViewportResize }, d),
                    }));
                },
                inputCb: function (v) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.Input }, v),
                    }));
                },
                mediaInteractionCb: function (p) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.MediaInteraction }, p),
                    }));
                },
                styleSheetRuleCb: function (r) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.StyleSheetRule }, r),
                    }));
                },
                canvasMutationCb: function (p) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.CanvasMutation }, p),
                    }));
                },
                fontCb: function (p) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.Font }, p),
                    }));
                },
                logCb: function (p) {
                    return wrappedEmit(wrapEvent({
                        type: EventType.IncrementalSnapshot,
                        data: __assign({ source: IncrementalSource.Log }, p),
                    }));
                },
                blockClass: blockClass,
                blockSelector: blockSelector,
                ignoreClass: ignoreClass,
                maskInputOptions: maskInputOptions,
                maskInputFn: maskInputFn,
                inlineStylesheet: inlineStylesheet,
                sampling: sampling,
                recordCanvas: recordCanvas,
                collectFonts: collectFonts,
                slimDOMOptions: slimDOMOptions,
                logOptions: logOptions,
            }, hooks));
        };
        if (document.readyState === 'interactive' ||
            document.readyState === 'complete') {
            init_1();
        }
        else {
            handlers_1.push(on('load', function () {
                wrappedEmit(wrapEvent({
                    type: EventType.Load,
                    data: {},
                }));
                init_1();
            }, window));
        }
        return function () {
            handlers_1.forEach(function (h) { return h(); });
        };
    }
    catch (error) {
        console.warn(error);
    }
}
record.addCustomEvent = function (tag, payload) {
    if (!wrappedEmit) {
        throw new Error('please add custom event after start recording');
    }
    wrappedEmit(wrapEvent({
        type: EventType.Custom,
        data: {
            tag: tag,
            payload: payload,
        },
    }));
};
record.freezePage = function () {
    mutationBuffer.freeze();
};

module.exports = record;

},{}],"../src/error/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rrwebRecord = _interopRequireDefault(require("rrweb/lib/record/rrweb-record"));

var _typings = require("../typings");

var _config = require("../config");

var _data = require("../data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ErrorTrace = /*#__PURE__*/function () {
  function ErrorTrace() {
    _classCallCheck(this, ErrorTrace);

    this.recordEvents = [];
  } // rrweb录播形象方法


  _createClass(ErrorTrace, [{
    key: "recordAction",
    value: function recordAction() {
      var _this = this;

      (0, _rrwebRecord.default)({
        emit: function emit(event, isCheckout) {
          // isCheckout 是一个标识，告诉你重新制作了快照
          if (isCheckout) _this.recordEvents = [];

          _this.recordEvents.push(event);
        },
        checkoutEveryNth: 1000,
        checkoutEveryNms: 5 * 60 * 1000 // 每5分钟重新制作快照

      });
    } // 监控全局同步和异步的异常

  }, {
    key: "grobalError",
    value: function grobalError() {
      var _this2 = this;

      _data.W.onerror = function (event, source, lineno, colno, error) {
        console.log('[ ❌全局捕获错误 ]', error); //通过错误信息还原sourcemap源文件地址

        var errorInfo = JSON.stringify({
          info: {
            source: source,
            lineno: lineno,
            colno: colno,
            error: error
          },
          type: _typings.ErrorType[1],
          record: _this2.recordEvents.slice(-50)
        });

        _config.config.report.sendToAnalytics(_typings.AskPriority.IDLE, errorInfo);

        return true;
      };
    } // 监控promise异常

  }, {
    key: "promiseError",
    value: function promiseError() {
      var _this = this;

      _data.W.addEventListener('unhandledrejection', function (e) {
        // 上报primise异常
        e.preventDefault();
        console.log('[ ❌promise捕获错误 ]', e);
        var errorInfo = JSON.stringify({
          type: _typings.ErrorType[2],
          info: {
            type: e.type,
            reason: e.reason
          }
        });

        _config.config.report.sendToAnalytics(_typings.AskPriority.IDLE, errorInfo);

        return true;
      });
    } // 监控资源请求异常

  }, {
    key: "networkError",
    value: function networkError() {
      var _this = this;

      _data.W.addEventListener('error', function (e) {
        if (e.target !== _data.W) {
          console.log('[ ❌资源请求捕获错误 ]', e);
          var errorInfo = JSON.stringify({
            info: {
              type: e.type,
              reason: e.target.outerHTML
            },
            type: _typings.ErrorType[2]
          });

          _config.config.report.sendToAnalytics(_typings.AskPriority.IDLE, errorInfo);
        }
      }, true);
    } // 重写console.error

  }, {
    key: "consoleErrorReflect",
    value: function consoleErrorReflect() {
      var consoleError = _data.W.console.error;

      _data.W.console.error = function () {
        console.log('[ ❌console.error捕获错误 ]'); //config.report.sendToAnalytics(AskPriority.IDLE, errorInfo);

        consoleError.apply(_data.W, Array.prototype.slice.call(arguments));
      };
    } // 初始化异常监听

  }, {
    key: "run",
    value: function run() {
      this.grobalError();
      this.promiseError();
      this.networkError();
      this.consoleErrorReflect();
      this.recordAction();
    }
  }]);

  return ErrorTrace;
}();

exports.default = ErrorTrace;
},{"rrweb/lib/record/rrweb-record":"../node_modules/rrweb/lib/record/rrweb-record.js","../typings":"../src/typings/index.ts","../config":"../src/config/index.ts","../data":"../src/data/index.ts"}],"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YMonitor = void 0;

var _helps = require("./helps");

var _data = require("./data");

var _performance = require("./performance");

var _config = require("./config");

var _error = _interopRequireDefault(require("./error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var YMonitor = /*#__PURE__*/function () {
  function YMonitor(options) {
    _classCallCheck(this, YMonitor);

    this.version = '0.0.1';

    if (!options.upUrl) {
      throw Error("\u76D1\u63A7sdk-".concat(this.version, "\u9700\u63D0\u4F9B\u4E0A\u62A5uri!"));
    }

    Object.assign(_config.config, options);
    _config.config.report = new _data.Report({
      upUrl: options.upUrl
    });
    _config.config.analyticsTracker = _config.config.analyticsTracker || _data.analyticsTracker; // 对外暴露上报接口

    this.report = _config.config.report; // 初始化

    this.initErrorMonitor(_config.config);
    this.initPerformanceMonitor(_config.config);
  } // 初始化异常监控


  _createClass(YMonitor, [{
    key: "initErrorMonitor",
    value: function initErrorMonitor(args) {
      if (!args.isErrorCapture) return;
      new _error.default().run();
    } // 初始化性能监控

  }, {
    key: "initPerformanceMonitor",
    value: function initPerformanceMonitor(args) {
      //如果浏览器不支持性能指标或者未开启则放弃
      if (!(0, _helps.isPerformanceSupported)() || !args.isPerformanceTrace) return; //浏览器支持的起FRP这样的Observer统计性能

      (0, _performance.initPerformanceTraceEntry)();
    }
  }]);

  return YMonitor;
}();

exports.YMonitor = YMonitor;
},{"./helps":"../src/helps/index.ts","./data":"../src/data/index.ts","./performance":"../src/performance/index.ts","./config":"../src/config/index.ts","./error":"../src/error/index.ts"}],"performance/index.js":[function(require,module,exports) {
"use strict";

var _src = require("../../src");

var Test = new _src.YMonitor({
  upUrl: 'http://localhost:3000/api/error'
});
console.log('YMonitor', Test); // 模拟一个长任务

var start = Date.now();

while (Date.now() - start < 1000) {}
},{"../../src":"../src/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59183" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","performance/index.js"], null)
//# sourceMappingURL=/performance.2aa91334.js.map