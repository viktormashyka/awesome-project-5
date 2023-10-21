import axios from 'axios';
import {API_KEY} from './api_config';
import {Alert} from 'react-native';

let limit = 5; // {limit}

axios.defaults.baseURL = 'https://api.openweathermap.org';

export const fetchWeatherByLocation = async (data, signal) => {
  const url = `/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url, {signal});
    const weatherByLocation = response.data;
    return weatherByLocation;
  } catch (error) {
    if (axios.isCancel(error)) {
      return [];
    }
    if (error.code === 'ERR_BAD_REQUEST') {
      Alert.alert('Error', 'Bad request!');
    }
    throw new Error(error);
  }
};

export const fetchCoordinatesByCityName = async (location, signal) => {
  const url = `/geo/1.0/direct?q=${location}&limit=${limit}&appid=${API_KEY}`;
  try {
    const response = await axios.get(url, {signal});
    const coordinatesByCityName = response.data;
    return coordinatesByCityName;
  } catch (error) {
    if (axios.isCancel(error)) {
      return [];
    }
    if (error.code === 'ERR_BAD_REQUEST') {
      Alert.alert('Error', 'Bad request!');
    }
    throw new Error(error);
  }
};

export const fetchForecastByLocation = async (coord, signal) => {
  const url = `/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url, {signal});
    const forecastByLocation = response.data;
    return forecastByLocation;
  } catch (error) {
    if (axios.isCancel(error)) {
      return [];
    }
    if (error.code === 'ERR_BAD_REQUEST') {
      Alert.alert('Error', 'Bad request!');
    }
    throw new Error(error);
  }
};
