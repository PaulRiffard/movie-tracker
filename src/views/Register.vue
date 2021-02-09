<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="firstname">Prénom</label>
      <div>
        <input id="firstname" type="text" v-model="firstname" required />
      </div>
      <label for="name">Nom</label>
      <div>
        <input id="name" type="name" v-model="name" required />
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
      <button type="submit" @click="handleSubmit">Register</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["nextUrl"],
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      name:"",
      firstname:"",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let url = "https://movie-tracker-back.herokuapp.com/user/signup";

        axios
          .post(url, {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("currentUser", response.data.token);
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