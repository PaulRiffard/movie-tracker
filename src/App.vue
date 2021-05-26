<template>
  <div class="bg-black"   id="app">
    <router-view />
    <div class="bg-red  w-screen fixed bottom-0 flex justify-around h-16 items-center"  v-if="mobile" >
      <div>
         <RouterLink  :to="{
         name:'home',
        }">  
         <img class="w-8" src="./assets/icons/home.svg"/> 
         </RouterLink>
      </div>
      <div>
      <RouterLink  :to="{
         name:'search',
        }">  
         <img class="w-8" src="./assets/icons/loupe-white.svg"/> 
         </RouterLink>
      </div>
      <div>
      <RouterLink  :to="{
         name:'seen',
        }"> 
       
         <img class="w-8" src="./assets/icons/oeil.svg"/> 
         </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      mobile:false
    }
  },
  created(){
    if(window.screen.width <= 600){
      this.mobile = true
    }
  }
  
}
</script>
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
