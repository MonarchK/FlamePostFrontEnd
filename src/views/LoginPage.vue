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
    <div class="oauth">
      <p>Or Login with:</p>
      <div class="oauth-list">
        <div class="present"></div>
        <span class="fa-stack fa-lg" @click="gitLogin">
          <i class="fas fa-circle fa-stack-2x"></i>
          <i class="fab fa-github fa-stack-1x fa-inverse"></i>
        </span>
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
        },
        body: JSON.stringify(details),
      }).then(async (result) => {
        const data = await result.json()
        if (data.failure) {
          failure.value = data.failure
          close.warning(failure)
        }
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          router.replace({ path: '/' })
        }
      })
    }

    function gitLogin() {
      const popup = window.open(destination + '/api/auth/github', '_blank')
      if (popup) {
        window.addEventListener('message', (event) => {
          if (event.origin != destination + '/api/auth/github/callback') {
            failure.value = 'Failed'
            close.warning(failure)
          }
          if (event.data.token) {
            localStorage.setItem('jwt', event.data.token)
            router.replace('/')
          } else {
            failure.value = 'Failed'
            close.warning(failure)
          }
        })
      } else {
        window.location.href = destination + '/api/auth/github'
      }

      //window.location.href = destination + '/api/auth/github'
    }

    onBeforeUnmount(() => {
      clearTimeout(close.closeWarning())
    })

    return { details, failure, handleSubmit, destination, gitLogin }
  },
}
</script>
<style scoped>
@import '/src/assets/css/form.css';
.oauth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.oauth-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

div .present {
  cursor: pointer;
}
</style>
