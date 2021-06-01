<template>
<div class="containerStat flex w-4/6"    >
     <div class="flex flex-col " >
     <div class=" p-2 flex bg-title m-3 items-center justify-evenly  " >
         <img class="p-2 bg-white bg-opacity-25 rounded" src="../assets/icons/popcorn.svg">
         <div class="flex flex-col items-start" >
        <div class="font-bold"> {{movieThisMonth.length}}</div>
         <div> film vus en {{actualDate | moment }} </div>
         </div>
     </div>
     <div class="runTimeTotal flex m-3 p-2 items-center justify-evenly " >
           <img class="p-2 bg-white bg-opacity-25 rounded " src="../assets/icons/hour.svg">
           <div class="flex flex-col items-start">
           <div class="font-bold">
         {{runTimeTotalHours}}
           </div>
           <div>
         Heures passés au cinéma 
           </div>
           </div>
 </div> 
 </div>   

<div class="m-3 bg-purple flex flex-wrap "  >
 3 dernier films
<div class="m-2 flex justify-center flex-col" v-for="movie in threeLast" :key="movie.movie_id"  >
       <RouterLink  :to="{
         name:'movieInformation',
         params:{
            id: movie.movie.mdb
         }
       }"
         >
    {{movie.movie.title}}
       </RouterLink>
</div>
 </div>
</div>
</template>

<script>
    import {  authenticationService } from "../service/loginService";
    import moment from "moment"
export default {

        filters: {
  moment: function (date) {
    return moment(date).locale('fr').format('MMMM');
  }
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
            movieThisMonth:[],
            actualDate : new Date,
            actualMonth:"",
        
        }
    },
    created(){
        authenticationService.getUser().then(res =>{
            this.user = res
             this.nbMovie = this.user.seen.length
             this.actualMonth = this.actualDate.getMonth()
              console.log(this.actualMonth)
             this.calculRunTime()
             this.getThreeLastMovie()
             this.getDateVue()
             this.calculateRateAverage()
             this.getThreeMostRated()
             this.getMovieByMonth()

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
           console.log(this.threeLast)
        },

        getDateVue(){
          this.test =  Date.parse(this.user.seen[0].date)
        },
        calculateRateAverage(){
            let rateArray = this.user.seen.filter(x => x.rate != undefined )
                rateArray.forEach( r =>{
                    this.totalRate += r.rate
                })
                this.rateAverage = this.totalRate/rateArray.length
        },
        getThreeMostRated(){
            let movieMostratedArray = this.user.seen.filter(x => x.rate != undefined )
            movieMostratedArray.sort((a, b) => (a.rate > b.rate) ? -1 : 1)
            },
        getMovieByMonth(){
             this.user.seen.map(x =>{
          x.date = new Date(x.date)
      })
      console.log(this.actualMonth)
    this.movieThisMonth = this.user.seen.filter(x => x.date.getMonth() == this.actualMonth  )
    console.log(this.movieThisMonth)

    
        }    
    }
}
</script>

<style>

.nbFilm{
    background-color: #FF3A3A;
}

.runTimeTotal{
    background-color: #FF8686;
}

.containerStat{
    background-color: #494A4B;
}

</style>