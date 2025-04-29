<template>
  <HeadT title="Contact" />
  <NavBar />
  <div id="main">
    <h2>Contact</h2>
    <p>
      For any inquiries please reach out to me
      <a target="_blank" noopener noreferrer href="mailto:richardopeseitan@proton.me">here</a>
    </p>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'ContactPage',
  components: { HeadT, NavBar },
}
</script>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  padding-left: 100px;
  padding-top: 40px;
  color: white;
}

@media only screen and (min-width: 961px) {
  #main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 200px;
    height: 60vh;
    color: white;
    margin-left: 170px;
  }
}
</style>
