<route>
    {
        meta: {
            title: '404 Not Found',
            layout: 'error'
        }
    }
</route>

<template>
  <div class="error-page flex flex-col items-center justify-center gap-4 mt-10">
    <h1
      class="text-4xl font-bold text-center"
    >
      Page not found.
    </h1>
    <p>
      The page you are looking for does not exist.
    </p>
    <router-link to="/">
      <Button>
        Go Back Home
      </Button>
    </router-link>
  </div>
</template>
