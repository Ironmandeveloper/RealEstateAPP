import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Auth/Splash';
import Login from '../Screens/Auth/Login';
import RegisterAgency from '../Screens/Auth/RegisterAgency';
import ForgotPass from '../Screens/Auth/ForgotPass';
import ResetPass from '../Screens/Auth/ResetPass';
import OTP from '../Screens/Auth/OTP';

export default function AuthStack() {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPass" component={ForgotPass} />
      <AuthStack.Screen name="OTP" component={OTP} />
      <AuthStack.Screen name="ResetPass" component={ResetPass} />
      <AuthStack.Screen name="RegisterAgency" component={RegisterAgency} />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({});
