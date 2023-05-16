import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {hp, wp} from '../Constants/Responsive';
import Lottie from 'lottie-react-native';

export default function CustomLoader({isLoading}) {
  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Lottie
            source={require('../Assets/JSON/Loader.json')}
            autoPlay
            loop
          />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: hp(100),
    position: 'absolute',
    zIndex: 100000,
    backgroundColor: 'rgba(1,1,1,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
