<template>
  <HeadT title="FlamePost" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
      <!--don't forget-->
    </div>
    <h2>General Feed</h2>
    <div>
      <div class="posts" v-for="(allPosts, index) in post.store" :key="index">
        <p class="text" @click="verify(allPosts._id)" v-text="allPosts.text"></p>
        <div v-if="allPosts.media">
          <img class="med" :src="allPosts.media" />
        </div>
        <div class="info">
          <p class="user">
            Posted by<span
              class="text"
              @click="$router.push(`profile/${allPosts.user.username}`)"
              v-text="allPosts.user.username"
            ></span>
          </p>
          <p class="space-left" v-text="'on ' + new Date(allPosts.datePosted).toDateString()"></p>
        </div>
        <hr />
      </div>
    </div>
    <div v-if="session.login">
      <button class="fas fa-plus new" @click="$router.push('/api/post/new')"></button>
    </div>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'
import { closeStore } from '@/stores/close'
import destination from '@/stores/destination'
import { sessionStore } from '@/stores/session'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  components: { HeadT, NavBar },
  setup() {
    const failure = ref(null)
    const session = sessionStore()
    const close = closeStore()
    const router = useRouter()
    const post = reactive({
      store: null,
    })

    fetch(destination + '/api', {
      credentials: 'include',
    }).then(async (result) => {
      const data = await result.json()
      post.store = data.allPosts
    })

    function verify(loc) {
      if (session.login) {
        router.push('post/' + loc)
      } else {
        failure.value = 'Please Log In'
        close.warning(failure)
      }
    }

    onMounted(async () => {
      await session.fetchSession()
    })

    onBeforeUnmount(() => {
      close.closeWarning()
    })

    return { session, post, failure, verify }
  },
}
</script>
<style scoped>
#main {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
}

.text {
  padding: 5px;
  text-decoration: none;
}

.text a,
p a {
  color: white;
  text-decoration: none;
}

.text:hover {
  cursor: pointer;
  color: gold;
}

.med {
  height: 520px;
  width: 320px;
}

.info {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

hr {
  color: black;
  width: 60vw;
}

.push {
  margin-bottom: 80px;
}

.new {
  border-radius: 50%;
  background-color: blue;
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
}

.new:hover {
  background-color: purple;
}

@media only screen and (min-width: 961px) {
  .med {
    height: 720px;
    width: 520px;
  }
}
</style>
