<template>
  <div class="bg-black"   id="app">
    <div class="flex justify-between " id="nav">
      <div>
         <router-link to="/">
       <img src="./assets/styles/logo.svg">
       </router-link>
      </div>
    <div class="flex align-center " >
      <router-link to="/seen">Movie Seen</router-link>
      <router-link to="/">Home</router-link> 
      <router-link to="/lists">Listes</router-link> 
    </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600&display=swap');

#app {
  margin: 0;
  padding:0;
  font-family: Spartan ,Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white

}
#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin:5px;
  align-content: center;
}

#nav a.router-link-exact-active {
  color: #735CDD;
}


</style>
