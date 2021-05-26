<template>
  <div class="graph" >
      <BaseLineChart :chart-data="chartData" />
      </div>
</template>

<script>
import BaseLineChart from "./BaseLineChart"
import {authenticationService} from '../../service/loginService'

export default {
  components: {
    BaseLineChart
  },
  data() {
    return {
      chartData: null,
      arrayMonth:[0,0,0,0,0,0,0,0,0,0,0,0]
    };

  },
  mounted() {
    this.fillData();
  },
  created(){
         authenticationService.getUser().then(res =>{
         this.user = res
      
         this.calculateMonthMovie()
     })
     
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: ["Janvier","Février","Mars","Avri","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"],
        datasets: [
          {
            backgroundColor: "#931621",
            data: this.arrayMonth,
            label: "Film Vus par mois"
          }
        ]
      };
    },

    calculateMonthMovie(){
      this.user.seen.map(x =>{
          x.date = new Date(x.date)
      })

      this.user.seen.forEach(movie => {
        this.arrayMonth[movie.date.getMonth()] ++
      });
    this.updateChart()


    
},


    updateChart() {
      this.$nextTick(() => {
        this.fillData();
      });
    }
  }
};
</script>

<style scoped>
.graph{
    width: 35%;
}


</style>