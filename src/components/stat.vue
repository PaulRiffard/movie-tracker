<template>
<div>

Stat vue marche

{{nbMovie}}
{{runTimeTotalMin}}
{{runTimeTotalHours}}
{{runTimeTotalDay}}
{{rateAverage.toFixed(2)}}

<div v-for="movie in threeLast" :key="movie.movie_id"  >
    {{movie.movie.title}}
</div>


<div class="flex justify-around ">
 <ChartDoughnut/> 
<LineChart />
</div>

</div>
</template>

<script>
    import {  authenticationService } from "../service/loginService";
    import ChartDoughnut from "./graphs/Doughnut"
    import LineChart from "./graphs/LineChart" 
export default {
 
     components:{
        ChartDoughnut,
        LineChart 
    }, 
    data(){
        return{
            user:{},
            nbMovie:0,
            runTimeTotalMin:0,
            runTimeTotalHours:0,
            runTimeMinHours:0,
            runTimeHours:0,
            runTimeTotalDay:0,
            threeLast:[],
            test :new Date,
            totalRate:0,
            rateAverage:0,
        
        }
    },
    created(){
        authenticationService.getUser().then(res =>{
            this.user = res
             this.nbMovie = this.user.seen.length
             this.calculRunTime()
             this.getThreeLastMovie()
             this.getDateVue()
             this.calculateRateAverage()
             this.getThreeMostRated()
        })
           
    },

    methods:{
        calculRunTime(){
            this.user.seen.forEach(movie => {
               this.runTimeTotalMin += movie.movie.runtime
               this.runTimeHours = this.runTimeTotalMin/60
               this.runTimeMinHours = this.runTimeTotalMin%60 
               this.runTimeTotalHours = this.runTimeHours.toFixed()+","+this.runTimeMinHours
               this.runTimeTotalDay = (this.runTimeHours/24).toFixed(2)
            });
        },

        getThreeLastMovie(){
           this.threeLast = this.user.seen.slice(this.user.seen.length-3)
        },

        getDateVue(){
          this.test =  Date.parse(this.user.seen[0].date)
        },
        calculateRateAverage(){
            let rateArray = this.user.seen.filter(x => x.rate != undefined )
                rateArray.forEach( r =>{
                    
                    this.totalRate += r.rate
                    console.log(this.totalRate)
                })
                this.rateAverage = this.totalRate/rateArray.length
        },
        getThreeMostRated(){
            let movieMostratedArray = this.user.seen.filter(x => x.rate != undefined )
            movieMostratedArray.sort((a, b) => (a.rate > b.rate) ? -1 : 1)
            console.log(movieMostratedArray,"0000000000")


            },
    }
}
</script>

<style>

</style>