import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../Components/CustomTextInput';
import {colors} from '../../Constants/Colors';
import {fonts} from '../../Constants/Fonts';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../../Constants/Responsive';
import CustomButton from '../../Components/CustomButton';
import {Auth} from '../../Api/ApiCalls';
import Toast from 'react-native-simple-toast';

export default function ForgotPass(props) {
  const {email} = props.route.params;
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confPasswordSecure, setConfPasswordSecure] = useState(true);

  const ResetPass = () => {
    if (password != confirmPass) {
      Toast.show('Password Not Equal', Toast.SHORT);
    } else {
      setIndicator(true);
      var data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('password_confirmation', confirmPass);
      Auth.reset_Password(data)
        .then(async function (response) {
          console.log(response);
          props.navigation.navigate('AuthStack', {screen: 'Login'});
        })
        .catch(function (error) {
          console.log(error);
          Toast.show(
            error?.response?.data?.message ||
              'Error Occured Resetting Password',
            Toast.SHORT,
          );
        })
        .finally(function () {
          setIndicator(false);
        });
    }
  };

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
        <Text style={styles.headingText}>Reset Password</Text>
        <View style={{width: hp(5)}}></View>
      </View>
      <View style={{marginTop: hp(4)}}>
        <CustomTextInput
          iconName={'lock'}
          iconType="font-awesome"
          placeholder="Please Enter New Password"
          topText="New Password"
          value={password}
          onChangeText={t => setPassword(t)}
          textInputContainer={{marginVertical: hp(1)}}
          iconSize={hp(4)}
          secureTextEntry={confPasswordSecure}
          rightIcon
          rightIconName={'eye'}
          rightIconType="entypo"
          rightIconPress={() => setConfPasswordSecure(!confPasswordSecure)}
        />
        <CustomTextInput
          iconName={'lock'}
          iconType="font-awesome"
          placeholder="Please Confirm Password"
          topText="Confirm Password"
          value={confirmPass}
          onChangeText={t => setConfirmPass(t)}
          textInputContainer={{marginVertical: hp(2)}}
          iconSize={hp(4)}
          secureTextEntry={passwordSecure}
          rightIcon
          rightIconName={'eye'}
          rightIconType="entypo"
          rightIconPress={() => setPasswordSecure(!passwordSecure)}
        />
      </View>
      <CustomButton
        btnText="Send"
        indicator={indicator}
        onPress={ResetPass}
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
});
