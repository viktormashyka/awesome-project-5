import {
  request,
  PERMISSIONS,
  check,
  RESULTS,
  checkLocationAccuracy,
} from 'react-native-permissions';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class LocationHelper {
  fetchLocation = (success, failure) => {
    Geolocation.getCurrentPosition(
      position => {
        const locationObject = {
          ...position.coords,
          timestamp: position.timestamp,
          mocked: position.mocked,
        };

        if (success) {
          success(locationObject);
        }
      },
      error => {
        // See error code charts below.

        if (failure) {
          failure(error);
        }
      },
      {
        showLocationDialog: true,
        forceRequestLocation: true,
        distanceFilter: 0.5,
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
      },
    );
  };

  trackUserLocation = (success, failure) => {
    Geolocation.watchPosition(
      locationObject => {
        if (success) {
          success(locationObject);
        }
      },
      error => {
        if (failure) {
          failure(error);
        }
      },
      {
        enableHighAccuracy: true,
        forceRequestLocation: true,
        showLocationDialog: true,
        distanceFilter: 0.5,
        useSignificantChanges: true,
        showsBackgroundLocationIndicator: true,
      },
    );
  };

  checkLocationPermission = (successCallback, errorCallback) => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.requestPermission(successCallback, errorCallback);
            break;
          case RESULTS.DENIED:
            this.requestPermission(successCallback, errorCallback);
            break;
          case RESULTS.GRANTED:
            successCallback();
            break;
          case RESULTS.BLOCKED:
            this.requestPermission(successCallback, errorCallback);
            break;
        }
      })
      .catch(error => {
        errorCallback();
      });
  };

  requestPermission = (successCallback, errorCallback) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        if (successCallback) successCallback();
      })
      .catch(error => {
        if (errorCallback) errorCallback(error);
      });
  };
}

export default new LocationHelper();
