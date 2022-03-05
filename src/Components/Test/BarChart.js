import React from 'react';
import {
  Chart, SeriesTemplate, CommonSeriesSettings, Title,
} from 'devextreme-react/chart';

export function Bpp({ data }) {

  return (
    <>
     <Chart
        id="chart"
        palette="Soft"
        dataSource={data}>
        <CommonSeriesSettings
          argumentField="section"
          valueField="totalCount"
          type="bar"
          ignoreEmptyPoints={true}
        />
        <SeriesTemplate nameField="totalCount" />
        {/* <Title
          text="Age Breakdown of Facebook Users in the U.S."
          subtitle="as of January 2017"
        /> */}
      </Chart>
    </>
  )
}


