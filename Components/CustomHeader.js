import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../Constants/Responsive';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import FilterComp from './FilterComp';

export default function CustomHeader(props) {
  return (
    <SafeAreaView style={[props.headerStyle,]}>
      <View style={props.iconContainer}>
        {props.leftImage ? (
          <Image
            source={props.leftImage}
            style={props.leftImageStyle}
            resizeMode="contain"
          />
        ) : null}
        <TouchableOpacity onPress={props.onLeftIconPress}>
          <Icon
            name={props.leftIconName}
            type={props.leftIconType}
            color={props.leftIconColor}
            size={props.leftIconSize}
          />
        </TouchableOpacity>
        <Text style={props.screenTitleStyle}>{props.screenTitle}</Text>
        <TouchableOpacity onPress={props.onRighttIconPress}>
          {!props.loginText ? (
            <Icon
              name={props.rightIconName}
              type={props.rightIconType}
              color={props.rightIconColor}
              size={props.rightIconSize}
            />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      {!props.search ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={props.inputViewStyle}>
            <Icon name="search" type="material" color={colors.grey} size={30} />
            <TextInput
              style={props.textInputStyle}
              numberOfLine={1}
              placeholder={props.placeholder}
              placeholderTextColor={props.placeholderTextColor}
              onChangeText={t => props.onChangeText(t)}
              value={props.value}
            />
          </View>
          {props.filter ? (
            <TouchableOpacity
              style={styles.filterContainer}
              onPress={props.onFilterPress}>
              <Icon
                type="material"
                name="tune"
                size={25}
                color={colors.primary}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
  loginText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.white,
  },
  filterContainer: {
    width: wp(14),
    height: hp(7),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: hp(1),
  },
});
