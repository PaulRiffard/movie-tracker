<template>
  <div>
    <form @submit.prevent="onSubmit">

<div v-if="!isLogin">

      <input
        v-model="email"
        type="email"
        id="inputEmail"
        placeholder="Adresse Email"
        required
        autofocus
      />
      <input
        v-model="password"
        type="password"
        id="inputPassword"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Login</button>
          <router-link to="/register">Créer un nouveau compte </router-link>
</div>
    </form>
    <div v-if="isLogin"  >
    <div> Bienvenue {{user.username}}</div>
    <button v-on:click="logOut()">logout</button>
    </div>


  </div>
</template>

<script>

import {authenticationService} from "../service/loginService";
import VueJwtDecode from 'vue-jwt-decode'


export default {
  name: "Login",
  components:{
  },
  data() {
    return {
      email: "",
      password: "",
      isLogin: false,
      currentUser: authenticationService.currentUserValue,
      user:{},
      decode: {},
      token:""
    };
  },
  created() {
     this.getUser() 
    
  },

   methods: {

        getUser(){
if (localStorage.getItem("currentUser") != null) {
      this.isLogin = true;
  authenticationService.getUser().then(res =>{
 console.log('USER DE OUF', res )
 this.user = res
   })
 
   
    }
        },

        onSubmit () {
            authenticationService.login(this.email , this.password)
                .then(
                  user => {
                  this.decode = VueJwtDecode.decode(user.token)
                 this.user  = this.decode.user
                  this.isLogin = true
                  },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        },

    logOut(){
      authenticationService.logout()
      this.isLogin = false
      this.user = {}
    }

    }
}
</script>

<style lang="css">
</style>