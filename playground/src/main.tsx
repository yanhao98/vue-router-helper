import { createApp, defineComponent } from 'vue';
import { createRouter, createWebHistory, RouterView, useRoute } from 'vue-router';
import { createLogGuard, createProgressGuard } from '@yanhao98/vue-router-helper';

const App = defineComponent({
  setup() {
    return () => (
      <div>
        <h1>Vue 3 Playground</h1>
        <RouterView />
      </div>
    );
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: defineComponent({
        setup() {
          const route = useRoute();
          return () => <div>full path: {route.fullPath}</div>;
        },
      }),
    },
  ],
});
Object.assign(window, { router });

/* router.beforeEach(async (to, from, next) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}); */

createProgressGuard(router);
createLogGuard(router);

router.beforeEach(async (to, from) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

createApp(App).use(router).mount('#app');
