/**
 * @vitest-environment happy-dom
 */
/**
 * https://test-utils.vuejs.org/guide/advanced/vue-router#Using-a-Real-Router
 */
import { flushPromises, mount } from '@vue/test-utils';
import { expect, test, vi } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createLogGuard } from './createLogGuard';

const App = {
  template: `
    <router-link to="/posts">Go to posts</router-link>
    <router-view />
  `,
};

const Posts = {
  template: `
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.name }}
      </li>
    </ul>
  `,
  data() {
    return {
      posts: [{ id: 1, name: 'Testing Vue Router' }],
    };
  },
};

const routes = [
  {
    path: '/',
    component: {
      template: 'Welcome to the blogging app',
    },
  },
  {
    path: '/posts',
    component: Posts,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

test('createLogGuard', async () => {
  createLogGuard(router);
  const debugSpy = vi.spyOn(global.window.console, 'debug');

  router.push('/');
  await router.isReady();

  const wrapper = mount(App, { global: { plugins: [router] } });

  expect(wrapper.html()).toContain('Welcome to the blogging app');
  expect(debugSpy).toHaveBeenCalledTimes(2);

  await wrapper.find('a').trigger('click');
  await flushPromises();
  expect(wrapper.html()).toContain('Testing Vue Router');
  expect(debugSpy).toHaveBeenCalledTimes(4);
});
