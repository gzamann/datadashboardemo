import React, { useEffect, useState } from 'react';
import Filters from '../components/Filters';
import Chart from '../components/Chart';
import { BAR_CHART_CATEGORIES } from '../utils/constants';
import { getChartConfig, getBarChartData } from '../utils/appUtils';

const Dashboard = () => {
  const [chartDataRaw, setChartDataRaw] = useState();
  const [chartFilteredData, setChartFilteredData] = useState();
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [currentBar, setCurrentBar] = useState('A');

  React.useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((response) => {
        console.log('res--', response);
        setChartDataRaw(response.data);
        setChartFilteredData(response.data);
      })
      .catch((e) => console.log('error----', e));
  }, []);

  useEffect(() => {
    if (chartFilteredData) {
      //   console.log('chart data-', chartFilteredData);
      const barChartData = getBarChartData(chartFilteredData);
      setBarChartData(barChartData);
    }
  }, [chartFilteredData]);

  useEffect(() => {
    if (currentBar && chartFilteredData) {
      const getLineChartData = () => {
        const data = [];
        chartFilteredData.forEach((dataSet) => {
          data.push(dataSet[currentBar]);
        });
        // console.log('line data -', data);
        setLineChartData(data);
      };
      getLineChartData();
    }
  }, [currentBar, chartFilteredData]);

  const onClickBar = (barData) => {
    // console.log('clicked bar -', barData, barData.name);
    setCurrentBar(barData.name);
  };

  if (!chartFilteredData) {
    return <>Loading</>;
  }
  // console.log('line chart ---points -', lineChartData);

  return (
    <>
      <div>
        <div>
          <Filters
            chartDataRaw={chartDataRaw}
            setChartFilteredData={setChartFilteredData}
            setBarChartData={setBarChartData}
          />
        </div>
        <div className="chart-container">
          <div>
            <Chart
              onClickHandler={onClickBar}
              chartConfig={getChartConfig(
                barChartData,
                BAR_CHART_CATEGORIES,
                'bar'
              )}
            />
          </div>
          <div>
            {lineChartData ? (
              <Chart
                chartConfig={getChartConfig(
                  lineChartData,
                  chartFilteredData.map((dataset) => dataset.Day),
                  'line'
                )}
              />
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
