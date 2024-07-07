import React, { useState, useEffect } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import {
  updateUrlParam,
  getUrlParam,
  removeUrlParam,
  getBarChartData,
  updateCookies,
} from '../utils/appUtils';
import {
  AGE_FILTER_OPTIONS,
  GENDER_FILTER_OPTIONS,
  SELECT_FILTER_TYPES,
} from '../utils/constants';
import moment from 'moment';
import Cookies from 'js-cookie';

const Filters = ({ chartDataRaw, setChartFilteredData, setBarChartData }) => {
  const [dateRange, setDateRange] = useState();
  const [ageFilter, setAgeFilter] = useState();
  const [genderFilter, setGenderFilter] = useState();

  useEffect(() => {
    // check for initial URL params and set in the state
    try {
      const dateRange = getUrlParam('dateRange');

      const age = getUrlParam('age');

      const gender = getUrlParam('gender');

      if (dateRange) {
        setDateRange(dateRange);
      }
      if (age) {
        setAgeFilter(age);
      }
      if (gender) {
        setGenderFilter(gender);
      }
    } catch (e) {
      console.log('useeffect url param failed', e);
    }

    // check for user cookies and set in the state
    if (Cookies.get('dates')) {
      setDateRange(Cookies.get('dates'));
    }
    if (Cookies.get('age')) {
      setAgeFilter(Cookies.get('age'));
    }
    if (Cookies.get('gender')) {
      setGenderFilter(Cookies.get('gender'));
    }
  }, []);

  useEffect(() => {
    updateCookies(dateRange, ageFilter, genderFilter);
    setFilteredData(chartDataRaw, dateRange, ageFilter, genderFilter);
  }, [dateRange, ageFilter, genderFilter]);

  const setFilteredData = (data, dates, age, gender) => {
    let allFilteredData = data;
    if (dates && dates.length) {
      const dateRangeStart = moment(dates[0], 'DD/MM/YYYY');
      const dateRangeEnd = moment(dates[1], 'DD/MM/YYYY');
      const filteredData = data.filter((item) => {
        const date = moment(item.Day, 'DD/MM/YYYY');
        if (date.isAfter(dateRangeStart) && date.isBefore(dateRangeEnd))
          return true;
      });
      allFilteredData = filteredData;
    }
    if (age) {
      allFilteredData = allFilteredData.filter((data) => data.Age === age);
    }
    if (gender) {
      allFilteredData = allFilteredData.filter(
        (data) => data.Gender === gender
      );
    }
    setBarChartData(getBarChartData(allFilteredData));
    setChartFilteredData(allFilteredData);
    // console.log('allfiltered --', allFilteredData);
  };

  const handleDateRangeChange = (params) => {
    if (!params) {
      setDateRange(null);
      removeUrlParam('dateRange');
      return;
    }
    const dateRange = params;
    console.log('handle date change', dateRange);
    setDateRange(dateRange);
    updateUrlParam('dateRange', JSON.stringify(dateRange));
  };

  const handleSelectChange = (selectedOption, type) => {
    updateCookies();
    if (type === SELECT_FILTER_TYPES.AGE) {
      // console.log('handle select change ---', selectedOption);
      setAgeFilter(selectedOption.value);
      updateUrlParam(
        SELECT_FILTER_TYPES.AGE,
        JSON.stringify(selectedOption.value)
      );
    }
    if (type === SELECT_FILTER_TYPES.GENDER) {
      // console.log('handle select change ---', selectedOption);
      setGenderFilter(selectedOption.value);
      updateUrlParam(
        SELECT_FILTER_TYPES.GENDER,
        JSON.stringify(selectedOption.value)
      );
    }
  };

  return (
    <>
      <div className="filter-container">
        <div>
          <DateRangePicker onChange={handleDateRangeChange} value={dateRange} />
        </div>
        <div>
          <Select
            getOptionValue={() =>
              AGE_FILTER_OPTIONS.find((item) => item.value === ageFilter)
            }
            options={AGE_FILTER_OPTIONS}
            placeholder={ageFilter || 'Age'}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, 'age')
            }
          />
        </div>
        <div>
          <Select
            getOptionValue={() =>
              GENDER_FILTER_OPTIONS.find((item) => item.value === genderFilter)
            }
            options={GENDER_FILTER_OPTIONS}
            placeholder={genderFilter || 'Gender'}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, 'gender')
            }
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
