<template>
  <HeadT title="Profile" />
  <NavBar />
  <div id="main" v-if="posts.store">
    <h4 v-text="posts.store[0].user.name"></h4>
    <p v-text="new Date(posts.store[0].user.dateCreated).toDateString()"></p>
    <hr />
    <h2>Personal Feed</h2>
    <div class="posts" v-for="(allPosts, index) in posts.store" :key="index">
      <p class="text" @click="$router.push(`/post/${allPosts._id}`)" v-text="allPosts.text"></p>
      <img class="med" :src="allPosts.media" v-if="allPosts.media" />
      <div class="info">
        <p class="user" v-text="'Posted by ' + allPosts.user.username"></p>
        <p class="space-left" v-text="'on ' + new Date(allPosts.datePosted).toDateString()"></p>
      </div>
      <hr />
    </div>
    <button
      class="fas fa-plus new"
      v-if="session.login && session.account == posts.store[0].user.username"
      @click="$router.push('/api/post/new')"
    ></button>
  </div>
  <div id="main" v-if="posts.user">
    <p>nothing here yet</p>
    <button
      class="fas fa-plus new"
      v-if="session.login && session.account == posts.user.username"
      @click="$router.push('/api/post/new')"
    ></button>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'
import destination from '@/stores/destination'
import { sessionStore } from '@/stores/session'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProfilePage',
  components: { HeadT, NavBar },
  setup() {
    const router = useRouter()
    const session = sessionStore()
    const posts = reactive({
      store: null,
      user: null,
    })
    fetch(destination + '/api' + router.currentRoute.value.path, {
      headers: {
        Authorization: 'Beacon ' + localStorage.getItem('jwt'),
      },
    }).then(async (result) => {
      const data = await result.json()
      if (data.allPosts) {
        posts.store = data.allPosts
      }
      if (data.user) {
        posts.user = data.user
      }
    })

    onMounted(async () => {
      await session.fetchSession()
    })

    return { posts, session }
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

.space-left {
  padding-left: 5px;
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
