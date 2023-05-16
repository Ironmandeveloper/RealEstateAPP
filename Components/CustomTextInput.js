import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {hp, wp} from '../Constants/Responsive';
import {fonts} from '../Constants/Fonts';
import {colors} from '../Constants/Colors';
import {Icon} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
export default function CustomTextInput(props) {
  return (
    <View style={[styles.textInputContainer, props.textInputContainer]}>
      <Text style={[styles.inputHeading, props.inputHeading]}>
        {props.topText || 'N/A'}
      </Text>
      <View
        style={
          props.textInputView ? props.textInputView : styles.textInputView
        }>
        <View>
          <Icon
            name={props.iconName}
            type={props.iconType}
            color={colors.primary}
            size={props.iconSize ? props.iconSize : hp(5)}
            style={props.iconStyles}
          />
        </View>
        <TextInput
          secureTextEntry={props.secureTextEntry ? true : false}
          placeholder={props.placeholder}
          multiline={props.multiline}
          value={props.value}
          placeholderTextColor={colors.grey}
          style={[styles.textInputStyles, props.textInputStyles]}
          onChangeText={props.onChangeText}
          textStyle={styles.textStyle}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          labelStyle={{
            fontWeight: 'bold',
          }}
          editable={props?.editable ? !props.editable : true}
        />
        {props.rightIcon ? (
          <TouchableOpacity onPress={props.rightIconPress}>
            <Icon
              name={props.rightIconName}
              type={props.rightIconType}
              color={colors.primary}
              size={props.iconSize ? props.rightIconSize : hp(5)}
              style={props.rightIconStyles}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: hp(4)}}></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: wp(90),
    height: hp(8),
    // flex: 1 / 10,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor:colors.tertiary
  },
  inputHeading: {
    fontFamily: fonts.bold,
    position: 'absolute',
    top: -hp(2.4),
    left: wp(5),
    backgroundColor: colors.tertiary,
    padding: 5,
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyles: {
    width: wp(60),
    fontFamily: fonts.regular,
  },
  dropDownStyles: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp(75),
  },
  textStyle: {
    color: colors.grey,
  },
});
