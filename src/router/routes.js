const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'job/:id',
        name: 'internal-job',
        component: () => import('pages/InternalJob.vue'),
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'jobs/:q',
        name: 'search-jobs',
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'jobs/:id/:title/:internal?',
        name: 'selected-job',
        props: true,
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'jobs-in/:region',
        name: 'jobs-in',
        props: true,
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'jobs-by/:company',
        name: 'jobs-by',
        props: true,
        component: () => import('pages/Jobs.vue'),
      },
      {
        path: 'jobs-near-by/:q/:location/:coordinates/:distance',
        name: 'jobs-near-by',
        props: true,
        component: () => import('pages/Jobs.vue'),
      },
      {
        // path: ':lang(de|en|fr)/:filename',
        path: 'info/:lang/:filename',
        name: 'info',
        component: () => import('pages/Info.vue'),
      },
      {
        path: 'news/:lang/:date/:title',
        name: 'news',
        props: true,
        component: () => import('pages/news/News.vue'),
      },
      {
        path: 'test/job-ad',
        name: 'job-ad',
        props: true,
        component: () => import('pages/JobAd.vue'),
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
