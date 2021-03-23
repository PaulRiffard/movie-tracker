<template>
  <div>
 <div v-for="actor in person.cast" :key="actor.id">
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
      person : {}
    }

   
  },

  methods:{

    getPersonInformation(){
   fetch("https://api.themoviedb.org/3/person/"+this.id +"/movie_credits?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr").then(response => response.json())
      .then(response =>{
        this.person = response
        this.person.cast.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1)
      })
}



  },
 created(){
    this.getPersonInformation()
    }


}
</script>

<style>

</style>