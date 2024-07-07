import { BAR_CHART_CATEGORIES } from './constants';
import Cookies from 'js-cookie';

export const updateUrlParam = (name, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState({ path: url.href }, '', url.href);
};

export const getUrlParam = (paramName) => {
  if (!paramName) {
    return null;
  }
  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get(paramName)
    ? JSON.parse(searchParams.get(paramName))
    : searchParams.get(paramName);
  return paramValue;
};

export const removeUrlParam = (paramName) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(paramName);

  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

  window.history.replaceState({ path: newUrl }, '', newUrl);
};

export const getChartConfig = (data, categories, chartType) => {
  switch (chartType) {
    case 'bar':
      return {
        yAxis: {
          type: 'category',
          data: categories,
        },
        xAxis: {
          type: 'value',
        },
        series: [
          {
            data: data,
            type: 'bar',
          },
        ],
        label: {
          show: true,
          position: 'right',
        },
      };
    case 'line':
      return {
        xAxis: {
          type: 'category',
          data: categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: data,
            type: 'line',
          },
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 350,
          },
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 29,
            end: 360,
          },
          {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 300,
          },
          {
            type: 'inside',
            yAxisIndex: [0],
            start: 29,
            end: 300,
          },
        ],
      };
      break;

    default:
      return {};
      break;
  }
};

export const getBarChartData = (chartData) => {
  const results = Array(BAR_CHART_CATEGORIES.length).fill(0);

  chartData.forEach((dataSet) => {
    Object.keys(dataSet).forEach((key) => {
      const propertyIndex = BAR_CHART_CATEGORIES.indexOf(key);
      if (propertyIndex !== -1) {
        results[propertyIndex] += dataSet[key];
      }
    });
  });

  // console.log('bar chart data', results);
  return results;
};

export const updateCookies = (dates, age, gender) => {
  if (dates && dates.length) {
    Cookies.set('dates', JSON.stringify(dates), { expires: 1 });
  } else {
    Cookies.remove('dates');
  }
  if (age) {
    Cookies.set('age', age, { expires: 1 });
  }
  if (gender) {
    Cookies.set('gender', gender, { expires: 1 });
  }
};
