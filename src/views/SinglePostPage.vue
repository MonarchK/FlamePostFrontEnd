<template>
  <HeadT title="Post" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
    </div>
    <h2>Post</h2>
    <div class="posts" v-if="post">
      <p class="text" v-text="post.text"></p>
      <img class="med" :src="post.media" v-if="post.media" />
      <div class="info">
        <p>
          Posted by
          <span
            class="user"
            @click="$router.push(`/profile/${post.user.username}`)"
            v-text="post.user.username"
          ></span>
        </p>
        <p class="space-left" v-text="'on ' + new Date(post.datePosted).toDateString()"></p>
      </div>
      <hr />
      <h2>Replies</h2>
      <div class="posts" v-for="(reply, index) in allReplies" :key="index">
        <p class="text" v-text="reply.text"></p>
        <img class="med2" :src="reply.media" v-if="reply.media" />
        <div class="info">
          <p>
            Posted by
            <span
              class="user"
              @click="$router.push(`/profile/${reply.user.username}`)"
              v-text="reply.user.username"
            ></span>
          </p>
          <p class="space-left" v-text="'on ' + new Date(reply.datePosted).toDateString()"></p>
        </div>
        <hr class="push" />
      </div>
    </div>
    <form @submit.prevent="handleSubmit" v-if="session.login" enctype="multipart/form-data">
      <textarea
        name="text"
        v-model="comment.text"
        class="reply"
        placeholder="Type your reply..."
      ></textarea>
      <input type="file" name="media" class="hide" id="h-img" @change="handleImageUpload" />
      <input type="submit" class="hide" id="h-sbmt" />
      <div class="send">
        <label for="h-img" class="clip">
          <i class="fas fa-image"></i>
        </label>
        <label for="h-sbmt" class="clip">
          <i class="fas fa-paper-plane"></i>
        </label>
      </div>
    </form>
    <button
      class="fas fa-plus new"
      @click="$router.push(`/post/update/${post._id}`)"
      v-if="valid && session.login"
    ></button>
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
  name: 'SinglePostPage',
  components: { HeadT, NavBar },
  setup() {
    const router = useRouter()
    const session = sessionStore()
    const close = closeStore()
    const failure = ref(null)
    const valid = ref(null)
    const post = ref(null)
    const comment = reactive({
      text: '',
      media: null,
    })
    const allReplies = ref(null)
    async function fetchData() {
      fetch(destination + '/api' + router.currentRoute.value.path, {
        headers: {
          Authorization: 'Beacon ' + localStorage.getItem('jwt'),
        },
        credentials: 'include',
      })
        .then(async (result) => {
          const data = await result.json()
          post.value = data.post
          allReplies.value = data.allReplies
          valid.value = data.isAuthor
        })
        .catch((error) => {
          console.log(error)
        })
    }

    fetchData()

    function handleImageUpload(e) {
      comment.media = e.target.files[0]
    }

    async function handleSubmit() {
      const formData = new FormData()
      formData.append('text', comment.text)
      formData.append('media', comment.media)
      const result = await fetch(destination + '/api' + router.currentRoute.value.path + '/reply', {
        method: 'POST',
        headers: {
          Authorization: 'Beacon ' + localStorage.getItem('jwt'),
        },
        credentials: 'include',
        body: formData,
      })
      const data = await result.json()
      if (data.failure) {
        failure.value = data.failure
        close.warning(failure)
      }
      if (data.success) {
        comment.text = ''
        comment.media = null
        fetchData()
      }
    }

    onMounted(async () => {
      await session.fetchSession()
    })

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { post, comment, session, failure, valid, allReplies, handleSubmit, handleImageUpload }
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

.med {
  height: 520px;
  width: 320px;
}

.med2 {
  height: 320px;
  width: 320px;
}

.user:hover {
  cursor: pointer;
  color: gold;
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

.reply {
  width: 60vw;
}

.hide {
  display: none;
}

.clip {
  cursor: pointer;
  font-size: 18px;
  color: #007bff;
}

form {
  position: fixed;
  bottom: 0;
  display: flex;
}

.send {
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 961px) {
  .med {
    height: 720px;
    width: 520px;
  }

  .med2 {
    height: 520px;
    width: 520px;
  }
}
</style>
