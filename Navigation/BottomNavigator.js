import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import {allImages} from '../Constants/Images';
import {hp} from '../Constants/Responsive';
import AddInventoriesClassified from '../Screens/BottomTab/AddInventoriesClassified';
import Classified from '../Screens/BottomTab/Classified';
import HomeScreen from '../Screens/BottomTab/HomeScreen';
import Inventories from '../Screens/BottomTab/Inventories';
import {colors} from '../Constants/Colors';
import Maps from '../Screens/BottomTab/Maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.bottomStyle,
          Platform.OS == 'ios' ? {paddingBottom: 15,  height:hp(8)} : null,
        ],
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: colors.white},
          tabBarIcon: () => (
            <Icon
              name={'home'}
              type={'font-awesome'}
              color={colors.white}
              size={hp(3)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inventories"
        component={Inventories}
        options={{
          tabBarLabelStyle: {color: colors.white},
          tabBarIcon: () => (
            <Icon
              name={'package'}
              type={'octicon'}
              color={colors.white}
              size={hp(3)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddInventoriesClassified"
        component={AddInventoriesClassified}
        listeners={{
          tabPress: async e => {
            e.preventDefault();
          },
        }}
        options={{
          tabBarLabel: '',
          tabBarLabelStyle: {color: colors.white},
          tabBarIcon: p => (
            <Pressable
              style={styles.bottomButton}
              onPress={async () => {
                let userData = await AsyncStorage.getItem('AuthUser');
                const user = JSON.parse(userData);
                console.log(!user);
                if (!user) {
                  Toast.show('Please Login First', Toast.SHORT);
                } else {
                  navigation.navigate('AddInventoriesClassified');
                }
              }}>
              <Icon
                name={'plus'}
                type={'font-awesome'}
                color={colors.primary}
                size={hp(4)}
              />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Classified"
        component={Classified}
        options={{
          tabBarLabelStyle: {color: colors.white},
          tabBarIcon: () => (
            <Icon
              name={'form-select'}
              type={'material-community'}
              color={colors.white}
              size={hp(3)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={Maps}
        options={{
          tabBarLabelStyle: {color: colors.white},
          tabBarIcon: () => (
            <Icon
              name={'globe'}
              type={'entypo'}
              color={colors.white}
              size={hp(3)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  bottomButton: {
    marginBottom: hp(4),
    backgroundColor: colors.white,
    padding: 5,
    width: hp(9),
    height: hp(9),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 6,
    borderColor: colors.primary,
  },
  bottomStyle: {backgroundColor: colors.primary, paddingBottom: 5},
});
