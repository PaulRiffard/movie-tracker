<template>
  <div>
 <div v-for="actor in person.cast" :key="actor">
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
        console.log(this.person)
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