<template>
  <HeadT title="Add Post" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
    </div>
    <h2>Create a New Post</h2>
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
  </div>
</template>
<script>
import HeadT from '@/components/Head.vue'
import NavBar from '@/components/NavBar.vue'
import { closeStore } from '@/stores/close'
import destination from '@/stores/destination'
import { onBeforeUnmount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AddPostPage',
  components: { HeadT, NavBar },
  setup() {
    const failure = ref(null)
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
      await fetch(destination + '/api/post/store', {
        method: 'POST',
        headers: {
          Authorization: 'Beacon ' + localStorage.getItem('jwt'),
        },
        credentials: 'include',
        body: formData,
      }).then(async (result) => {
        const data = await result.json()
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        } else {
          router.replace({ path: '/' })
        }
      })
    }

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { post, failure, handleSubmit, handleImageUpload }
  },
}
</script>
<style scoped>
@import '/src/assets/css/form.css';
</style>
