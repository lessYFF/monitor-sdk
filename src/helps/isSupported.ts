import { WPer, WNav, W, D } from '../data/constants';

/**
 * True if the browser supports the Navigation Timing API,
 * User Timing API and the PerformanceObserver Interface.
 * In Safari, the User Timing API (performance.mark()) is not available,
 * so the DevTools timeline will not be annotated with marks.
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/mark
 * Support: developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
 * Support: developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
 */
export const isPerformanceSupported = (): boolean => {
  return WPer && !!WPer.getEntriesByType && !!WPer.now && !!WPer.mark && !!W.PerformanceObserver;
};

export const isEstimateSupported = (): boolean => {
  return WNav && WNav.storage && typeof WNav.storage.estimate === 'function';
}

export const isVisibleChangeSupported = (): boolean => {
  return typeof D.hidden !== "undefined";
}
