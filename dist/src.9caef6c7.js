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
})({"../src/typings/index.ts":[function(require,module,exports) {
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
  isPerformanceTiming: true,
  isResoureTiming: true,
  isErrorCapture: true,
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

var _data = require("../data");

var _config = require("../config");

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
        if (!!_data.W.fetch) {
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
        if (!!_data.WNav.sendBeacon) {
          _data.WNav.sendBeacon(upUrl, data);
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
        console.log('pushTask callback exec!!');

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
},{"../typings":"../src/typings/index.ts","../data":"../src/data/index.ts","../config":"../src/config/index.ts","../helps":"../src/helps/index.ts"}],"../src/data/log.ts":[function(require,module,exports) {
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
},{}],"../src/data/constants.ts":[function(require,module,exports) {
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
},{"./log":"../src/data/log.ts","./report":"../src/data/report.ts","./metrics":"../src/data/metrics.ts","./constants":"../src/data/constants.ts","./analyticsTacker":"../src/data/analyticsTacker.ts"}],"../src/helps/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToKB = exports.formatByTwo = exports.pushTask = void 0;

var _data = require("../data");

/**
 * pushTask - 将任务推入主线程空闲队列
 * @param cb - 执行的回调方法
 */
var pushTask = function pushTask(cb) {
  if ('requestIdleCallback' in _data.W) {
    _data.W.requestIdleCallback(cb, {
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
},{"../data":"../src/data/index.ts"}],"../src/helps/isSupported.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVisibleChangeSupported = exports.isEstimateSupported = exports.isPerformanceSupported = void 0;

var _data = require("../data");

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
  return _data.WPer && !!_data.WPer.getEntriesByType && !!_data.WPer.now && !!_data.WPer.mark && !!_data.W.PerformanceObserver;
};

exports.isPerformanceSupported = isPerformanceSupported;

var isEstimateSupported = function isEstimateSupported() {
  return _data.WNav && _data.WNav.storage && typeof _data.WNav.storage.estimate === 'function';
};

exports.isEstimateSupported = isEstimateSupported;

var isVisibleChangeSupported = function isVisibleChangeSupported() {
  return typeof _data.D.hidden !== "undefined";
};

exports.isVisibleChangeSupported = isVisibleChangeSupported;
},{"../data":"../src/data/index.ts"}],"../src/helps/vitalsScore.ts":[function(require,module,exports) {
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

var _data = require("../data");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getNetworkInfo = function getNetworkInfo() {
  if ('connection' in _data.WNav) {
    var connection = _data.WNav.connection;
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
},{"../data":"../src/data/index.ts"}],"../src/helps/isLowEnd.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLowEndExperience = exports.isLowEndDevice = void 0;

var _data = require("../data");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 是否低等级设备
var isLowEndDevice = function isLowEndDevice() {
  // If number of logical processors available to run threads <= 4
  if ((0, _data.getCpu)() && (0, _data.getCpu)() <= 4) {
    return true;
  } // If the approximate amount of RAM client device has <= 4


  if ((0, _data.getMem)() && (0, _data.getMem)() <= 4) {
    return true;
  }

  return false;
}; // 是否低体验设备


exports.isLowEndDevice = isLowEndDevice;

var isLowEndExperience = function isLowEndExperience() {
  if (!_data.WNav.connection || _typeof(_data.WNav.connection) !== 'object') return true;
  var effectiveType = _data.WNav.connection.effectiveType;
  if (['lte', 'slow-2g', '2g', '3g'].includes(effectiveType) || isLowEndDevice) return true;
  return false;
};

exports.isLowEndExperience = isLowEndExperience;
},{"../data":"../src/data/index.ts"}],"../src/helps/getNavigatorInfo.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNavgatorInfo = void 0;

var _data = require("../data");

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
  if (!_data.WNav) return {};
  return {
    appName: _data.WNav.appName,
    appVersion: _data.WNav.appVersion,
    deviceMemory: (0, _data.getMem)() || 0,
    hardwareConcurrency: (0, _data.getCpu)() || 0,
    isLowEndDevice: (0, _isLowEnd.isLowEndDevice)(),
    isLowEndExperience: (0, _isLowEnd.isLowEndExperience)(),
    serviceWorkerStatus: 'serviceWorker' in _data.WNav ? _data.WNav.serviceWorker.controller ? 'controlled' : 'supported' : 'unSupported'
  };
};

exports.getNavgatorInfo = getNavgatorInfo;
},{"../data":"../src/data/index.ts","./isLowEnd":"../src/helps/isLowEnd.ts"}],"../src/helps/onVisibilityChange.ts":[function(require,module,exports) {
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
},{"./utils":"../src/helps/utils.ts","./isSupported":"../src/helps/isSupported.ts","./vitalsScore":"../src/helps/vitalsScore.ts","./getNetworkInfo":"../src/helps/getNetworkInfo.ts","./getNavigatorInfo":"../src/helps/getNavigatorInfo.ts","./onVisibilityChange":"../src/helps/onVisibilityChange.ts"}],"../src/performance/observe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performanceObserver = void 0;

var _data = require("../data");

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
        _data.C.warn('poConnect warn', msg);
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
},{"../data":"../src/data/index.ts"}],"../src/performance/paint.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPaint = void 0;

