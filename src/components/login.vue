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
      <button  class="secondary_btn" type="submit">Login</button>
          <router-link to="/register">Créer un nouveau compte </router-link>
          <div v-if="error"> Mot de passe Incorrect</div>
</div>
    </form>
    <div v-if="isLogin"  >
    <button class="secondary_btn" v-on:click="logOut()">logout</button>
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
      token:"",
      error:null
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
 this.user = res
   })
    }
        },

        onSubmit () {
            authenticationService.login(this.email , this.password)
                .then(
                  user => {
                    console.log("TEST DE OUF ")
                  this.decode = VueJwtDecode.decode(user.token)
                 this.user  = this.decode.user
                  this.isLogin = true
                  this.$emit('logIn',this.user)
                  },
                    error => {
                        this.error = error;
                        console.log(this.error)
                        this.loading = false;
                    }
                );
        },

    logOut(){
      authenticationService.logout()
      this.isLogin = false
      this.user = {}
      this.$emit('logOut')
    }

    }
}
</script>

<style lang="css">

</style>