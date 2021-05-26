<template>
<div>
    <div class="flex justify-center items-center h-96" v-if="loading" >
        <img  class="loading"   src="../assets/loading/loading.gif"/>
    </div>
    <div v-if="!loading">
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
        {{movie.movie.release_date | moment  }}
        </p>
    </RouterLink> 
     Vue le {{movie.date | moment  }}
         </div>
    </div>
</div>
</div>
</template>

<script>
    import {  authenticationService } from "../service/loginService";
    import moment from 'moment'

export default {
  filters: {
  moment: function (date) {
    return moment(date).locale('fr').format('DD MMMM YYYY');
  }
},
    data(){
        return{
            user:{},
            loading: true

        }
    },
created(){
    authenticationService.getUser().then(res =>{
        this.user = res 
        this.loading=false
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

.loading{
width: 15%;
}

</style>