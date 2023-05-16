import * as React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../../Constants/Fonts';
import {hp, wp} from '../../Constants/Responsive';
import {colors} from '../../Constants/Colors';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from '../../Api/ApiCalls';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
export default function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [confPasswordSecure, setConfPasswordSecure] = useState(true);

  const Login = () => {
    if (phoneNumber == '' || password == '') {
      Toast.show('Please add details', Toast.SHORT);
    } else {
      setIndicator(true);
      var data = new FormData();
      data.append('phone', phoneNumber);
      data.append('password', password);
      Auth.login(data)
        .then(async function (response) {
          console.log(response);
          await AsyncStorage.setItem(
            'AuthUser',
            JSON.stringify(response.data.data),
          );
          axios.defaults.headers['Authorization'] = 'Bearer '.concat(
            response?.data?.data?.accessToken || '',
          );
          props.navigation.navigate('BottomNavigator');
        })
        .catch(function (error) {
          console.log(error);
          Toast.show(
            error?.response?.data?.message || 'Error Occured Logging In',
            Toast.SHORT,
          );
        })
        .finally(function () {
          setIndicator(false);
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.continueText}>Sign to Continue</Text>
        <CustomTextInput
          iconName={'mobile-phone'}
          iconType="font-awesome"
          topText="Phone"
          placeholder="Please Enter Number"
          value={phoneNumber}
          onChangeText={t => setPhoneNumber(t)}
          textInputContainer={{marginVertical: hp(2), marginTop: hp(4)}}
          keyboardType="phone-pad"
        />
        <CustomTextInput
          iconName={'lock'}
          iconType="font-awesome"
          placeholder="Please Enter Password"
          topText="Password"
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
        <TouchableOpacity
          style={{width: wp(90), alignItems: 'flex-end'}}
          onPress={() => props.navigation.navigate('ForgotPass')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            btnText="Login"
            indicator={indicator}
            onPress={Login}
            btnContainer={{marginTop: hp(20)}}
          />
          <Text style={styles.orText}>- OR -</Text>
          <CustomButton
            btnText="Register Your Agency"
            indicator={false}
            onPress={() => props.navigation.navigate('RegisterAgency')}
            btnContainer={styles.btnContainer}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  continueText: {fontFamily: fonts.regular, fontSize: hp(2), marginTop: hp(1)},
  welcomeText: {fontFamily: fonts.bold, fontSize: hp(2.5), marginTop: hp(20)},
  btnContainer: {
    backgroundColor: colors.secondary,
  },
  forgotText: {
    color: colors.primary,
    fontSize: hp(1.7),
    fontFamily: fonts.bold,
  },
  orText: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: hp(2.2),
    marginVertical: hp(2),
  },
});
