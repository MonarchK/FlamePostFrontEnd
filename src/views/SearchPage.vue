<template>
  <HeadT title="Search" />
  <NavBar />
  <div id="main">
    <p v-if="failure" v-text="failure" class="alert alert-danger"></p>
    <h2>Search</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="search"
        id="search"
        name="search"
        placeholder="Search FlamePost..."
        type="text"
      />
      <select v-model="filter" name="filter">
        <option value="User">User</option>
        <option value="Username">Username</option>
        <option value="Post Content">Post Content</option>
      </select>
      <button>search</button>
    </form>
    <div v-if="searchResult">
      <div v-if="filterResult == 'users'">
        <h3 class="dir">Users</h3>
        <hr />
        <div v-for="(outcome, index) in searchResult.search" :key="index">
          <div>
            <RouterLink :to="`/profile/${outcome.username}`">
              <h4 v-text="outcome.name"></h4>
              <h5 v-text="outcome.username"></h5>
              <p v-text="new Date(outcome.dateCreated).toDateString()"></p>
            </RouterLink>
            <hr />
          </div>
        </div>
      </div>
      <div v-if="filterResult == 'posts'">
        <h3 class="dir">Posts</h3>
        <hr />
        <div v-for="(outcome, index) in searchResult.search" :key="index">
          <div class="posts">
            <p class="text" @click="$router.push(`post/${outcome._id}`)" v-text="outcome.text"></p>
            <img v-if="outcome.media" class="med" :src="outcome.media" />
            <div class="info">
              <p
                class="user"
                @click="$router.push(`/profile/${outcome.user.username}`)"
                v-text="'Posted by ' + outcome.user.username"
              ></p>
              <p
                class="space-left"
                v-text="'on ' + new Date(outcome.datePosted).toDateString()"
              ></p>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'
import { closeStore } from '@/stores/close'
import destination from '@/stores/destination'
import { onBeforeUnmount, reactive, ref } from 'vue'

export default {
  name: 'SearchPage',
  components: { HeadT, NavBar },
  setup() {
    const failure = ref(null)
    const close = closeStore()
    const filter = ref(null)
    const search = ref(null)
    const filterResult = ref(null)
    const searchResult = reactive({
      search: null,
    })

    async function handleSubmit() {
      await fetch(destination + '/api/search', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search.value, filter: filter.value }),
      }).then(async (result) => {
        const data = await result.json()
        if (data.search) {
          searchResult.search = data.search
          filterResult.value = data.filter
        }
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        }
      })
    }

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { failure, filter, search, searchResult, filterResult, handleSubmit }
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

.user:hover,
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
  padding-bottom: 80px;
}

#main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  justify-content: flex-start;
}

.dir {
  margin-top: 50px;
}

div a {
  color: white;
  text-decoration: none;
}

@media only screen and (min-width: 961px) {
  .med {
    height: 720px;
    width: 520px;
  }
}
</style>
