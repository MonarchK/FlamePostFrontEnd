<template>
  <HeadT title="Edit Post" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
    </div>
    <h2>Edit Post</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <textarea
        id="text"
        name="text"
        v-model="post.text"
        placeholder="Enter your thoughts..."
      ></textarea>
      <label for="media"
        >Media:
        <input id="media" name="media" type="file" @change="handleImageUpload" />
      </label>
      <button>Add</button>
    </form>
    <button @click="handleDelete" class="fas fa-trash gone"></button>
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
  name: 'UpdatePostPage',
  components: { HeadT, NavBar },
  setup() {
    const failure = ref(null)
    const session = sessionStore()
    const close = closeStore()
    const router = useRouter()
    const post = new reactive({
      text: '',
      media: null,
    })

    function handleImageUpload(e) {
      post.media = e.target.files[0]
    }

    async function handleSubmit() {
      const formData = new FormData()
      formData.append('text', post.text)
      formData.append('media', post.media)
      await fetch(destination + '/api' + router.currentRoute.value.path, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }).then(async (result) => {
        const data = await result.json()
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        } else {
          router.replace({ path: '/post/' + router.currentRoute.value.path.split('/')[3] })
        }
      })
    }

    async function handleDelete() {
      await fetch(
        destination + '/api/post/delete/' + router.currentRoute.value.path.split('/')[3],
        {
          method: 'DELETE',
          credentials: 'include',
        },
      ).then(async (result) => {
        const data = await result.json()
        if (data.success) {
          router.replace({ path: '/' })
        }
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        }
      })
    }

    onMounted(async () => {
      await session.fetchSession()
    })

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { post, failure, session, handleSubmit, handleImageUpload, handleDelete }
  },
}
</script>
<style scoped>
@import '/src/assets/css/form.css';
</style>
