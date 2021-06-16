<template>
  <div>
    <div>
    <div class="  m-8 flex justify-evenly items-start " >
     <img class="border " :src="person.profile_path"/>
     <div class="text-title" >
      <div class="font-bold text-xl " >{{person.name}}</div>
      <div> {{person.birthday | moment }}</div>

      
      <div class=" mt-6 max-w-3xl text-white " >{{person.biography}}</div>
    </div>
 </div>
     

    </div>

<div class="flex flex-wrap justify-around" >
 <div  v-for="actor in personCast.cast" :key="actor.id">
 <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: actor.id
         }
        }"> 
<div class="flex flex-col items-center" >
  <div class="text-title" >
  <div>{{actor.title}}</div>
  <div> {{actor.release_date | moment }} </div>
  </div>
  <img :src="actor.poster_path">
  <div> {{actor.character}}</div>
</div>
 </RouterLink>
 </div>
 </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
  moment: function (date) {
    return moment(date).locale('fr').format('DD MMMM YYYY');
  }
  },

  data(){
    return{
      id: this.$route.params.id,
      personCast : {},
      person:{}
    }

   
  },

  methods:{
    getPersonDetail(){
         fetch("https://api.themoviedb.org/3/person/"+this.id +"?api_key="+process.env.VUE_APP_API+"&language=fr").then(response => response.json())
         .then(res =>{
           this.person = res
           if(this.person.profile_path == null){
             this.person.profile_path  = "https://i.ibb.co/whjm12r/Group-35.png"
           }else{
             this.person.profile_path = "http://image.tmdb.org/t/p/w200"+this.person.profile_path
           }
         })
         

    },

    getPersonInformation(){
   fetch("https://api.themoviedb.org/3/person/"+this.id +"/movie_credits?api_key="+process.env.VUE_APP_API+"&language=fr").then(response => response.json())
      .then(response =>{
        this.personCast = response
        this.personCast.cast.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
       this.personCast.cast = this.personCast.cast.slice(0,5)
       console.log(this.personCast.cast)
       this.personCast.cast.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1)
       this.personCast.cast.map(x => {
         if(x.poster_path == null ){
              x.poster_path = "https://i.ibb.co/whjm12r/Group-35.png"
           }else{
             x.poster_path = "http://image.tmdb.org/t/p/w200"+x.poster_path
         }
         console.log(x.poster_path)

       })

      })
}



  },
 created(){
    this.getPersonInformation()
    this.getPersonDetail()
    }


}
</script>

<style>

</style>