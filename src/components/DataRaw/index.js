import {View, Text} from 'react-native';

import styles from './styles';

const DataRow = ({label, value}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default DataRow;
