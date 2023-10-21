import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, ScrollView, FlatList} from 'react-native';

import {DataRow} from '../../components';
import styles from './styles';

const ForecastScreen = props => {
  const {result} = props?.route?.params;
  const itemArray = result?.list;

  const renderEmptyListMessage = () => {
    return (
      <View style={styles.listEmpty}>
        <Text style={styles.text}>No data found</Text>
      </View>
    );
  };
  const renderSeparatorItem = () => {
    return <View style={{backgroundColor: '#3b5998', height: 5}}></View>;
  };

  const renderCellItem = ({item, index}) => {
    return (
      <View style={styles.itemCell}>
        <Text style={styles.text}>{item?.dt_txt ?? ''}</Text>
        <Text style={styles.title}>
          {Math.round(item?.main?.temp) ?? ''}
          &#176;C
        </Text>
        <Text style={styles.text}>
          {item?.weather[0]?.main ?? ''}
          {': '}
          {item?.weather[0]?.description ?? ''}
        </Text>
        <View style={styles.contentContainer}>
          <DataRow
            label="Temp feels like"
            value={`${Math.round(item?.main?.feels_like) ?? ''}°C`}
          />
          <DataRow
            label="Temp max"
            value={`${Math.round(item?.main?.temp_max) ?? ''}°C`}
          />
          <DataRow
            label="Temp min"
            value={`${Math.round(item?.main?.temp_min) ?? ''}°C`}
          />
          <DataRow
            label="Wind speed"
            value={`${Math.round(item?.wind?.speed) ?? ''} meter/sec`}
          />
          <DataRow
            label="Pressure"
            value={`${Math.round(item?.main?.pressure) ?? ''} hPa`}
          />
          <DataRow
            label="Humidity"
            value={`${Math.round(item?.main?.humidity) ?? ''}%`}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={{position: 'relative'}}>
          <Text style={styles.title}>{result?.city?.name ?? ''}</Text>
        </View>

        <FlatList
          data={itemArray}
          ListEmptyComponent={renderEmptyListMessage}
          ItemSeparatorComponent={renderSeparatorItem}
          renderItem={renderCellItem}
        />
      </View>
    </LinearGradient>
  );
};

export default ForecastScreen;