var _data = require("../data");

// 初始化首次绘制
var initPaint = function initPaint(performanceEntries) {
  performanceEntries.forEach(function (entry) {
    if (entry.name === 'first-paint') {
      (0, _data.logMetric)('fp', entry.startTime);
    } else if (entry.name === 'first-contentful-paint') {
      _data.metrics.fcp = entry.startTime;
      (0, _data.logMetric)('fcp', _data.metrics.fcp);
    }
  });
};

exports.initPaint = initPaint;
},{"../data":"../src/data/index.ts"}],"../src/performance/navigationTiming.ts":[function(require,module,exports) {
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
},{"../data":"../src/data/index.ts","../helps":"../src/helps/index.ts"}],"../src/performance/performanceEntry.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectPerformanceObserveHidden = exports.initPerformanceTraceEntry = void 0;

var _helps = require("../helps");

var _data = require("../data");

var _observe = require("./observe");

var _paint = require("./paint");

var _navigationTiming = require("./navigationTiming");

var _storageEstimate = require("./storageEstimate");

var _this = void 0;

// 根据参数监听相关指标
var initPerformanceObserver = function initPerformanceObserver() {
  console.log('⏰ 性能收集开始', Math.random());

  _observe.performanceObserver.poConnect('paint', _paint.initPaint); // performanceObserver.poConnect('first-input-delay', initFirstInputDelay);
  // performanceObserver.poConnect('largest-contentful-paint', initLargestContentfulPaint);
  // performanceObserver.poConnect('cumulative-layout-shift', initCumulativeLayoutShift);
  // if (config.isResoureTiming) {
  //     performanceObserver.poConnect('resource', initResource);
  // }
  // if (config.isPerformanceTiming) {
  //     performanceObserver.poConnect('element', initElement);
  // }

}; // 根据相关检测指标解除监听


var disconnectPerformanceObserve = function disconnectPerformanceObserve(args) {
  var list = Array.isArray(args) ? args : [args];
  list.forEach(function (metric) {
    _observe.performanceObserver.poDisconnect(metric);

    (0, _data.logMetric)(metric, _data.metrics[metric]);
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
  disconnectPerformanceObserve(['paint']);
};

exports.disconnectPerformanceObserveHidden = disconnectPerformanceObserveHidden;
},{"../helps":"../src/helps/index.ts","../data":"../src/data/index.ts","./observe":"../src/performance/observe.ts","./paint":"../src/performance/paint.ts","./navigationTiming":"../src/performance/navigationTiming.ts","./storageEstimate":"../src/performance/storageEstimate.ts"}],"../src/performance/index.ts":[function(require,module,exports) {
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
},{"./observe":"../src/performance/observe.ts","./performanceEntry":"../src/performance/performanceEntry.ts"}],"../src/error/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typings = require("../typings");

var _config = require("../config");

var _data = require("../data");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ErrorTrace = /*#__PURE__*/function () {
  function ErrorTrace() {
    _classCallCheck(this, ErrorTrace);
  }

  _createClass(ErrorTrace, [{
    key: "grobalError",
    value: // 监控全局同步和异步的异常
    function grobalError() {
      _data.W.onerror = function (event, source, lineno, colno, error) {
        console.log('[ ❌全局捕获错误 ]', error); //通过错误信息还原sourcemap源文件地址

        var errorInfo = JSON.stringify({
          source: source,
          lineno: lineno,
          colno: colno,
          error: error,
          type: _typings.ErrorType[1]
        });

        _config.config.report.sendToAnalytics(_typings.AskPriority.IDLE, errorInfo);

        return true;
      };
    } // 监控promise异常

  }, {
    key: "promiseError",
    value: function promiseError() {
      _data.W.addEventListener('unhandledrejection', function (e) {
        console.log('[ ❌promise捕获错误 ]', e);
        e.preventDefault(); // 上报primise异常

        var errorInfo = JSON.stringify({
          e: e,
          type: _typings.ErrorType[2]
        });

        _config.config.report.sendToAnalytics(_typings.AskPriority.IDLE, errorInfo);

        return true;
      });
    } // 监控资源请求异常

  }, {
    key: "networkError",
    value: function networkError() {
      _data.W.addEventListener('error', function (e) {
        if (e.target !== _data.W) {
          console.log('[ ❌资源请求捕获错误 ]', e.target);
          var errorInfo = JSON.stringify({
            e: e,
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
    }
  }]);

  return ErrorTrace;
}();

exports.default = ErrorTrace;
},{"../typings":"../src/typings/index.ts","../config":"../src/config/index.ts","../data":"../src/data/index.ts"}],"../src/index.ts":[function(require,module,exports) {
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
      if (!(0, _helps.isPerformanceSupported)() || !args.isPerformanceTiming) return; //浏览器支持的起FRP这样的Observer统计性能

      (0, _performance.initPerformanceTraceEntry)();
    }
  }]);

  return YMonitor;
}();

exports.YMonitor = YMonitor;
},{"./helps":"../src/helps/index.ts","./data":"../src/data/index.ts","./performance":"../src/performance/index.ts","./config":"../src/config/index.ts","./error":"../src/error/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54709" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/index.ts"], null)
//# sourceMappingURL=/src.9caef6c7.js.map