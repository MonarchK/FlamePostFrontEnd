<template>
  <HeadT title="404" />
  <NavBar />
  <div id="main">
    <p>404 Page Not Found</p>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'NotFound',
  components: { HeadT, NavBar },
}
</script>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 200px;
  height: 60vh;
  color: white;
  font-size: 60px;
}
</style>
