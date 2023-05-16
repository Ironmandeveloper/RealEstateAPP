import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../Components/CustomTextInput';
import {colors} from '../../Constants/Colors';
import {fonts} from '../../Constants/Fonts';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../../Constants/Responsive';
import CustomButton from '../../Components/CustomButton';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-simple-toast';
import {Auth} from '../../Api/ApiCalls';
const CELL_COUNT = 5;

export default function OTP(props) {
  const {data, email} = props.route.params;
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  async function confrimOTP() {
    if (value != '') {
      setLoader(true);
      const form = new FormData();
      form.append('email', email);
      form.append('otp', value);
      Auth.confirm_OTP(form)
        .then(res => {
          props.navigation.navigate('ResetPass', {email: email});
        })
        .catch(err => {
          Toast.show('OTP Not Verified', Toast.SHORT);
        })
        .finally(function () {
          setLoader(false);
        });
    } else {
      Toast.show('Invalid OTP', Toast.SHORT);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name={'arrow-back-circle'}
            type={'ionicon'}
            color={colors.primary}
            size={hp(5)}
          />
        </TouchableOpacity>
        <Text style={styles.headingText}>OTP</Text>
        <View style={{width: hp(5)}}></View>
      </View>
      <CodeField
        //ref={ref}
        value={value}
        onChangeText={text => setValue(text)}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={{flexDirection: 'row', marginTop: hp(2)}}>
        <Text style={styles.text1}>Have not received a OTP? </Text>
        <TouchableOpacity>
          <Text style={{...styles.text1, color: colors.primary}}>Resend</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        btnText="Submit"
        indicator={loader}
        onPress={() => confrimOTP()}
        btnContainer={{marginTop: hp(20)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    color: colors.black,
    fontFamily: fonts.bold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    marginVertical: hp(2),
  },
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  text1: {
    fontFamily: fonts.medium,
    color: colors.grey,
    fontSize: 14,
  },
  codeFieldRoot: {borderRadius: 30, marginTop: hp(4)},

  cell: {
    width: wp(14),
    height: hp(7),
    lineHeight: hp(8),
    fontFamily: fonts.bold,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    textAlign: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  focusCell: {
    borderColor: colors.primary,
    borderRadius: 10,
    paddingTop: 10,
  },
  code: {
    marginHorizontal: wp(10),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
  },
});
