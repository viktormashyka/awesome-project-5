import React, {useState, useEffect} from 'react';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  fetchWeatherByLocation,
  fetchCoordinatesByCityName,
  fetchForecastByLocation,
} from '../../apis/api';

import {DataRow} from '../../components';
import LocationHelper from '../../helpers/LocationManager';
import styles from './styles';

const favoriteLocationValidationSchema = Yup.object().shape({
  inputFavoriteLocation: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
});

const HomeScreen = props => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [favoriteLocationsData, setFavoriteLocationsData] = useState([]);
  const [inputFavoriteLocation, setInputFavoriteLocation] = useState('');
  const [locationObject, setLocationObject] = useState(undefined);
  const [timestamp, setTimestamp] = useState(Date.now());

  const date = new Date();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.fetchLocation(
          locationObject => {
            const location = {
              lat: locationObject?.latitude,
              lon: locationObject?.longitude,
            };
            setLocationObject(location);
          },
          error => {
            throw new Error(error);
          },
        );
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getWeatherByLocation = async (coord, signal) => {
      try {
        setIsLoading(true);
        const result = await fetchWeatherByLocation(coord, controller.signal);
        setWeather(result);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getWeatherByLocation(locationObject);

    return () => {
      controller.abort();
    };
  }, [locationObject, timestamp]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favoriteLocations');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
        throw new Error(error);
      }
    };
    getData().then(data => {
      data !== null && setFavoriteLocationsData(data);
    });
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(favoriteLocationsData);
        await AsyncStorage.setItem('favoriteLocations', jsonValue);
      } catch (error) {
        throw new Error(error);
      }
    };
    storeData();
  }, [favoriteLocationsData]);

  const handleFavoriteLocationSubmit = () => {
    if (inputFavoriteLocation.trim() === '') {
      Alert.alert('Enter city name');
      return;
    }

    favoriteLocationValidationSchema
      .validate({inputFavoriteLocation}, {abortEarly: false})
      .then(() => {
        console.log('Form is valid');
        if (!inputFavoriteLocation) {
          return;
        }
        const controller = new AbortController();
        const getCoordinatesByCityName = async () => {
          try {
            setIsLoading(true);
            const result = await fetchCoordinatesByCityName(
              inputFavoriteLocation,
              controller.signal,
            );
            const name = result[0]?.name;
            const lat = result[0]?.lat;
            const lon = result[0]?.lon;
            const location = {lat: lat, lon: lon};

            if (!favoriteLocationsData.some(item => item.title === name)) {
              const newLocationRecord = {
                id: uuid.v4(),
                title: name,
                location: location,
              };

              setFavoriteLocationsData(prev => [...prev, newLocationRecord]);
            } else {
              console.log(
                'Title already exists in the favoriteLocationsData array',
              );
            }

            setInputFavoriteLocation('');
            return location;
          } catch (error) {
            throw new Error(error);
          } finally {
            setIsLoading(false);
          }
        };

        const getWeatherByLocation = async data => {
          try {
            setIsLoading(true);
            const result = await fetchWeatherByLocation(
              data,
              controller.signal,
            );
            setWeather(result);
          } catch (error) {
            throw new Error(error);
          } finally {
            setIsLoading(false);
          }
        };

        getCoordinatesByCityName().then(data => {
          getWeatherByLocation(data);
        });

        return () => {
          controller.abort();
        };
      })
      .catch(err => {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const handleForecastSubmit = coord => {
    const getForecastByLocation = async coord => {
      try {
        setIsLoading(true);
        const result = await fetchForecastByLocation(coord);
        props.navigation.navigate('Forecast', {result});
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getForecastByLocation(coord);
  };

  const handleSavedLocationSubmit = coord => {
    const getWeatherByLocation = async coord => {
      try {
        setIsLoading(true);
        const result = await fetchWeatherByLocation(coord);
        setWeather(result);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getWeatherByLocation(coord);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={changeText => setInputFavoriteLocation(changeText)}
            value={inputFavoriteLocation}
            placeholder="Enter city name..."
          />
          {errors.inputFavoriteLocation && (
            <Text style={styles.error}>{errors.inputFavoriteLocation}</Text>
          )}
          <View style={styles.rawBtnContainer}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => {
                setTimestamp(Date.now());
              }}>
              <Text style={styles.text}>Geoposition</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={handleFavoriteLocationSubmit}>
              <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal>
            {favoriteLocationsData &&
              favoriteLocationsData.length > 0 &&
              favoriteLocationsData.map((item, index) => {
                return (
                  <View style={styles.rawFavoriteContainer} key={item?.id}>
                    <TouchableOpacity
                      onPress={() => {
                        handleSavedLocationSubmit(item?.location);
                      }}>
                      <Text style={styles.textUnderline}>{item?.title} </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </View>
        {weather && weather !== null && (
          <View style={styles.form}>
            <Text style={styles.title}>{weather?.name ?? ''}</Text>
            <Text style={styles.text}>
              {`${year}-${month}-${day} ${hours}:${minutes}`}
            </Text>
            <Text style={styles.text}>
              {weather?.weather[0]?.main ?? ''} {': '}
              {weather?.weather[0]?.description ?? ''}
            </Text>
            <Text style={styles.title}>
              {Math.round(weather?.main?.temp) ?? ''}&#176;C
            </Text>
            <View style={styles.contentContainer}>
              <DataRow
                label="Temp feels like"
                value={`${Math.round(weather?.main?.feels_like) ?? ''}°C`}
              />
              <DataRow
                label="Temp max"
                value={`${Math.round(weather?.main?.temp_max) ?? ''}°C`}
              />
              <DataRow
                label="Temp min"
                value={`${Math.round(weather?.main?.temp_min) ?? ''}°C`}
              />
              <DataRow
                label="Wind speed"
                value={`${Math.round(weather?.wind?.speed) ?? ''} meter/sec`}
              />
              <DataRow
                label="Pressure"
                value={`${Math.round(weather?.main?.pressure) ?? ''} hPa`}
              />
              <DataRow
                label="Humidity"
                value={`${Math.round(weather?.main?.humidity) ?? ''}%`}
              />
            </View>
            <View style={styles.rawBtnContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleForecastSubmit(weather?.coord);
                }}>
                <Text style={styles.text}>Forecast</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isLoading && (
          <ActivityIndicator
            // animating={}
            hidesWhenStopped
            size={'large'}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
