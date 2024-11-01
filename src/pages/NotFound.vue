<route>
    {
        meta: {
            title: '404 Not Found',
            layout: 'error'
        }
    }
</route>

<template>
  <div class="error-page">
    <h1>Page not found.</h1>
    <p>
      This page may be private. If someone gave you this link, you may need to be a board or
      Workspace member to access it.
    </p>
    <router-link to="/">
      <Button>
        Back to Home
      </Button>
    </router-link>
  </div>
</template>

  <style>
  .error-page {
    text-align: center;
    margin-top: 100px;
  }
  </style>
