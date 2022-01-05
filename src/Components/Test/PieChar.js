import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
const Piechart = ({Newdata, totalNo}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
 const data = {
  labels: ['score', 'remainder'],
  datasets: [
    {
      label: '# of Votes',
      data: [Newdata,totalNo-Newdata],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      hoverBackgroundColor: [
        'rgba(255, 99, 132, 4)',
        'rgba(54, 162, 235, 4)'
      
        ],
      borderWidth: 1,
    },
  ],
};
const options = {
  maintainAspectRatio: false,
  responsive:true,  Legend:{
    display:true,
    position:'right'
  }
 
};


    return (<>
    <Pie data={data} options={options}  />
    </>
    )
}

export default Piechart
