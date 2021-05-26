<template>
  <div>
    <h4>Register</h4>
    <form>
       <label for="username">Username</label>
      <div>
        <input id="username" type="text" v-model="username" required />
      </div>
      <label for="email">E-Mail Address</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>
      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input
          id="password-confirm"
          type="password"
          v-model="password_confirmation"
          required
        />
      </div>
      <button v-if="username && password && password_confirmation && email" type="submit" @click="handleSubmit">Register</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import VueJwtDecode from 'vue-jwt-decode'

export default {
  props: ["nextUrl"],
  data() {
    return {
      username:"",
      email: "",
      password: "",
      password_confirmation: "",
      decode:{}
    };
  },
  created(){
    this.getUser() && this.$router.push({name:'home'})
  },
  methods: {
    getUser(){
      if (localStorage.getItem("currentUser") != null) {
        const token = localStorage.getItem("currentUser")
        
        return VueJwtDecode.decode(token.slice(0,-1).substring(1)).user.userToken
      }

      return null
    },
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
/*         let url = "http://localhost:5500/user/signup";
 */
    const url = 'https://movie-tracker-back.herokuapp.com/user/signup'
        axios
          .post(url, {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response)
            this.$router.push({name:'home'})
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.password = "";
        this.passwordConfirm = "";

        return alert("Passwords do not match");
      }
    },
  },
};
</script>