import React,{useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useMediaQuery from '@mui/material/useMediaQuery';


import { Bar } from 'react-chartjs-2';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};





ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function Bpp({ datas }) {
  const matches = useMediaQuery('(max-width:600px)');
 
  let dataArray = []
  let i=0;
  useEffect = (()=>{
  for(i=0;i<datas.length;i++){
    dataArray.push(i)
  }
  },[])
  
  // console.log(datas)
  const labels = matches?dataArray:datas.map((e) => e.interpretatio.section.section)
  const values = datas.map((e) => e.totalCount)
  // console.log(datas)
  const data = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: values,
        backgroundColor: ['rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        'rgba(153, 102, 255, 0.5)',
          
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        
        
        ]
      }
    ]
  };
  return (
    <Bar options={options} data={data} />
  )

}


















// import React from 'react';
// import {
//   Chart, SeriesTemplate, CommonSeriesSettings, Title,
// } from 'devextreme-react/chart';

// export function Bpp({ data }) {
//   return (
//     <>
//      <Chart
//         id="chart"
//         palette="Soft"
//         dataSource={data}>
//         <CommonSeriesSettings
//           argumentField="index"
//           valueField="totalCount"
//           type="bar"
//           ignoreEmptyPoints={true}
//         />
//         <SeriesTemplate nameField="totalCount" />
//         {/* <Title
//           text="Age Breakdown of Facebook Users in the U.S."
//           subtitle="as of January 2017"
//         /> */}
//       </Chart>
//     </>
//   )
// }


