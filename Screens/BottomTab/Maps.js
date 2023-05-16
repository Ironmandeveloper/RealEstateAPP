import React, {useEffect, useRef} from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import {hp, wp} from '../../Constants/Responsive';

// MapboxGL.setWellKnownTileServer('maplibre');
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaWZ0aWtoYXJpZmZpIiwiYSI6ImNsYnI0ZjZqODBxdjczbm51MWxneWF6bGkifQ.HkA420rtPufM-amJBQV7bw',
);

const Maps = () => {
  const refMap = useRef();
  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    try {
      {
        PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ],
          {
            title: 'Give Location Permission',
            message: 'App needs location permission to find your position.',
          },
        )
          .then(granted => {
            console.log(granted);
          })
          .catch(err => {
            console.warn(err);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          ref={ref => (refMap.current = ref)}
          // onRegionDidChange={() => getBounds()}
          zoomEnabled
          key="mainmap"
          logoEnabled={false}>
          {/* <MapboxGL.UserLocation visible={true} /> */}
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[74.3000874, 31.4796355]}
          />
          {/* <MapboxGL.PointAnnotation
            key="key1"
            id="id1"
            title="Test"
            coordinate={[74.3000874, 31.4796355]}>
            <Icon
              name="location-history"
              type="material"
              color={colors.primary}
              size={30}
            />
          </MapboxGL.PointAnnotation> */}
        </MapboxGL.MapView>
        <TouchableOpacity
          style={{backgroundColor: 'red', position: 'absolute', zIndex: 1000}}>
          <Text>press tjhis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: hp(100),
    width: wp(100),
  },
  map: {
    flex: 1,
  },
});
