<template>
  <div></div>
</template>
<script>
import { useHead } from '@vueuse/head'

export default {
  name: 'HeadT',
  props: {
    title: String,
  },
  setup(props) {
    useHead({
      title: () => props.title,
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' }, // Forces HTTPS
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { 'http-equiv': 'Cache-Control', content: 'no-store' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
          crossorigin: 'anonymous',
          integrity: 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          crossorigin: 'anonymous',
          defer: true, // Important for proper loading
        },
      ],
    })
  },
}
</script>
