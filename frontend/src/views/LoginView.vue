<template>
  <div class="login">
    <div class="panel">
      <h1>Notes App</h1>
      <div class="input-container">
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <p :class="errorMsg">Wrong username or password. Please try again</p>
        <div class="button-container">
          <button @click="login()">Login</button>
          <button>Signup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '@/router'
const users = require('../../data/users.json')
export default {
  name: 'LoginView',
  data: function() {
    return {
      errorMsg: 'ok',
      username: '',
      password: '',
    }
  },
  
  methods: {
    login() {
      // Default login data (this would be a fetch to the database, server side, not client side)
      for (const user of users) {
        if (user.username === this.username) {
          if (user.password === this.password) {
            this.errorMsg = 'ok'
            sessionStorage.setItem('username', this.username)
            router.push('/')
            return
          }
        }
        this.errorMsg = 'error'
      }
    }
  },

  mounted() {
    if (sessionStorage.getItem('username')) {
      router.push('/')
    }
  }
}
</script>

<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }

  .panel {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    padding: 2rem;
    height: 80vh;
    max-width: 500px;
    width: 80%;
    border-radius: 12px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;;
    background: #fff;
  } 

  .panel h1 {
    margin-top: 2rem;
    text-align: center;
  }

  .input-container {
    margin: auto;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  input {
    margin: auto;
    width: 100%;
    max-width: 300px;
    border: 1px solid rgb(182, 182, 182);
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    width: 7rem;
    height: 3rem;
    text-align: center;
  }

  p {
    color: red;
    text-align: center;
  }

  .ok {
    opacity: 0%;
  }

  .error {
    opacity: 100%;
  }

  .button-container {
    margin: auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 1rem;
  }

  @media only screen and (max-width: 400px) {
    .panel {
      width: 90%;
    }

    .button-container {
      flex-flow: column nowrap;
    }
  }
</style>