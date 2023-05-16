import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {hp, wp} from '../Constants/Responsive';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';

export default function CustomButton(props) {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, props.btnContainer]}
      disabled={props?.disabled || false}
      onPress={props.onPress}>
      {props.indicator ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={[styles.btnTextStyles, props.btnTextStyles]}>
          {props.btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: wp(90),
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  btnTextStyles: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: hp(2.2),
  },
});
