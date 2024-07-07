import React from 'react';
import ReactECharts from 'echarts-for-react';

const Chart = ({ chartConfig = {}, onClickHandler }) => {
  const option = {
    ...chartConfig,
  };
  return (
    <>
      <ReactECharts
        option={option}
        style={{ height: '400px', width: '100%' }}
        onEvents={{ click: onClickHandler }}
      />
    </>
  );
};

export default Chart;
