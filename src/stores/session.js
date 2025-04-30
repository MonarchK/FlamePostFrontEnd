import { defineStore } from 'pinia'
import { ref } from 'vue'
import destination from './destination'

export const sessionStore = defineStore('session', () => {
  const login = ref(false)
  const account = ref(null)

  async function fetchSession() {
    await fetch(destination + '/api/user/status', {
      credentials: 'include',
    })
      .then(async (result) => {
        const data = await result.json()
        if (data.login) {
          login.value = true
          account.value = data.account
        } else {
          login.value = false
        }
      })
      .catch(async (err) => {
        console.log(err)
      })
  }

  return { login, account, fetchSession }
})
