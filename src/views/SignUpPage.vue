<template>
  <HeadT title="SignUp" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
    </div>
    <h2>Create a new account</h2>
    <form @submit.prevent="handleSubmit">
      <label for="name"
        >Name:
        <input
          id="name"
          name="name"
          v-model="details.name"
          placeholder="Enter a Name..."
          type="text"
        />
      </label>
      <label for="username"
        >Username:
        <input
          id="username"
          name="username"
          v-model="details.username"
          placeholder="Enter a Username..."
          type="text"
        />
      </label>
      <label for="password"
        >Password:
        <input
          id="password"
          name="password"
          v-model="details.password"
          placeholder="Enter a Password..."
          type="password"
        />
      </label>
      <button>Create</button>
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
  name: 'SignUpPage',
  components: { HeadT, NavBar },
  setup() {
    const failure = ref(false)
    const details = reactive({
      name: '',
      username: '',
      password: '',
    })

    const router = useRouter()
    const close = closeStore()

    async function handleSubmit() {
      await fetch(destination + '/api/user/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      }).then(async (result) => {
        const data = await result.json()
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        } else {
          router.replace({ path: '/auth/login' })
        }
      })
    }

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { details, failure, handleSubmit }
  },
}
</script>
<style scoped>
@import '/src/assets/css/form.css';
</style>
