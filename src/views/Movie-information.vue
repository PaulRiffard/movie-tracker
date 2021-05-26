<template>
<div>
     <button v-if="mobile && !buttonMovieSeen " v-on:click="movieSeen()" class="bg-red rounded-full w-20 h-20 fixed bottom-20 right-4 flex justify-center items-center" >       
        <img  class="w-16" src="../assets/icons/oeil.svg"/>
     </button>
         <button v-if="mobile && buttonMovieSeen " v-on:click="unMovieSeen()" class="bg-red rounded-full w-20 h-20 fixed bottom-20 right-4 flex justify-center items-center" >       
             X
     </button>
    <div class="flex justify-center items-center h-96"  v-if="loading">
        <img  class="loading"   src="../assets/loading/loading.gif"/>
        
    </div>

  <div v-if="!loading">
  <div v-if="user" >
<Modal 
:filmId="movie._id" v-if="toggleModal" 
v-on:cancelModal="cancelModal()"
/>
<!--  <button v-on:click="resetSeen()" > Reset Seen vue </button> -->
   </div>
<div class="title" >
    <div class="  m-8 w-screen flex justify-evenly" >
     <img :src="movie.poster_path"/>
     <div class="text-title" >
      <div class="font-bold text-xl " >{{movie.title}}</div>
     <div> {{movie.tagline}}</div>
      <div> {{movie.release_date  | moment  }}</div>

      <div class="text-white" >
         
      <div >{{movie.overview}}</div>
      </div>
    </div>
    </div>   
      


       <div class="flex justify-evenly w-screen "   >
           <div v-if="buttonMovieSeen"  class="flex flex-wrap" >
        <div   v-for="s in 5" :key="s" >
        
        <svg v-on:click="rateMovie(s)" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" :fill="s <= user.seen[movieIndex].rate ? 'white': 'black' " stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"
 class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
         </div>
          <div  >
                     <button class="btn"  v-if="!buttonMovieSeen" v-on:click="movieSeen()" > j'ai vus ce film</button>
<button  class="btn"  v-else v-on:click="unSeenMovie()" > Je n'ai pas vus ce film</button>
<button class="btn" v-on:click="showModal()"  > Ajouter ce film a une liste  </button>
        </div>
</div>
 

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
   



</div>

</template>

<script>
import {sMovie} from "../service/movieService"
import {authenticationService} from "../service/loginService"
import Modal from "../components/ListModal"
import moment from "moment"
export default {
    filters: {
  moment: function (date) {
    return moment(date).locale('fr').format('DD MMMM YYYY');
  }
    },

    components:{
        Modal
    },
    

    data(){
        return {
id: this.$route.params.id,
user :null,
mobile: false,
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
movieIndex : 0,
note: 0,
toggleModal:false,
loading: true,
}
    },
    created(){
         if(window.screen.width <= 600){
      this.mobile = true
    }
        
        authenticationService.getUser().then(res  =>{
        this.user= res
        }).catch(err =>{
            console.log(err)
        })
        this.getMovieById(),
        this.getMovieCastById()
               
    },

    methods:{
    async getMovieById(){
      const res = await fetch(
       "https://api.themoviedb.org/3/movie/"+this.id+"?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr"
      );
      this.movie = await res.json();
     if(this.movie.poster_path == null ){
         this.movie.poster_path = "https://i.ibb.co/whjm12r/Group-35.png"
     }else{
        this.movie.poster_path = this.baseImage + this.movie.poster_path
     }
    
       this.movieInDatabade(this.movie.id)
         },

   getMovieCastById(){
       fetch("https://api.themoviedb.org/3/movie/"+this.id +"/credits?api_key=57d264ad6b69204de8c87c1935fdf93b").then(response => response.json())
      .then(response =>{
        
      this.cast = response.cast
      this.cast.forEach(element => {
          if(element.profile_path == null){
            element.profile_path  = "https://i.ibb.co/whjm12r/Group-35.png"
          }else{
          element.profile_path = this.baseImage + element.profile_path      
          }
      });
      this.crew = response.crew
      this.crew.forEach(element => {
          if(element.job == "Director"){
              this.directors.push(element)
          }
          if(element.profile_path == null){
                          element.profile_path  = "https://i.ibb.co/whjm12r/Group-35.png"

          }else{
    element.profile_path = this.baseImage + element.profile_path      

          }
            }); 
      })
        },
        unSeenMovie(){
            this.user.seen.splice(this.movieIndex,1)
            this.movieIndex = 0
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
                this.isUserSeenMovie()
                this.objectSeen.movie=response._id
                this.objectSeen.date = this.actualDate
                this.user.seen.push(this.objectSeen)
                this.movieIndex = this.user.seen.length-1
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
                    console.log(this.movie)
                }
                    this.isUserSeenMovie()               
                })
                    
            },
            
            isUserSeenMovie(){
                setTimeout(() => {
                    if(this.movieBdd){
               this.movieIndex = this.user.seen.findIndex( movie => ( movie.movie._id == this.movie._id))
               console.log(this.movieIndex)
                if(this.movieIndex != -1){
                    this.buttonMovieSeen = true
                }
                }  
                 this.loading = false
                }, 300);
             },

            
            resetSeen(){
            this.user.seen = []
            authenticationService.editSeen(this.user._id, this.user).then(res => {
                        console.log(res)
                    }).catch(err =>{
                        console.log(err)
                    })
            },
            rateMovie(rate){
                this.user.seen[this.movieIndex].rate = rate
                authenticationService.editSeen(this.user._id, this.user).then(res => {
                    console.log(res)
                     authenticationService.getUser().then(res  =>{
                          this.user= res
                            })
                }).catch(err =>{
                    console.log(err)
                }) 
            },

            showModal(){
                this. movieInDatabade(this.id)
                    this.toggleModal = !this.toggleModal
                
            },
            cancelModal(){
                this.toggleModal = false
            }
     

    },

}
</script>

<style>
.title{
    display: flex;
    flex-direction: column;
    align-items: center;
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

.loading{
    width:15%
}

button{
  background-color: #931621;
  margin: 5px;
}
</style>