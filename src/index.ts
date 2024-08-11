import { START_LOCATION, type Router } from 'vue-router';
import NProgress from 'nprogress';

/**
 * ```<link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/nprogress/nprogress.css">```
 */
export function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    NProgress.start();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}

export function createLogGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.debug(
      '🚗 ====================',
      `[beforeEach]`,
      `[${from === START_LOCATION ? 'START_LOCATION' : String(from.name || '')}]`,
      `-> [${String(to.name)}].`,
      '===================='
    );
    next();
  });

  router.afterEach(async (to, from, failure) => {
    console.debug(
      '🚗 ====================',
      ` [afterEach]`,
      `[${from === START_LOCATION ? 'START_LOCATION' : String(from.name || '')}]`,
      `-> [${String(to.name)}].`,
      '==================== 🚗🚗🚗',
      `failure: `,
      failure
    );
  });
}
