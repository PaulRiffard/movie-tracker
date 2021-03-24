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
      btn: [
        { label: "Today", value: "day" },
        { label: "This Week", value: "week" }
      ],
      chartData: null,
      data: {
        day: [1, 3, 5, 3, 1],
        week: [12, 14, 16, 18, 11, 13, 15]
      },
      labels: {
        day: [8, 10, 12, 14, 16],
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      },
      radio: "day"
    };
  },
  mounted() {
    this.fillData();
  },
  created(){
         authenticationService.getUser().then(res =>{
         this.user = res
         console.log(this.user)
     })
     
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.labels[this.radio],
        datasets: [
          {
            borderColor: "#81894e",
            data: this.data[this.radio],
            label: "Foo"
          }
        ]
      };
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