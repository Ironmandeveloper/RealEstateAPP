import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import BottomNavigator from './BottomNavigator';
import AppFlow from './AppFlow';

export default function Routes() {
  const MainStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="AuthStack" component={AuthStack} />
        <MainStack.Screen name="BottomNavigator" component={BottomNavigator} />
        <MainStack.Screen name="AppFlow" component={AppFlow} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
