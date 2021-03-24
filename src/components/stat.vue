<template>
<div>

Stat vue marche

{{nbMovie}}
{{runTimeTotalMin}}
{{runTimeTotalHours}}
{{runTimeTotalDay}}

<div v-for="movie in threeLast" :key="movie.movie_id"  >
    {{movie.movie.title}}
</div>


 <ChartDoughnut/> 
<!--  <LineChart /> -->

</div>
</template>

<script>
    import {  authenticationService } from "../service/loginService";
    import ChartDoughnut from "./graphs/Doughnut"
    /* import LineChart from "./graphs/LineChart" */
export default {
 
     components:{
        ChartDoughnut,
     /*    LineChart */
    }, 
    data(){
        return{
            user:{},
            nbMovie:0,
            runTimeTotalMin:0,
            runTimeTotalHours:0,
            runTimeTotalDay:0,
            threeLast:[],
            test :new Date

            


        }
    },
    created(){
        authenticationService.getUser().then(res =>{
            this.user = res
             this.nbMovie = this.user.seen.length
             this.calculRunTime()
             this.getThreeLastMovie()
             this.getDateVue()
        })
           
    },

    methods:{
        calculRunTime(){
            this.user.seen.forEach(movie => {
               this.runTimeTotalMin += movie.movie.runtime
               this.runTimeTotalHours = (this.runTimeTotalMin/60).toFixed(2)
               this.runTimeTotalDay = (this.runTimeTotalHours/24).toFixed(2)
            });
        },

        getThreeLastMovie(){
           this.threeLast = this.user.seen.slice(this.user.seen.length-3)
        },

        getDateVue(){
          this.test =  Date.parse(this.user.seen[0].date)
        
        },
    }
}
</script>

<style>

</style>