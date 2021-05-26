<template>
  <div class="home">
     <div class="flex mb-6" id="nav">
      <div class="w-1/3 border-b border-r border-white pl-8" >
         <router-link to="/">
       <img src="../assets/styles/logo.svg">
       </router-link>
      </div>
      <div class=" w-1/3 border-b p-4 flex" >
        <input class="h-full" placeholder="Entrez le nom d'un film">
        <img class="w-8" src="../assets/icons/loupe.svg"> 
      </div> 
      <div class="border-l border-b w-1/3 " >
     <RouterLink  :to="{
         name:'seen',
        }">  
        Film Vue
     </RouterLink>
      </div>
    </div>
    <div class="flex items-center " v-if="user" >
    <div class="flex flex-col items-center" >
      <div class="text-title font-bold" >
      BONJOUR {{user.username.toUpperCase()}},
      </div>
      <div class="flex flex-col items-center " >
        Bienvenue sur ton tableau de bord,
voici les dernières données 
cinématographiques.

<button v-on:click="toggleGraph" class=" mt-4 text-purple border-purple border w-60 h-10"  >
  Voir mon récapitulatif
  </button>
  <LineChart v-if="showGraph" />
  <Doughnut v-if="showGraph" />
      </div>
    </div>
    <Stat/>
    </div>
    <Login v-on:logOut="logOut()" v-on:logIn="logIn($event)" />
    <Search v-on:activeUpcoming="activeUpcoming($event)" />
    <Upcomingmovies v-if="toggleUp" />
  </div>
</template>

<script>
import Search from "../components/searchMovie";
import Upcomingmovies from "../components/upcomingmovies.vue";
import Login from "../components/login";
import Stat from "../components/stat"
import LineChart from "../components/graphs/LineChart";
import Doughnut from "../components/graphs/Doughnut"
import {authenticationService} from "../service/loginService"

export default {
  name: "Home",
  components: {
    Search,
    Upcomingmovies,
    Login,
    Stat,
    Doughnut,
    LineChart,
  },
  data(){
    return{
      toggleUp : true,
      user: null,
      showGraph:false
    }
  },
  created(){
    authenticationService.getUser().then(res => {
      this.user = res
    })


  },
  methods:{
    activeUpcoming(toggle){
      this.toggleUp = toggle
    },

    toggleGraph(){
      this.showGraph = !this.showGraph
    },
    logOut(){
      this.user = null
      this.showGraph = false
    },
    logIn(user){
      this.user = user
    }
  
  }
};
</script>
