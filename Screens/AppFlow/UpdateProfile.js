import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableOpacityBase,
  Image,
  ToastAndroid,
} from 'react-native';
import {colors} from '../../Constants/Colors';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../../Constants/Responsive';
import {fonts} from '../../Constants/Fonts';
import {societyItem} from '../../Constants/dummyData';
import {AppFlow, Auth} from '../../Api/ApiCalls';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import CustomDropdown from '../../Components/CustomDropdown';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function UpdateProfile(props) {
  const {data, agencyImage} = props?.route?.params;
  useEffect(() => {
    // getAgencyDetail();
  }, []);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [newTeam, setNewTeam] = useState([]);
  const [deletedTeam, setDeletedTeam] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const [logoUri, setLogoUri] = useState({uri: ''});
  const [dataToSend, setDataToSend] = useState(data || {});
  const [logoFileName, setLogoFileName] = useState(
    data?.file?.length ? 'https://ittelaapp.com/' + data.file[0].file : '',
  );
  const openLogoGallery = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response =', response);
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else if (response.btnClick) {
        console.log('User Click button', response.btnClick);
      } else {
        const source = {uri: 'data:image/jpeg;base64' + response.assets};
        console.log('This is URI', response.assets[0].uri);
        setLogoFileName(response.assets[0].uri);
        setLogoUri(response.assets[0]);
      }
    });
  };
  console.log('Logo uri===>>', logoUri);

  const Register = () => {
    if (dataToSend?.agencyName == '') {
      Toast.show('Please Enter agency name', Toast.SHORT);
    } else if (dataToSend?.userName == '') {
      Toast.show('Please Enter your name', Toast.SHORT);
    } else if (dataToSend?.phone == '') {
      Toast.show('Please Enter phone number', Toast.SHORT);
    } else if (dataToSend?.society == '') {
      Toast.show('Please select society', Toast.SHORT);
    } else if (dataToSend?.email == '') {
      Toast.show('Please Enter Email', Toast.SHORT);
    } else if (logoFileName == '') {
      Toast.show('Please select Logo', Toast.SHORT);
    } else {
      setIndicator(true);
      var data = new FormData();
      data.append('agency_name', dataToSend?.agency_name);
      data?.append('name', dataToSend?.name);
      data?.append('designation', dataToSend?.designation || '');
      data?.append('phone', dataToSend?.phone);
      data?.append('society', dataToSend?.society);
      data?.append('address', dataToSend?.address || '');
      data?.append('ceo_name', dataToSend?.ceo_name || '');
      data?.append(
        'ceo_mobile1',
        dataToSend?.ceo_mobile1 && dataToSend?.ceo_mobile1 != 'null'
          ? dataToSend.ceo_mobile1
          : '',
      );
      data?.append(
        'ceo_mobile2',
        dataToSend?.ceo_mobile2 && dataToSend?.ceo_mobile2 != 'null'
          ? dataToSend.ceo_mobile2
          : '',
      );
      data?.append(
        'landline',
        dataToSend?.landline && dataToSend?.landline != 'null'
          ? dataToSend.landline
          : '',
      );
      data?.append(
        'whatapp_no',
        dataToSend?.whatapp_no && dataToSend?.whatapp_no != 'null'
          ? dataToSend.whatapp_no
          : '',
      );
      data?.append(
        'email',
        dataToSend?.email && dataToSend?.email != 'null'
          ? dataToSend.email
          : '',
      );
      data?.append(
        'fax',
        dataToSend?.fax && dataToSend?.fax != 'null' ? dataToSend.fax : '',
      );
      data?.append(
        'facebook',
        dataToSend?.facebook && dataToSend?.facebook != 'null'
          ? dataToSend.facebook
          : '',
      );
      data?.append(
        'youtube',
        dataToSend?.youtube && dataToSend?.youtube != 'null'
          ? dataToSend.youtube
          : '',
      );
      data?.append(
        'twitter',
        dataToSend?.twitter && dataToSend?.twitter != 'null'
          ? dataToSend.twitter
          : '',
      );
      data?.append(
        'instagram',
        dataToSend?.instagram && dataToSend?.instagram != 'null'
          ? dataToSend.instagram
          : '',
      );
      data?.append(
        'message',
        dataToSend?.message && dataToSend?.message != 'null'
          ? dataToSend.message
          : '',
      );
      data?.append(
        'website',
        dataToSend?.website && dataToSend?.website != 'null'
          ? dataToSend.website
          : '',
      );
      data?.append(
        'about',
        dataToSend?.about && dataToSend?.about != 'null'
          ? dataToSend.about
          : '',
      );
      if (logoUri?.uri && logoUri?.uri != '') {
        data.append('agency_photo[]', {
          uri: logoUri?.uri,
          name: logoUri?.fileName,
          type: logoUri?.type,
        });
      }
      if (newTeam.length > 0) {
        data.append('team_create', JSON.stringify(newTeam));
      }
      if (deletedTeam.length > 0) {
        data.append('team_delete', JSON.stringify(deletedTeam));
      }
      var updatedTeam = [];
      dataToSend.team.length > 0
        ? dataToSend.team.map(item => {
            if (item.updated == true) {
              updatedTeam.push({
                id: item.id,
                name: item.name,
                phone: item.phone,
                whatsapp_no: item.whatsapp_no,
              });
            }
          })
        : 0;
      if (updatedTeam.length > 0) {
        data.append('team_update', JSON.stringify(updatedTeam));
      }
      axios.defaults.headers['Content-Type'] = 'multipart/form-data';
      Auth.editAgencyData(data)
        .then(async function (response) {
          console.log(
            'Success updating',
            JSON.stringify(response, null, 2),
            // response,
          );
          const userData = await AsyncStorage.getItem('AuthUser');
          const parsedData = JSON.parse(userData);
          const data = {
            ...parsedData,
            ...response?.data?.data,
            ...response?.data?.data?.agency,
          };
          // console.log('new async user', JSON.stringify(data, null, 2));
          await AsyncStorage.setItem('AuthUser', JSON.stringify(data));
          Toast.show('Profile Updated Successfully', Toast.SHORT);
          props.navigation.navigate('BottomNavigator');
        })
        .catch(function (error) {
          console.log(
            'error registering agency',
            JSON.stringify(error, null, 2),
            // error,
          );
          Toast.show(
            error?.response?.data?.message || 'Error Occured Creating',
            Toast.SHORT,
          );
        })
        .finally(function () {
          setIndicator(false);
        });
    }
  };
  console.log(JSON.stringify(dataToSend, null, 2));
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{alignSelf: 'flex-start'}}>
            <Icon
              name={'arrow-left'}
              type={'font-awesome'}
              reverse
              color={colors.primary}
              size={hp(2)}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Register Your Agency</Text>
          <Text style={styles.registerText}>
            Register your agency to be featured in the app
          </Text>
          <View style={styles.pageNumberView}>
            {[0, 1, 2, 3].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setselectedIndex(index)}
                  style={[
                    styles.countingBtn,
                    {
                      backgroundColor:
                        selectedIndex == index
                          ? colors.primary
                          : colors.tertiary,
                    },
                  ]}>
                  <Text
                    style={{
                      color:
                        selectedIndex == index
                          ? colors.white
                          : colors.secondary,
                      fontFamily: fonts.regular,
                      fontSize: hp(2.2),
                    }}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {selectedIndex == 0 ? (
            <>
              <CustomTextInput
                iconName={'home-city-outline'}
                iconType="material-community"
                topText="Agency Name"
                placeholder="Enter Agency Name"
                value={
                  dataToSend?.agency_name != 'null'
                    ? dataToSend.agency_name
                    : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, agency_name: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
              />
              <CustomTextInput
                iconName={'user-plus'}
                iconType="font-awesome"
                topText="Designation"
                placeholder="Enter Designation"
                value={
                  dataToSend?.designation != 'null'
                    ? dataToSend.designation
                    : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, designation: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'phone'}
                iconType="font-awesome"
                topText="Phone"
                placeholder="Enter Phone"
                value={dataToSend?.phone != 'null' ? dataToSend.phone : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, phone: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
                editable={true}
                keyboardType="phone-pad"
              />

              <CustomTextInput
                iconName={'location-pin'}
                iconType="entypo"
                topText="Address"
                placeholder="Enter Address"
                value={dataToSend?.address != 'null' ? dataToSend.address : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, address: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
              />
            </>
          ) : selectedIndex == 1 ? (
            <>
              <CustomTextInput
                iconName={'home-city-outline'}
                iconType="material-community"
                topText="CEO Name"
                placeholder="Enter CEO Name"
                value={
                  dataToSend?.ceo_name != 'null' ? dataToSend.ceo_name : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, ceo_name: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
              />
              <CustomTextInput
                iconName={'user'}
                iconType="font-awesome"
                topText="CEO Mobile #1"
                placeholder="Enter CEO Mobile #1"
                value={
                  dataToSend?.ceo_mobile1 != 'null'
                    ? dataToSend.ceo_mobile1
                    : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, ceo_mobile1: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
                keyboardType="phone-pad"
              />
              <CustomTextInput
                iconName={'user-plus'}
                iconType="font-awesome"
                topText="CEO Mobile #2"
                placeholder="Enter CEO Mobile #2"
                value={
                  dataToSend?.ceo_mobile2 != 'null'
                    ? dataToSend.ceo_mobile2
                    : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, ceo_mobile2: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
                keyboardType="phone-pad"
              />
              {dataToSend?.team?.map((item, index) => {
                const even = index % 2;
                return (
                  <View
                    style={{
                      backgroundColor:
                        even == 0 ? colors.white : colors.tertiary,
                      width: wp(100),
                      alignItems: 'center',
                    }}
                    key={index}>
                    <CustomTextInput
                      iconName={'user-plus'}
                      iconType="font-awesome"
                      topText={`Member ${index + 1} Name`}
                      placeholder={`Member ${index + 1} Name`}
                      value={item?.name || ''}
                      onChangeText={t => {
                        const newTeam = {
                          ...dataToSend,
                        };
                        newTeam.team[index].name = t;
                        newTeam.team[index].updated = true;
                        setDataToSend(newTeam);
                      }}
                      textInputContainer={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                        marginVertical: hp(2),
                      }}
                      iconSize={hp(3.5)}
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <CustomTextInput
                      iconName={'phone'}
                      iconType="font-awesome"
                      topText={`Member ${index + 1} Number`}
                      placeholder={`Member ${index + 1} Number`}
                      value={item?.phone || ''}
                      onChangeText={t => {
                        const newTeam = {
                          ...dataToSend,
                        };
                        newTeam.team[index].phone = t;
                        newTeam.team[index].updated = true;
                        setDataToSend(newTeam);
                      }}
                      textInputContainer={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                        marginVertical: hp(2),
                      }}
                      iconSize={hp(3.5)}
                      keyboardType="phone-pad"
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <CustomTextInput
                      iconName={'whatsapp'}
                      iconType="font-awesome"
                      topText={`Member ${index + 1} whatsapp`}
                      placeholder={`Member ${index + 1} Whatsapp`}
                      value={item?.whatsapp_no || ''}
                      onChangeText={t => {
                        const newTeam = {
                          ...dataToSend,
                        };
                        newTeam.team[index].whatsapp_no = t;
                        newTeam.team[index].updated = true;
                        setDataToSend(newTeam);
                      }}
                      textInputContainer={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                        marginVertical: hp(2),
                      }}
                      iconSize={hp(3.5)}
                      keyboardType="phone-pad"
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setDeletedTeam([
                          ...deletedTeam,
                          {id: dataToSend?.team[index].id},
                        ]);
                        const newTeam = dataToSend?.team?.filter(
                          (item, indexFilter) => index != indexFilter,
                        );
                        setDataToSend({...dataToSend, team: newTeam});
                      }}>
                      <Icon
                        name={'minus'}
                        type={'font-awesome'}
                        color={colors.primary}
                        size={hp(2)}
                        reverse
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              {newTeam.map((item, index) => {
                const even = index % 2;
                return (
                  <View
                    style={{
                      backgroundColor:
                        even == 0 ? colors.white : colors.tertiary,
                      width: wp(100),
                      alignItems: 'center',
                    }}
                    key={index}>
                    <CustomTextInput
                      iconName={'user-plus'}
                      iconType="font-awesome"
                      topText={`New Member ${index + 1} Name`}
                      placeholder={`Member ${index + 1} Name`}
                      value={newTeam[index].name || ''}
                      onChangeText={t => {
                        const copyTeam = [...newTeam];
                        copyTeam[index].name = t;
                        setNewTeam(copyTeam);
                      }}
                      textInputContainer={{marginVertical: hp(2)}}
                      iconSize={hp(3.5)}
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <CustomTextInput
                      iconName={'phone'}
                      iconType="font-awesome"
                      topText={`New Member ${index + 1} Number`}
                      placeholder={`Member ${index + 1} Number`}
                      value={newTeam[index].phone || ''}
                      onChangeText={t => {
                        const copyTeam = [...newTeam];
                        copyTeam[index].phone = t;
                        setNewTeam(copyTeam);
                      }}
                      textInputContainer={{marginVertical: hp(2)}}
                      iconSize={hp(3.5)}
                      keyboardType="phone-pad"
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <CustomTextInput
                      iconName={'whatsapp'}
                      iconType="font-awesome"
                      topText={`New Member ${index + 1} whatsapp`}
                      placeholder={`Member ${index + 1} Whatsapp`}
                      value={newTeam[index].whatsapp_no || ''}
                      onChangeText={t => {
                        const copyTeam = [...newTeam];
                        copyTeam[index].whatsapp_no = t;
                        setNewTeam(copyTeam);
                      }}
                      textInputContainer={{marginVertical: hp(2)}}
                      iconSize={hp(3.5)}
                      keyboardType="phone-pad"
                      inputHeading={{
                        backgroundColor:
                          even == 0 ? colors.white : colors.tertiary,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const copyTeam = newTeam.filter(
                          (item, indexFilter) => index != indexFilter,
                        );
                        setNewTeam(copyTeam);
                      }}>
                      <Icon
                        name={'minus'}
                        type={'font-awesome'}
                        color={colors.primary}
                        size={hp(2)}
                        reverse
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() =>
                  setNewTeam([...newTeam, {name: '', number: '', whatsapp: ''}])
                }>
                <Icon
                  name={'plus'}
                  type={'font-awesome'}
                  color={colors.primary}
                  size={hp(2)}
                  reverse
                />
              </TouchableOpacity>
              <CustomTextInput
                iconName={'phone'}
                iconType="font-awesome"
                topText="Landline"
                placeholder="Enter landline"
                value={
                  dataToSend?.landline != 'null' ? dataToSend.landline : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, landline: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
                keyboardType="phone-pad"
              />
              <CustomTextInput
                iconName={'whatsapp'}
                iconType="font-awesome"
                topText="Whatsapp"
                placeholder="Enter Whatsapp"
                value={
                  dataToSend?.whatapp_no != 'null' ? dataToSend.whatapp_no : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, whatapp_no: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(4)}
                keyboardType="phone-pad"
              />
              <CustomTextInput
                iconName={'mail-bulk'}
                iconType="font-awesome-5"
                topText="Email"
                placeholder="Enter Email"
                value={dataToSend?.email != 'null' ? dataToSend.email : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, email: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
                keyboardType="email-address"
                editable={true}
              />
              <CustomTextInput
                iconName={'fax'}
                iconType="font-awesome"
                topText="Fax"
                placeholder="Enter Fax"
                value={dataToSend?.fax != 'null' ? dataToSend.fax : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, fax: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
            </>
          ) : selectedIndex == 2 ? (
            <>
              <Text style={styles.subHeading}>Social Links</Text>
              <CustomTextInput
                iconName={'facebook-official'}
                iconType="font-awesome"
                topText="Facebook"
                placeholder="Enter Facebook"
                value={
                  dataToSend?.facebook != 'null' ? dataToSend.facebook : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, facebook: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'youtube-play'}
                iconType="font-awesome"
                topText="YouTube"
                placeholder="Enter YouTube"
                value={dataToSend?.youtube != 'null' ? dataToSend.youtube : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, youtube: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'twitter-square'}
                iconType="font-awesome"
                topText="Twitter"
                placeholder="Enter Twitter"
                value={dataToSend?.twitter != 'null' ? dataToSend.twitter : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, twitter: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'instagram'}
                iconType="font-awesome"
                topText="Instagram"
                placeholder="Enter Instagram"
                value={
                  dataToSend?.instagram != 'null' ? dataToSend.instagram : ''
                }
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, instagram: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <Text style={styles.subHeading}>Other</Text>
              <CustomTextInput
                iconName={'envelope-open-text'}
                iconType="font-awesome-5"
                topText="Message"
                placeholder="Enter Message"
                value={dataToSend?.message != 'null' ? dataToSend.message : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, message: t};
                  })
                }
                textInputContainer={{
                  marginVertical: hp(2),
                  height: hp(20),
                }}
                textInputStyles={{textAlignVertical: 'top', height: hp(18)}}
                iconStyles={{marginBottom: hp(12)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'web-check'}
                iconType="material-community"
                topText="Website"
                placeholder="Enter Website"
                value={dataToSend?.website != 'null' ? dataToSend.website : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, website: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
              <CustomTextInput
                iconName={'info-circle'}
                iconType="font-awesome"
                topText="About"
                placeholder="Enter About"
                value={dataToSend?.about != 'null' ? dataToSend.about : ''}
                onChangeText={t =>
                  setDataToSend(prev => {
                    return {...prev, about: t};
                  })
                }
                textInputContainer={{marginVertical: hp(2)}}
                iconSize={hp(3.5)}
              />
            </>
          ) : (
            <View style={styles.imagesMainView}>
              <TouchableOpacity
                style={styles.imageContainerView}
                onPress={() => {
                  openLogoGallery();
                }}>
                {logoFileName && logoFileName != '' ? (
                  <Image
                    source={{uri: logoFileName}}
                    style={styles.imageStyle}
                    resizeMode="contain"
                  />
                ) : (
                  <>
                    <Icon
                      name={'file-image-o'}
                      type="font-awesome"
                      color={colors.primary}
                      size={hp(5)}
                      style={props.iconStyles}
                    />
                    <Text style={styles.imageText}>Agency Logo</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.pageNumberView}>
          <CustomButton
            btnText="Previous"
            indicator={false}
            onPress={() =>
              selectedIndex > 0 ? setselectedIndex(selectedIndex - 1) : null
            }
            btnContainer={styles.btnContainer}
          />
          <CustomButton
            btnText="Next"
            indicator={false}
            onPress={() =>
              selectedIndex < 3 ? setselectedIndex(selectedIndex + 1) : null
            }
            btnContainer={styles.btnContainer2}
            btnTextStyles={{color: colors.black}}
          />
        </View>
        {selectedIndex == 3 ? (
          <CustomButton
            btnText="Submit"
            indicator={indicator}
            onPress={Register}
            btnContainer={styles.submitBtn}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  btnContainer: {
    width: wp(30),
  },
  heading: {
    color: colors.primary,
    fontSize: hp(2.5),
    fontFamily: fonts.bold,
  },
  registerText: {
    color: colors.secondary,
    fontSize: hp(1.8),
    fontFamily: fonts.regular,
  },
  subHeading: {
    width: wp(90),
    fontFamily: fonts.bold,
    color: colors.black,
  },
  countingBtn: {
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  pageNumberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    marginVertical: hp(2),
  },
  imagesMainView: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainerView: {
    borderWidth: 1,
    borderRadius: 5,
    width: wp(35),
    height: wp(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(3),
  },
  imageStyle: {
    borderWidth: 1,
    borderRadius: 5,
    width: wp(30),
    height: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(3),
  },
  imageText: {fontFamily: fonts.regular, fontSize: hp(2), color: colors.grey},
  btnContainer2: {
    width: wp(30),
    backgroundColor: colors.tertiary,
  },
  imageFileName: {
    fontFamily: fonts.regular,
    fontSize: hp(1.5),
    color: colors.grey,
  },

  submitBtn: {
    width: wp(90),
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: hp(10),
  },
});
