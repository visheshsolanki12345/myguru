import React from 'react'
import Chart from "react-apexcharts";

const SideBarChart = ({arrayOne, arrayTwo}) => {
  const state = {

    series: [{
      data: arrayOne
    }],
    options: {
      chart: {
        type: 'bar',
        height: 200
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: arrayTwo
      }
    },
  };


  return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="1200"
            />
          </div>
        </div>
      </div>
  )
}

export default SideBarChart