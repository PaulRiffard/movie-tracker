<template>
  <div class="home">
    <div class="flex items-center flex-wrap  m-8" v-if="user" >
    <div class="flex flex-col items-center w-2/6 " >
      <div class="text-title font-bold" >
      BONJOUR {{user.username.toUpperCase()}},
      </div>
      <div class="flex flex-col items-center " >
        Bienvenue sur ton tableau de bord,
voici les dernières données 
cinématographiques.

<button v-on:click="toggleGraph" class=" mt-4 secondary_btn"  >
  Voir mon récapitulatif
  </button>
 
      </div>
    </div>
    
    <Stat/>
    </div>
     <div class="flex flex-wrap justify-around m-5 ">
  <LineChart class="w-1/2" v-if="showGraph" />
  <Doughnut class="w-1/2" v-if="showGraph" />
  </div>
    <Login v-if="mobile" v-on:logOut="logOut()" v-on:logIn="logIn($event)" />
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
      showGraph:false,
      mobile:false,
    }
  },
  created(){
      if(window.screen.width <= 600){
      this.mobile = true
    }
    authenticationService.getUser().then(res => {
      this.user = res
    })

    this.$eventBus.$on('logIn', user => this.logIn(user))
    this.$eventBus.$on('logOut', user => this.logOut(user))
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
