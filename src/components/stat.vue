<template>
<div class="containerStat flex justify-evenly "    >
     <div class="containerIcons flex flex-wrap justify-center " >
     <div class=" p-2 flex bg-title m-3 items-center justify-evenly  " >
         <img class="p-2 bg-white bg-opacity-25 rounded" src="../assets/icons/popcorn.svg">
         <div v-if="!mobile" class="flex flex-col items-start" >
        <div class="font-bold"> {{movieThisMonth.length}}</div>
         <div> film vus en {{actualDate | moment }} </div>
         </div>
     </div>
     <div class="runTimeTotal flex m-3 p-2 items-center justify-evenly " >
           <img class="p-2 bg-white bg-opacity-25 rounded " src="../assets/icons/hour.svg">
           <div v-if="!mobile" class="flex flex-col items-start">
           <div class="font-bold">
         {{runTimeTotalHours}}
           </div>
           <div>
         Heures passés au cinéma 
           </div>
           </div>
 </div> 
 <div class="bg-purple flex m-3 p-2 items-center justify-evenly " >
           <img class="p-2 bg-white bg-opacity-25 rounded " src="../assets/icons/rate.svg">
           <div v-if="!mobile" class="flex flex-col items-start">
           <div class="font-bold">
         {{rateAverage.toFixed(2)  }}
           </div>
           <div>
               Note Moyenne
           </div>
           </div>
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
            mobile: false,
        
        }
    },
    created(){
          if(window.screen.width <= 600){
      this.mobile = true
    }
        authenticationService.getUser().then(res =>{
            this.user = res
             this.nbMovie = this.user.seen.length
             this.actualMonth = this.actualDate.getMonth()
              console.log(this.actualMonth)
             this.calculRunTime()
             this.getThreeLastMovie()
             this.getDateVue()
             this.calculateRateAverage()
             this.getMostRated()
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
        getMostRated(){
            let movieMostratedArray = this.user.seen.filter(x => x.rate != undefined )
            movieMostratedArray.sort((a, b) => (a.rate > b.rate) ? -1 : 1)
            },
        getMovieByMonth(){
             this.user.seen.map(x =>{
          x.date = new Date(x.date)
      })
    this.movieThisMonth = this.user.seen.filter(x => x.date.getMonth() == this.actualMonth  )
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
     width:66%
}

@media (max-width: 600px) {
  .containerIcons{
    
      flex-direction: column;
    
  }
  .containerStat{
      width:33%
  }
}

</style>