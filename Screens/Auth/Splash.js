import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {hp, wp} from '../../Constants/Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash(props) {
  useEffect(() => {
    navigateToConfirmation();
  }, []);
  const navigateToConfirmation = async () => {
    setTimeout(() => {
      props.navigation.replace('BottomNavigator');
    },5000);
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <ImageBackground source={require('../../Assets/Images/bg.png')}
    style={{width:wp(100), height:hp(100), alignItems:'center', justifyContent:'center'}}
    resizeMode='repeat'
    >
      <Image
        source={require('../../Assets/Images/logoAnim.gif')}
        style={{width: hp(100), height: hp(50)}}
        resizeMode="contain"
      />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
