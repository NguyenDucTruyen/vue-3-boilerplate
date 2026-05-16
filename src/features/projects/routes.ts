import ProjectView from './views/ProjectView.vue'

// Rule: relative paths only — layout is assigned in src/app/router/index.ts
export const projectRoutes = [
  {
    path: 'project',
    name: 'project',
    component: ProjectView,
  },
]
