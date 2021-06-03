<template>
  <div class="bg-black"   id="app">
       <div v-if="!mobile" class="flex mb-6" id="nav">
      <div class="w-1/3 border-b border-r border-white pl-8 flex flex-wrap items-center justify-around " >
    
         <router-link  to="/">
       <img  src="./assets/styles/logo.svg">
       </router-link>

       <Login v-on:logOut="logOut()" v-if="user"/>
      </div>
      <div class=" w-1/3 border-b p-4 flex" >
        <input class="h-full" placeholder="Entrez le nom d'un film" @keyup="searchMovie()" v-model="querySearch" >
        <img class="w-8" src="./assets/icons/loupe.svg"> 
      </div> 
      <div class="border-l border-b w-1/3 flex justify-center items-center  " >
     <RouterLink v-if="user"  :to="{
         name:'seen',
        }">  
        Film Vue
     </RouterLink>

  <Login v-on:logIn="logIn($event)" v-if="!user" />

      </div>
    </div>

    <router-view v-if="querySearch == '' " />
       <Search v-if="querySearch != ''" :moviesDeskstop="movies" v-on:filmChoose="moovieChoose()"  />
    <div class="bg-lightred  w-screen fixed bottom-0 flex justify-around h-16 items-center"  v-if="mobile" >
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
      <div v-if="user" >
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
import Search from "./components/searchMovie";
import Login from "./components/login";
import {authenticationService} from "./service/loginService"

export default {
  components:{
    Search,
    Login
  },
  data(){
    return{
      user:null,
      mobile:false,
      querySearch:"",
      movies:[],
      baseImage: "http://image.tmdb.org/t/p/w200",
    }
  },
  created(){
    if(window.screen.width <= 600){
      this.mobile = true
    }
      authenticationService.getUser().then(res => {
      this.user = res
    })
  },
  methods:{
    searchMovie() {
      if(this.inputValue != ''){
      fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=57d264ad6b69204de8c87c1935fdf93b&query=" +
          this.querySearch +"&language=fr&region=fr"
      )
        .then((res) => res.json())
        .then((data) => {
          this.movies = []
          data.results.map(item =>{
            if (this.movies.length < 20) this.movies.push(item)
           }) 
           this.movies.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1)
           this.movies.map(movie =>{ if(movie.poster_path == null){
        movie.poster_path = "https://i.ibb.co/whjm12r/Group-35.png"
      }else{
        movie.poster_path = this.baseImage + movie.poster_path
      }
      })
        });
      }else{
         this.movies = []       
      }
    },

    logIn(user){
       this.user = user
    },

    logOut(){
      this.user = null
    },
    moovieChoose(){
      this.querySearch = ""
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
