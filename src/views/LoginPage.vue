<template>
  <HeadT title="Login" />
  <NavBar />
  <div id="main">
    <div v-if="failure">
      <p class="alert alert-danger" v-text="failure"></p>
    </div>
    <h2>Log into your account</h2>
    <form @submit.prevent="handleSubmit">
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
      <button>Login</button>
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
      username: '',
      password: '',
    })

    const router = useRouter()
    const close = closeStore()

    async function handleSubmit() {
      await fetch(destination + '/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify(details),
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

    return { details, failure, handleSubmit }
  },
}
</script>
<style scoped>
@import '/src/assets/css/form.css';
</style>
