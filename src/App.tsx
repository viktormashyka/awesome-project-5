import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ErrorBoundary} from 'react-error-boundary';
import {View, Text, StyleSheet} from 'react-native';
import {LogBox} from 'react-native';
import Navigation from './navigate';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      loadingCompleted();
    }
  }, [isLoading]);

  const loadingCompleted = () => {};

  return (
    <NavigationContainer>
      <ErrorBoundary
        fallback={
          <View style={styles.container}>
            <Text style={styles.text}>Something went wrong!!!</Text>
          </View>
        }>
        <Navigation navigation={undefined} />
      </ErrorBoundary>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 36, textAlign: 'center'},
});
