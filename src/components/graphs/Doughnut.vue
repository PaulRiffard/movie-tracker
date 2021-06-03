<template>
<div>
    <div class="graph" >
      <ChartDoughnutBase :chart-data="chartData" />
      </div>
</div>
</template>

<script>

    import ChartDoughnutBase from "./BaseDoughnut"
    import {authenticationService} from "../../service/loginService"

export default {
  components: {
    ChartDoughnutBase
  },
  data() {
    return {
      chartData: null,
      user:{},
      genreVue:[],
      chartLabel:[],
      genreDataChart:[],
      colorChart:[]
    };
  },
  created(){
     authenticationService.getUser().then(res =>{
         this.user = res
         this.calculStatGenre();
     })
     

  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.chartLabel,
        legend:{
          display:false
        },
        datasets: [
          {
            borderColor: this.colorChart,
            backgroundColor: this.colorChart,
            data: this.genreDataChart
          }
        ]
      };
    },

    calculStatGenre(){
              fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=57d264ad6b69204de8c87c1935fdf93b&language=fr").then(response => response.json())
      .then(response =>{
          this.genreVue = response.genres
          this.genreVue.forEach(res =>{
              res.nb = 0
          })
          this.user.seen.forEach(movie =>{
                movie.movie.genres.forEach(genre =>{
                    for (let i = 0; i < this.genreVue.length; i++) {
                        if(this.genreVue[i].name == genre.name){
                            this.genreVue[i].nb ++
                    }   
                 }      
            })
            })
            
                for (let index = 0; index < this.genreVue.length; index++) {
                    if(this.genreVue[index].nb == 0){
                        this.genreVue.splice(index, 1)
                        --index
                    }
                }
                this.genreVue.sort((a, b) => (a.nb > b.nb) ? -1 : 1)
               this.genreVue.forEach(element => {
                   this.chartLabel.push(element.name)
                   this.genreDataChart.push(element.nb)
                   this.colorChart.push("#"+Math.floor(Math.random()*16777215).toString(16))
               });
               this.fillData();
            })
         }

  }
};
</script>

<style scoped>

</style>