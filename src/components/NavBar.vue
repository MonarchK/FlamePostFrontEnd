<template>
  <nav>
    <div v-if="view === 'mobile'">
      <h1><RouterLink to="/">FlamePost</RouterLink></h1>
      <div class="link-toggle">
        &#8801;
        <ul class="link-list">
          <li class="link"><RouterLink to="/">Home</RouterLink></li>
          <li class="link"><RouterLink to="/about">About</RouterLink></li>
          <li class="link"><RouterLink to="/contact">Contact</RouterLink></li>
          <span class="c-links" v-if="session.login">
            <li class="link"><RouterLink to="/search">Search</RouterLink></li>
            <li class="link"><RouterLink :to="`/profile/${session.account}`">Feed</RouterLink></li>
            <li class="link logout" @click="handleLogout" v-text="'Logout'"></li>
          </span>
          <span class="c-links" v-else>
            <li class="link"><RouterLink to="/user/new">Sign Up</RouterLink></li>
            <li class="link"><RouterLink to="/auth/login">Login</RouterLink></li>
          </span>
        </ul>
      </div>
    </div>
    <div v-else>
      <h1><RouterLink to="/">FlamePost</RouterLink></h1>
      <ul class="link-list">
        <li class="link"><RouterLink to="/">Home</RouterLink></li>
        <li class="link"><RouterLink to="/about">About</RouterLink></li>
        <li class="link"><RouterLink to="/contact">Contact</RouterLink></li>
        <span class="c-links" v-if="session.login">
          <li class="link"><RouterLink to="/search">Search</RouterLink></li>
          <li class="link"><RouterLink :to="`/profile/${session.account}`">Feed</RouterLink></li>
          <li class="link logout" @click="handleLogout" v-text="'Logout'"></li>
        </span>
        <span class="c-links" v-else>
          <li class="link"><RouterLink to="/user/new">Sign Up</RouterLink></li>
          <li class="link"><RouterLink to="/auth/login">Login</RouterLink></li>
        </span>
      </ul>
    </div>
  </nav>
</template>
<script>
import destination from '@/stores/destination'
import { sessionStore } from '@/stores/session'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  components: { RouterLink },
  setup() {
    const session = sessionStore()
    const router = useRouter()
    const width = ref(window.innerWidth)
    function responsive() {
      width.value = window.innerWidth
    }

    async function handleLogout() {
      await fetch(destination + '/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      }).then(async (results) => {
        const data = await results.json()
        if (data.success) {
          if (router.currentRoute.value.path == '/') {
            await router.replace('/random')
            await router.replace('/')
          } else {
            router.replace({ path: '/' })
          }
        }
      })
    }

    onMounted(async () => {
      window.addEventListener('resize', responsive)
      await session.fetchSession()
    })

    onBeforeMount(() => {
      window.removeEventListener('resize', responsive)
    })

    const view = computed(() => {
      if (width.value < 961) {
        return 'mobile'
      } else {
        return 'desktop'
      }
    })

    return { session, view, handleLogout }
  },
}
</script>
<style scoped>
nav div {
  display: flex;
  justify-content: space-between;
  padding: 25px;
}

h1 a:hover,
.link a:hover,
.logout:hover {
  color: gold;
}

h1 {
  padding-top: 3px;
}

h1 a,
.link a,
.logout {
  text-decoration: none;
  color: white;
}

.link-toggle {
  position: relative;
  padding-top: 5px;
}

.link-list {
  display: none;
}

.link-toggle:hover .link-list {
  list-style: none;
  color: white;
  text-decoration: none;
  background-color: black;
  height: 100vh;
  width: 80vw;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: -25px;
  top: 0px;
  z-index: 2;
}

.link {
  padding-top: 25px;
}

.logout {
  cursor: pointer;
}

@media only screen and (min-width: 961px) {
  .link-list {
    display: flex;
    list-style: none;
    text-decoration: none;
  }

  .link {
    margin-right: 30px;
    padding-top: 15px;
  }

  .c-links {
    display: flex;
    flex-direction: row;
  }
}
</style>
