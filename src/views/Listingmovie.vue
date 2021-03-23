<template>
<div>
    <div v-for="movie in user.seen" :key="movie.movie.id" >
            <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.movie.mdb
         }
        }" >
      {{movie.movie.title}}
        <img :src="movie.movie.poster_path"/>
        {{movie.movie.director[0].name}}
        {{movie.movie.release_date}}
    </RouterLink> 
     Vue le {{movie.date}}
         </div>

<Stat/>

</div>
</template>

<script>
    import {  authenticationService } from "../service/loginService";
    import Stat from "../components/stat.vue";

export default {
  components: { Stat },
    data(){
        return{
            user:{}

        }
    },
created(){
    authenticationService.getUser().then(res =>{
        this.user = res 
    })
}

}
</script>

<style>

</style>