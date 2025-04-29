<template>
  <HeadT title="About" />
  <NavBar />
  <div id="main">
    <div class="head"><h2>About</h2></div>
    <div class="para">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'AboutPage',
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
