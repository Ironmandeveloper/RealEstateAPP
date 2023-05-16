import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {hp, wp} from '../Constants/Responsive';

const data = [
  {label: 'Lahore', value: '1'},
  {label: 'Multan', value: '2'},
  {label: 'Karachi', value: '3'},
  {label: 'Islamabad', value: '4'},
];

const CustomDropdown = props => {
  const [isFocus, setIsFocus] = useState(false);
  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && {color: colors.primary}]}>
        {props.topLabelText}
      </Text>
    );
    return null;
  };

  return (
    <View style={[styles.container, props.container]}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          props.dropdown,
          isFocus && {borderColor: colors.primary},
        ]}
        disable={props?.disable || false}
        placeholderStyle={[styles.placeholderStyle, props.placeholderStyle]}
        selectedTextStyle={[styles.selectedTextStyle, props.selectedTextStyle]}
        inputSearchStyle={[styles.inputSearchStyle, props.inputSearchStyle]}
        iconStyle={[styles.iconStyle, props.iconStyle]}
        data={props.data}
        search
        fontFamily={fonts.regular}
        maxHeight={300}
        labelField={props.labelFieldName}
        valueField={props.valueFieldName}
        placeholder={!isFocus ? props.placeholder : '...'}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.onChange(item);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Icon
            name={props.iconName}
            type={props.iconType}
            color={colors.primary}
            size={hp(3)}
            style={{marginHorizontal: 5}}
          />
        )}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    marginVertical: hp(1.5),
  },
  dropdown: {
    height: hp(7),
    width: wp(90),
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.tertiary,
    left: wp(8),
    top: -hp(1.5),
    zIndex: 999,
    paddingHorizontal: 8,
    fontFamily: fonts.bold,
    fontSize: hp(2),
  },
  placeholderStyle: {
    fontSize: hp(2),
    fontFamily: fonts.regular,
  },
  selectedTextStyle: {
    fontSize: hp(2),
    fontFamily: fonts.regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: hp(2),
  },
});
