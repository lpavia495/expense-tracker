<template>
    <div>
      <pie-chart :chart-data="datacollection"></pie-chart>
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
  
  export default {
    name: 'PieChart',
    components: {
      PieChart: Pie
    },
    props: {
      data: {
        type: Object,
        required: true,
        default: () => ({})
      }
    },
    computed: {
      datacollection() {
        console.log('PieChart received data:', this.data);
        if (!this.data || Object.keys(this.data).length === 0) {
          return {
            labels: [],
            datasets: [{
              label: 'Expenses by Category',
              backgroundColor: [],
              data: []
            }]
          };
        }
        return {
          labels: Object.keys(this.data),
          datasets: [
            {
              label: 'Expenses by Category',
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: Object.values(this.data)
            }
          ]
        };
      }
    }
  };
  </script>
  