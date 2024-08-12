/**
 * @vitest-environment happy-dom
 */
import { config, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRouterMock, injectRouterMock, VueRouterMock } from 'vue-router-mock';
import { createLogGuard, createProgressGuard } from '.';

describe('createProgressGuard', () => {
  // create one mock instance, pass options
  const _router = createRouterMock({
    spy: { create: (fn) => vi.fn(fn), reset: (spy) => spy.mockClear() },
    useRealNavigation: true,
  });
  beforeEach(() => {
    injectRouterMock(_router);
  });
  config.plugins.VueWrapper.install(VueRouterMock);

  it(`NProgress's start and done methods should be called`, async () => {
    const wrapper = mount({ template: '<div/>' });
    expect(wrapper.router).toBe(_router);
    // createLogGuard(wrapper.router);
    const NProgress = createProgressGuard(wrapper.router);
    const startSpy = vi.spyOn(NProgress, 'start');
    const doneSpy = vi.spyOn(NProgress, 'done');
    expect(NProgress.isRendered()).toBe(false);
    await wrapper.router.push('/');
    expect(startSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(NProgress.isRendered()).toBe(true);
  });
});
