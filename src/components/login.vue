<template>
  <div>
    <form @submit.prevent="login">
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
      <button v-if="!isLogin" type="submit">Login</button>
    </form>
    <button v-if="isLogin" v-on:click="logOut()">logout</button>

    <button @click="redirectToRegister()">Create a new account</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isLogin: false,
    };
  },
  created() {
    if (localStorage.getItem("jwt") != null) {
      this.isLogin = true;
    }
  },

  methods: {
    redirectToRegister() {
      this.$router.push({ path: "/register" });
    },

    login(e) {
      e.preventDefault();
      axios
        .post("https://movie-tracker-back.herokuapp.com/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("jwt", response.data.token);

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            this.isLogin = true;
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            }
          }
        })
        .catch(function (error) {
          console.error(error.response);
        });
    },
    logOut() {
      localStorage.removeItem("jwt");
      this.isLogin = false;
    },
  },
};
</script>

<style lang="css">
</style>