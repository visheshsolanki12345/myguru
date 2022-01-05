import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function Bpp({data}) {
  var labels=[]
  var numbers=[]
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      scales: {
        yAxes: [{
          barPercentage: 0.5,
          gridLines: {
            display: false
          }
        }],
    },
  }}
  {data&& data.map((e)=>{
    labels.push(e.section)
  })}
  {data&& data.map((e)=>{
    numbers.push(e.totalCount)
  })}
  // console.log(numbers)
  
   const datas = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: numbers,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderThickness:'5px'
      },
     
    ],
  };
  // console.log(data)
  return <Bar options={options} data={datas} />;
}


