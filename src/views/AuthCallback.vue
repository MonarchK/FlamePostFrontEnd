<template>
  <div></div>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AuthCallback',
  setup() {
    const router = useRouter()

    onMounted(() => {
      const token = new URLSearchParams(window.location.search).get(token)
      if (token) {
        localStorage.setItem('jwt', token)
        router.push('/')
      }
    })
  },
}
</script>
