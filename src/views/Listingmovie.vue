<template>
<div>
    <div class="movieWrap" >
    <div class="movie" v-for="movie in user.seen" :key="movie.movie.id" >
            <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.movie.mdb
         }
        }" >
    <div>
      {{movie.movie.title}}
      </div>
        <img :src="movie.movie.poster_path"/>
        <p>
        {{movie.movie.director[0].name}}
        {{movie.movie.release_date}}
        </p>
    </RouterLink> 
     Vue le {{movie.date}}
         </div>
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

.movieWrap{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

}

.movie{
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: 5px;    
}

</style>