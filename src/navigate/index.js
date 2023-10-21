import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, ForecastScreen} from '../screens';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const getMainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Weather',
            headerStyle: {backgroundColor: '#192f6a'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{
            title: 'Forecast',
            headerStyle: {backgroundColor: '#192f6a'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
          }}
        />
      </Stack.Group>
    );
  };

  return <Stack.Navigator>{getMainStack()}</Stack.Navigator>;
};

export default Navigation;
