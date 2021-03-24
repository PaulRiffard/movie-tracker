<template>
  <div v-if="user" >
<button v-if="!buttonMovieSeen" v-on:click="movieSeen()" > j'ai vus ce film</button>
<button v-if="buttonMovieSeen" v-on:click="unSeenMovie()" > Je n'ai pas vus ce film</button>

 <button v-on:click="resetSeen()" > Reset Seen vue </button>
<div class="title" >
      {{movie.title}}
      {{movie.tagline}}
       {{movie.release_date}}
       <img :src="movie.poster_path"/>
       {{movie.overview}}
</div>
     

  <div class="castRow">    

<div class="cast" v-for="(director, i) in directors" :key="i" >  
     
     <RouterLink  :to="{
         name:'personInformation',
         params:{
            id: director.id
         }
        }">  
     {{director.name}}
      <img :src="director.profile_path"/> {{director.job}} 
      </RouterLink> 
     
     </div> 
 <div class="cast" v-for="i in 4 " :key="i" >
       <RouterLink  :to="{
         name:'personInformation',
         params:{
            id: cast[i-1].id,
         }
        }">  
         {{cast[i-1].name}} 
         <img :src="cast[i-1].profile_path"/> 
         {{cast[i-1].character}} 
       </RouterLink>
</div> 

</div>
     
  </div>

</template>

<script>
import {sMovie} from "../service/movieService"
import {authenticationService} from "../service/loginService"

export default {
    data(){
        return {
id: this.$route.params.id,
user :{},
movie :{},
crew :[],
cast:[],
directors:[],
moviePersons: {},
baseImage: "http://image.tmdb.org/t/p/w200",
arrayMovieSeen:[],
movieBdd : false,
actualDate : new Date,
objectSeen:{
    movie:"",
    date:""
},
buttonMovieSeen : false,
movieIndex : 0
}
    },

    methods:{
        async getMovieById(){
      const res = await fetch(
       "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr"
      );
      this.movie = await res.json();
     
      this.movie.poster_path = this.baseImage + this.movie.poster_path
      this.movieInDatabade(this.movie.id)
        },

   getMovieCastById(){
       fetch("https://api.themoviedb.org/3/movie/"+this.id +"/credits?api_key=57d264ad6b69204de8c87c1935fdf93b").then(response => response.json())
      .then(response =>{
        
      this.cast = response.cast
      this.cast.forEach(element => {
          element.profile_path = this.baseImage + element.profile_path      
      });
      this.crew = response.crew
      this.crew.forEach(element => {
          if(element.job == "Director"){
              this.directors.push(element)
          }
    element.profile_path = this.baseImage + element.profile_path      
            }); 
      })
        },
        unSeenMovie(){
            this.movieIndex = this.user.seen.indexOf(this.movie._id)
            this.user.seen.splice(this.movieIndex, 1)
            this.buttonMovieSeen = false
            authenticationService.editSeen(this.user._id, this.user).then(res => {
                console.log(res)
            }).catch(err =>{
                console.log(err)
            })

        },
        movieSeen(){
            this.buttonMovieSeen = true
            if(!this.movieBdd){
            this.movie.director = this.directors;
            this.movie.cast = this.cast
            this.movie.mdb = this.movie.id
        sMovie.movieSeen(this.movie).then(response => {
                this.movieInDatabade()
                this.objectSeen.movie=response._id
                this.objectSeen.date = this.actualDate
            this.user.seen.push(this.objectSeen)
                authenticationService.editSeen(this.user._id, this.user).then(res => {
                    console.log(res)
                }).catch(err =>{
                    console.log(err)
                }) 
            
        })
            }else{
                this.objectSeen.movie= this.movie._id
                this.objectSeen.date= this.actualDate
                this.user.seen.push(this.objectSeen)
                authenticationService.editSeen(this.user._id, this.user).then(res => {
                    console.log(res)
                }).catch(err =>{
                    console.log(err)
                }) 
            }
        },
            movieInDatabade(id){
                sMovie.getMovieByMdbId(id).then(res =>{
                if(res.length > 0 ){
                    this.movie = res[0]
                    this.movieBdd = true
                }
                this.isUserSeenMovie()
                })
                    
            },
            
            isUserSeenMovie(){
                if(this.movieBdd){
                this.user.seen.forEach(element => {
                    if(element.movie._id == this.movie._id){
                        this.buttonMovieSeen = true
                    } 
                });
                }
            },
            resetSeen(){
            this.user.seen = []
            authenticationService.editSeen(this.user._id, this.user).then(res => {
                        console.log(res)
                    }).catch(err =>{
                        console.log(err)
                    })
            }
     

    },


    created(){
        this.getMovieById(),
        this.getMovieCastById()
        authenticationService.getUser().then(res  =>{
        this.user= res
        this.movieInDatabade()
       })
    },


}
</script>

<style>
.title{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title img{
    max-width: 20%;
}

.castRow{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.cast{
    display: flex;
    flex-direction: column;
    margin: 20px;
    align-items: center;
    justify-content: center;
}

.cast img{
    width: 10em;
}
</style>