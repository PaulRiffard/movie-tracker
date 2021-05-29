<template>
  <div>
    <div>
    <div class="  m-8 w-screen flex justify-evenly" >
     <img :src="person.profile_path"/>
     <div class="text-title" >
      <div class="font-bold text-xl " >{{person.name}}</div>
      <div> {{person.birthday}}</div>

      <div class="text-white" >
         
      <div >{{person.biography}}</div>
      </div>
    </div>
 </div>
     

    </div>


 <div  v-for="actor in personCast.cast" :key="actor.id">
 <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: actor.id
         }
        }"> 

 {{actor.character}} / {{actor.title}} 
 </RouterLink>
 </div>
 </div>
</template>

<script>
export default {

  data(){
    return{
      id: this.$route.params.id,
      personCast : {},
      person:{}
    }

   
  },

  methods:{
    getPersonDetail(){
         fetch("https://api.themoviedb.org/3/person/"+this.id +"?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr").then(response => response.json())
         .then(res =>{
           this.person = res
           console.log(this.person,"De Ouf")
           if(this.person.profile_path == null){
             this.person.profile_path  = "https://i.ibb.co/whjm12r/Group-35.png"
           }else{
             this.person.profile_path = "http://image.tmdb.org/t/p/w200"+this.person.profile_path
           }
         })
         

    },

    getPersonInformation(){
   fetch("https://api.themoviedb.org/3/person/"+this.id +"/movie_credits?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr").then(response => response.json())
      .then(response =>{
        this.personCast = response
        this.personCast.cast.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1)
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