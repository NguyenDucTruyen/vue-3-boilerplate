import HomeView from './views/HomeView.vue'

// Rule: relative paths only — layout is assigned in src/app/router/index.ts
export const homeRoutes = [
  {
    path: '',
    name: 'index',
    component: HomeView,
  },
]
