import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../Components/CustomHeader';
import {colors} from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import {fonts} from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  adCategories,
  cityItem,
  invenCategories,
  plotType,
  purpose,
  sizes,
  // societyItem,
  typeItem,
} from '../../Constants/dummyData';
import CustomDropdown from '../../Components/CustomDropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {Icon} from '@rneui/themed';
import {AppFlow} from '../../Api/ApiCalls';
import axios from 'axios';
import {FlatList} from 'react-native';
import { SafeAreaView } from 'react-native';

export default function AddInventoriesClassified(props) {
  const [inventory, setInventory] = useState(true);
  const [classify, setClassify] = useState(false);
  const [clsTitle, setClsTitle] = useState('');
  const [location, setLocation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [priceLac, setPriceLac] = useState(false);
  const [priceCr, setPriceCr] = useState(false);
  const [priceTh, setPriceTh] = useState(true);
  const [imageUri, setImageUri] = useState([]);
  const [bulkDetails, setBulkDetails] = useState('');
  const [socValue, setSocValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  const [clsTypeValue, setClsTypeValue] = useState();
  const [propPurpose, setpropPurpose] = useState('');
  const [clsProPurpose, setclsProPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [clsCategory, setClsCategory] = useState('');
  const [sizeUnit, setSizeUnit] = useState('Marla');
  const [clsPlotSize, setclsPlotSize] = useState('');
  const [city, setCity] = useState('');
  const [bulk, setBulk] = useState(false);
  const [featuredPaid, setFeaturedPaid] = useState('');
  const [clsBeds, setClsBeds] = useState('');
  const [clsBath, setClsBath] = useState('');
  const [clsFloor, setClsFloor] = useState('');
  const [clsPrice, setClsPrice] = useState('');
  const [clsDetails, setClsDetails] = useState('');
  const [clsAreaType, setClsAreaType] = useState();
  const [indicator, setIndicator] = useState(false);
  const [clsIndicator, setClsIndicator] = useState(false);
  const [inventDataToAdd, setInventDataToAdd] = useState({});
  const [cities, setCities] = useState([]);
  const [societyItem, setSocietyItem] = useState([]);

  const submitClassified = () => {
    if (typeValue == null) {
      Toast.show('Please select type', Toast.SHORT);
    } else if (clsTitle == null) {
      Toast.show('Please Enter Title', Toast.SHORT);
    } else if (clsTypeValue == null) {
      Toast.show('Please Select Type', Toast.SHORT);
    } else if (clsProPurpose == null) {
      Toast.show('Please Select Purpose', Toast.SHORT);
    } else if (clsCategory == null) {
      Toast.show('Please Select Category', Toast.SHORT);
    } else if (clsPlotSize == null) {
      Toast.show('Please Enter Plot Area', Toast.SHORT);
    } else if (clsAreaType == null) {
      Toast.show('Please Select Size Unit', Toast.SHORT);
    } else if (clsPrice == null) {
      Toast.show('Please enter Price', Toast.SHORT);
    } else if (clsDetails == null) {
      Toast.show('Please Enter details', Toast.SHORT);
    } else if (contactNo == '') {
      Toast.show('Please Enter Contact Number', Toast.SHORT);
    } else if (location == '') {
      Toast.show('Please Enter Location', Toast.SHORT);
    } else {
      setClsIndicator(true);
      var clsData = new FormData();
      clsData.append('title', clsTitle);
      clsData.append('type', clsTypeValue);
      clsData.append('category', clsCategory);
      clsData.append('purpose', clsProPurpose);
      clsData.append('bed', clsBeds);
      clsData.append('bath', clsBath);
      clsData.append('floor', clsFloor);
      clsData.append('size', clsPlotSize);
      clsData.append('size_unit', clsAreaType);
      clsData.append('price', clsPrice);
      clsData.append('description', clsDetails);
      clsData.append('location', location);
      clsData.append('number', contactNo);
      if (imageUri.length) {
        imageUri.map(item => {
          clsData?.append('file[]', {
            uri: item?.uri,
            name: item?.fileName,
            type: item?.type,
          });
        });
      }
      console.log('formmm dtata', clsData);
      AppFlow.createClassiffied(clsData)
        .then(function (response) {
          Toast.show('Classified Submited Successfuly', Toast.SHORT);
          props.navigation.navigate('HomeScreen');
          console.log('responseeee', response);
        })
        .catch(function (error) {
          console.log('erorrrr', error);
        })
        .finally(function () {
          setClsIndicator(false);
        });
    }
  };
  useEffect(() => {
    getCities();
  }, []);
  const getCities = async () => {
    setCities([]);
    setSocietyItem([]);
    await AppFlow.getCity()
      .then(res => {
        console.log(res.data);
        setCities(res?.data?.data);
      })
      .catch(error => console.log('error', error))
      .finally(() => {});
  };
  const getSocieties = async city => {
    await AppFlow.getSociety(city.id)
      .then(res => {
        console.log(res.data);
        setSocietyItem(res?.data?.data);
      })
      .catch(error => console.log('error', error))
      .finally(() => {});
  };
  async function submitBulkInventories() {
    if (typeValue == '') {
      Toast.show('Please select type', Toast.SHORT);
    } else if (propPurpose == '') {
      Toast.show('Please select purpose', Toast.SHORT);
    } else if (category == '') {
      Toast.show('Please select category', Toast.SHORT);
    } else if (city == '') {
      Toast.show('Please select city', Toast.SHORT);
    } else if (socValue == '' && socValue != -1) {
      Toast.show('Please select society', Toast.SHORT);
    } else if (socValue == -1 && inventDataToAdd.other == undefined) {
      Toast.show('Please enter society name', Toast.SHORT);
    } else if (bulkDetails == '') {
      Toast.show('Please select bulk details', Toast.SHORT);
    } else if (typeValue == '') {
      Toast.show('Please select type', Toast.SHORT);
    } else {
      setIndicator(true);
      let data = [];
     let errCheck = false
      const bulkNewDetails = bulkDetails.trim();
      const a = bulkNewDetails.split('\n');
      console.log('bulk data length', a);
      if (a.length > 0) {
        for (var i = 0; i < a.length; i++) {
          const item = a[i];
          const itemDetails = item.split(' ');
          console.log('item details', itemDetails);
          if (itemDetails.length != 7) {
            Toast.show('Invalid Format', Toast.SHORT);
            errCheck=true
            setIndicator(false)
            break;
          } else if (itemDetails[4].includes('@') == false) {
            Toast.show('Please Include @ Before Price', Toast.SHORT);
            errCheck=true
            setIndicator(false)
            break;
          } else {
            const priceData = itemDetails[4].split('@')[1];
            const dtaaa = {
              plot_no: itemDetails[0],
              size: itemDetails[1],
              size_unit: itemDetails[2].toLowerCase(),
              block: itemDetails[3],
              price: priceData,
              price_unit: itemDetails[5].toLowerCase(),
              feature: itemDetails[6],
              city_id: city,
              society_id: socValue != -1 ? socValue : null,
              society_other: socValue == -1 ? inventDataToAdd.other : null,
              type: typeValue.toLowerCase(),
              purpose: propPurpose.toLowerCase(),
              category: category.toLowerCase(),
            };
            console.log('responseeee', JSON.stringify(dtaaa, null, 2));
            data.push(dtaaa);
          }
        }
      }
      console.log(data);
      if(errCheck==false){
      axios.defaults.headers['Content-Type'] = 'application/json';
      AppFlow.createEnventory(data)
        .then(function (response) {
          console.log('responseeee', JSON.stringify(response, null, 2));
          Toast.show('Inventory Submited Successfuly', Toast.SHORT);
          props.navigation.navigate('HomeScreen');
        })
        .catch(function (error) {
          console.log('responseeee', JSON.stringify(error, null, 2));
          console.log(error);
        })
        .finally(function () {
          axios.defaults.headers['Content-Type'] = 'multipart/form-data';
          setIndicator(false);
        });}
    }
  }
  async function submitSingleInventory() {
    if (typeValue == '') {
      Toast.show('Please select type', Toast.SHORT);
    } else if (propPurpose == '') {
      Toast.show('Please select purpose', Toast.SHORT);
    } else if (category == '') {
      Toast.show('Please select category', Toast.SHORT);
    } else if (city == '') {
      Toast.show('Please select city', Toast.SHORT);
    } else if (socValue == '' && socValue != -1) {
      Toast.show('Please select society', Toast.SHORT);
    } else if (socValue == -1 && inventDataToAdd.other == undefined) {
      Toast.show('Please enter society name', Toast.SHORT);
    } else if (typeValue == '') {
      Toast.show('Please select type', Toast.SHORT);
    } else if (!inventDataToAdd.propNo) {
      Toast.show('Please Add Property Number', Toast.SHORT);
    } else if (!inventDataToAdd.plotSize) {
      Toast.show('Please Add Property Size', Toast.SHORT);
    } else if (!inventDataToAdd.block) {
      Toast.show('Please Add Block Number', Toast.SHORT);
    } else if (!inventDataToAdd.inventPrice) {
      Toast.show('Please Add Inventory Price', Toast.SHORT);
    } else if (!priceLac && !priceCr && !priceTh) {
      Toast.show('Please Add Inventory Price Unit', Toast.SHORT);
    } else {
      setIndicator(true);
      axios.defaults.headers['Content-Type'] = 'application/json';
      const data = [
        {
          city_id: city,
          society_id: socValue != -1 ? socValue : null,
          society_other: socValue == -1 ? inventDataToAdd?.other : null,
          type: typeValue.toLowerCase(),
          purpose: propPurpose.toLowerCase(),
          category: category.toLowerCase(),
          plot_no: inventDataToAdd?.propNo,
          size: inventDataToAdd?.plotSize,
          size_unit: sizeUnit.toLowerCase(),
          block: inventDataToAdd?.block,
          price: inventDataToAdd?.inventPrice,
          price_unit: priceLac ? 'lac' : priceCr ? 'cr' : 'th',
          feature: featuredPaid,
        },
      ];
      AppFlow.createEnventory(data)
        .then(function (response) {
          console.log('responseeee', JSON.stringify(response, null, 2));
          Toast.show('Inventory Submited Successfuly', Toast.SHORT);
          axios.defaults.headers['Content-Type'] = 'multipart/form-data';
          props.navigation.navigate('HomeScreen');
        })
        .catch(function (error) {
          console.log('responseeee', JSON.stringify(error, null, 2));
          // console.log(error);
        })
        .finally(function () {
          setIndicator(false);
        });
    }
  }
  const openGallery = addSingle => {
    let options = {
      // storageOption: {
      //   path: 'images',
      //   mediaType: 'photo',
      // },
      selectionLimit: addSingle ? 1 : 3,
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
        if (addSingle) {
          const imagesCopy = [...imageUri, response.assets[0]];
          setImageUri(imagesCopy);
        } else {
          if (response.assets.length > 3) {
            Toast.show('You Can Select Upto 3 Images', Toast.SHORT);
          } else {
            setImageUri(response.assets);
          }
        }
      }
    });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <CustomHeader
          headerStyle={styles.headerStyle}
          iconContainer={styles.iconContainer}
          leftIconName="arrow-back"
          leftIconType="material"
          leftIconColor={colors.white}
          leftIconSize={30}
          onLeftIconPress={() => props.navigation.goBack()}
          screenTitle="Add Inventories/Classified"
          screenTitleStyle={styles.screenTitleStyle}
          search={true}
        />
        <View style={styles.invClassBtnContainer}>
          <CustomButton
            btnContainer={
              inventory ? styles.activeBtnStyle : styles.inactiveBtnStyle
            }
            btnText="Inventories"
            btnTextStyles={styles.btnTextStyles}
            onPress={() => {
              setInventory(true), setClassify(false);
            }}
          />
          <CustomButton
            btnContainer={
              classify ? styles.activeBtnStyle : styles.inactiveBtnStyle
            }
            btnText="Classified"
            btnTextStyles={styles.btnTextStyles}
            onPress={() => {
              setInventory(false), setClassify(true);
            }}
          />
        </View>
        {inventory ? (
          <>
            <View>
              <CustomDropdown
                data={cities}
                topLabelText={'City'}
                labelFieldName={'name'}
                valueFieldName={'id'}
                iconType="material"
                iconName="place"
                placeholder={'Select City'}
                value={city}
                onChange={item => {
                  getSocieties(item), setCity(item.id), setSocValue('');
                }}
              />
              <CustomDropdown
                data={[...societyItem, {name: 'Other', id: -1}]}
                topLabelText={'Society'}
                labelFieldName={'name'}
                valueFieldName={'id'}
                placeholder={'Select Society'}
                iconName={'users'}
                iconType="font-awesome"
                value={socValue}
                onChange={item => setSocValue(item.id)}
              />
              {socValue == -1 ? (
                <CustomTextInput
                  textInputContainer={{
                    marginVertical: hp(2),
                    borderRadius: 8,
                  }}
                  topText="Socciety Name"
                  iconType="font-awesome"
                  iconName="users"
                  iconSize={26}
                  placeholder="Enter Society Name"
                  value={inventDataToAdd.other || ''}
                  onChangeText={e => {
                    setInventDataToAdd(prev => {
                      return {...prev, other: e};
                    });
                  }}
                />
              ) : null}
              <CustomDropdown
                data={typeItem}
                topLabelText={'Type'}
                labelFieldName={'label'}
                valueFieldName={'value'}
                iconType="material"
                iconName="merge-type"
                placeholder={'Select Type'}
                value={typeValue}
                onChange={item => setTypeValue(item.value)}
              />
              <CustomDropdown
                data={purpose}
                topLabelText={'Purpose'}
                labelFieldName={'label'}
                valueFieldName={'value'}
                iconType="material"
                iconName="business"
                placeholder={'Select Purpose'}
                value={propPurpose}
                onChange={item => setpropPurpose(item.value)}
              />
              <CustomDropdown
                data={invenCategories}
                topLabelText={'Category'}
                labelFieldName={'label'}
                valueFieldName={'value'}
                iconType="material"
                iconName="category"
                placeholder={'Select Category'}
                value={category}
                onChange={item => setCategory(item.value)}
              />
              {bulk ? (
                <>
                <View>
                <Text style={{...styles.bulkText, color:colors.secondary}}>Format example:</Text>
                <Text style={styles.bulkText}>187 5 Marla B @100 Lac PUP</Text>
                </View>
                  <CustomTextInput
                    topText="Bulk Details"
                    iconType="material"
                    iconName="info"
                    iconSize={26}
                    placeholder="Enter Details in bulk"
                    textInputContainer={styles.textInputContainer}
                    textInputStyles={styles.textInputStyles}
                    iconStyles={styles.iconStyles}
                    multiline={true}
                    textInputView={styles.textInputView}
                    value={bulkDetails}
                    // onChangeText={e => setBulkDetails(e)}
                    onChangeText={e => setBulkDetails(e)}
                  />
                  <View style={{marginTop: hp(2)}}>
                    <Text style={styles.bulkText}>
                      Do you want to upload Single Inventories?
                    </Text>
                    <TouchableOpacity onPress={() => setBulk(false)}>
                      <Text style={{...styles.bulkText, color: colors.primary}}>
                        Click Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <CustomTextInput
                      topText="Prop No."
                      iconType="material"
                      iconName="fullscreen-exit"
                      iconSize={26}
                      placeholder="Prop No."
                      textInputContainer={styles.plNoTxtInpContainer}
                      textInputStyles={styles.plNoTxtInpStyles}
                      textInputView={styles.plNoTxtInpView}
                      valu={inventDataToAdd.propNo || ''}
                      onChangeText={e => {
                        setInventDataToAdd(prev => {
                          return {...prev, propNo: e};
                        });
                      }}
                    />
                    <CustomTextInput
                      topText="Plot size."
                      iconType="material"
                      iconName="fullscreen"
                      iconSize={26}
                      placeholder="Size."
                      textInputContainer={styles.plNoTxtInpContainer}
                      textInputStyles={styles.plNoTxtInpStyles}
                      textInputView={styles.plNoTxtInpView}
                      valu={inventDataToAdd.plotSize || ''}
                      onChangeText={e => {
                        setInventDataToAdd(prev => {
                          return {...prev, plotSize: e};
                        });
                      }}
                    />
                    <CustomDropdown
                      dropdown={styles.sizesDropdown}
                      data={sizes}
                      topLabelText={'Size'}
                      labelFieldName={'label'}
                      valueFieldName={'value'}
                      placeholder={sizeUnit}
                      value={sizeUnit}
                      onChange={item => setSizeUnit(item.value)}
                    />
                  </View>
                  <CustomTextInput
                    textInputContainer={{marginTop: hp(2), borderRadius: 8}}
                    topText="Block"
                    iconType="material"
                    iconName="grid-view"
                    iconSize={26}
                    placeholder="Enter Block"
                    valu={inventDataToAdd.block || ''}
                    onChangeText={e => {
                      setInventDataToAdd(prev => {
                        return {...prev, block: e};
                      });
                    }}
                  />
                  <View style={styles.priceTypeContainer}>
                    <CustomTextInput
                      topText="Price"
                      iconType="material"
                      iconName="local-offer"
                      iconSize={26}
                      placeholder="Enter Price"
                      textInputContainer={styles.priceTextInputContainer}
                      textInputStyles={styles.priceTextInputStyles}
                      textInputView={styles.priceTextInputView}
                      valu={inventDataToAdd.inventPrice || ''}
                      onChangeText={e => {
                        setInventDataToAdd(prev => {
                          return {...prev, inventPrice: e};
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={
                        priceTh
                          ? styles.priceTypeActice
                          : styles.priceTypeInactice
                      }
                      onPress={() => {
                        setPriceTh(true), setPriceCr(false), setPriceLac(false);
                      }}>
                      <Text style={styles.priceTypeTextStyle}>Th</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        priceLac
                          ? styles.priceTypeActice
                          : styles.priceTypeInactice
                      }
                      onPress={() => {
                        setPriceLac(true), setPriceCr(false), setPriceTh(false);
                      }}>
                      <Text style={styles.priceTypeTextStyle}>Lac</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={
                        priceCr
                          ? styles.priceTypeActice
                          : styles.priceTypeInactice
                      }
                      onPress={() => {
                        setPriceCr(true), setPriceLac(false), setPriceTh(false);
                      }}>
                      <Text style={styles.priceTypeTextStyle}>Cr</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: hp(4)}}>
                    <Text>Feature/Paid</Text>
                    <View style={{flexDirection: 'row', marginTop: hp(1)}}>
                      <TouchableOpacity
                        style={
                          featuredPaid == 'PUP'
                            ? styles.priceTypeActice
                            : styles.priceTypeInactice
                        }
                        onPress={() => {
                          featuredPaid != 'PUP'
                            ? setFeaturedPaid('PUP')
                            : setFeaturedPaid('');
                        }}>
                        <Text style={styles.priceTypeTextStyle}>PUP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...(featuredPaid == 'MB'
                            ? styles.priceTypeActice
                            : styles.priceTypeInactice),
                          marginLeft: wp(2),
                        }}
                        onPress={() => {
                          featuredPaid != 'MB'
                            ? setFeaturedPaid('MB')
                            : setFeaturedPaid('');
                        }}>
                        <Text style={styles.priceTypeTextStyle}>MB</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...(featuredPaid == 'CP'
                            ? styles.priceTypeActice
                            : styles.priceTypeInactice),
                          marginLeft: wp(2),
                        }}
                        onPress={() =>
                          featuredPaid != 'CP'
                            ? setFeaturedPaid('CP')
                            : setFeaturedPaid('')
                        }>
                        <Text style={styles.priceTypeTextStyle}>CP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...(featuredPaid == 'FP'
                            ? styles.priceTypeActice
                            : styles.priceTypeInactice),
                          marginLeft: wp(2),
                        }}
                        onPress={() =>
                          featuredPaid != 'FP'
                            ? setFeaturedPaid('FP')
                            : setFeaturedPaid('')
                        }>
                        <Text style={styles.priceTypeTextStyle}>FP</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...(featuredPaid == 'Open'
                            ? styles.priceTypeActice
                            : styles.priceTypeInactice),
                          marginLeft: wp(2),
                        }}
                        onPress={() =>
                          featuredPaid != 'Open'
                            ? setFeaturedPaid('Open')
                            : setFeaturedPaid('')
                        }>
                        <Text style={styles.priceTypeTextStyle}>Open</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{marginTop: hp(2)}}>
                    <Text style={styles.bulkText}>
                      Do you want to upload Inventories in Bulk?
                    </Text>
                    <TouchableOpacity onPress={() => setBulk(true)}>
                      <Text style={{...styles.bulkText, color: colors.primary}}>
                        Click Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              <CustomButton
                btnContainer={{
                  ...styles.submitBtnContainer,
                  alignSelf: 'center',
                }}
                disabled={indicator}
                btnText="Submit"
                btnTextStyles={styles.btnTextStyles}
                indicator={indicator}
                onPress={bulk ? submitBulkInventories : submitSingleInventory}
              />
            </View>
          </>
        ) : (
          <View>
            <View style={styles.photoContainer}>
              {imageUri.length > 0 ? (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(4),
                  }}>
                  <FlatList
                    data={imageUri}
                    horizontal={true}
          
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    ListFooterComponent={() => {
                      if (imageUri.length < 3) {
                        return (
                          <TouchableOpacity
                            style={{alignSelf: 'center'}}
                            onPress={() => {
                              openGallery(true);
                            }}>
                            <Icon
                              name="add"
                              type="material"
                              reverse
                              size={15}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        );
                      } else {
                        return null;
                      }
                    }}
                    renderItem={({item, index}) => {
                      return (
                        <ImageBackground
                          source={{
                            uri: item.uri,
                          }}
                          style={{
                            width: wp(25),
                            height: hp(18),
                            borderRadius: 8,
                          }}
                          imageStyle={{borderRadius: 8}}
                          resizeMode="contain">
                          <TouchableOpacity
                            style={styles.delIconContainer}
                            onPress={() => {
                              const imagesCopy = [...imageUri];
                              imagesCopy.splice(index, 1);
                              setImageUri(imagesCopy);
                            }}>
                            <Icon
                              type="material"
                              name="delete"
                              size={25}
                              color={colors.primary}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                      );
                    }}
                  />
                </View>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      openGallery();
                    }}>
                    <Icon
                      type="material"
                      name="collections"
                      size={50}
                      color={colors.grey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.insertPhotoText}>Insert Cover Photo</Text>
                </>
              )}
            </View>
            {/* <CustomDropdown
              // data={()=>{}}
              topLabelText={'Location'}
              labelFieldName={'label'}
              valueFieldName={'value'}
              iconType="material"
              iconName="place"
              placeholder={'Select Location'}
              container={{marginTop: hp(4)}}
            /> */}

            <CustomTextInput
              textInputContainer={{
                marginTop: hp(4),
                height: hp(7),
                borderRadius: 8,
              }}
              topText="Title."
              iconType="material"
              iconName="title"
              iconSize={26}
              placeholder="Enter plot title"
              value={clsTitle}
              onChangeText={item => setClsTitle(item)}
            />
            <CustomTextInput
              textInputContainer={{
                marginTop: hp(4),
                height: hp(7),
                borderRadius: 8,
              }}
              topText="Location"
              iconType="material"
              iconName="location-pin"
              iconSize={26}
              placeholder="Enter Location"
              value={location}
              onChangeText={item => setLocation(item)}
            />
            <CustomTextInput
              textInputContainer={{
                marginTop: hp(4),
                height: hp(7),
                borderRadius: 8,
              }}
              topText="Contact"
              iconType="material"
              iconName="phone"
              iconSize={26}
              placeholder="Enter Contact Number"
              value={contactNo}
              onChangeText={item => setContactNo(item)}
            />
            <CustomDropdown
              container={{marginTop: hp(4)}}
              data={typeItem}
              topLabelText={'Type'}
              labelFieldName={'label'}
              valueFieldName={'value'}
              iconType="material"
              iconName="merge-type"
              placeholder={'Select Type'}
              value={clsTypeValue}
              onChange={item => setClsTypeValue(item.value)}
            />
            <CustomDropdown
              container={{marginTop: hp(2.5)}}
              data={purpose}
              topLabelText={'Purpose'}
              labelFieldName={'label'}
              valueFieldName={'value'}
              iconType="material"
              iconName="business"
              placeholder={'Select Purpose'}
              value={clsProPurpose}
              onChange={item => setclsProPurpose(item.value)}
            />
            <CustomDropdown
              container={{marginTop: hp(2.5)}}
              data={invenCategories}
              topLabelText={'Category'}
              labelFieldName={'label'}
              valueFieldName={'value'}
              iconType="material"
              iconName="category"
              placeholder={'Select Category'}
              value={clsCategory}
              onChange={item => setClsCategory(item.value)}
            />

            {clsCategory == 'House' || clsCategory == 'Apartment' ? (
              <View style={styles.amenitiesMainContainer}>
                <CustomTextInput
                  topText="Beds"
                  iconType="font-awesome"
                  iconName="bed"
                  iconSize={20}
                  placeholder="Beds"
                  textInputContainer={styles.amenitiesContainer}
                  textInputStyles={styles.amenitiesInputStyles}
                  textInputView={styles.amenitiesInputView}
                  keyboardType={'number-pad'}
                  value={clsBeds}
                  onChangeText={t => setClsBeds(t)}
                />
                <CustomTextInput
                  topText="Bath"
                  iconType="font-awesome"
                  iconName="bath"
                  iconSize={20}
                  placeholder="Baths"
                  textInputContainer={styles.amenitiesContainer}
                  textInputStyles={styles.amenitiesInputStyles}
                  textInputView={styles.amenitiesInputView}
                  keyboardType={'number-pad'}
                  value={clsBath}
                  onChangeText={t => setClsBath(t)}
                />
                {console.log(clsBath, clsBeds, clsFloor, clsPlotSize)}
                <CustomTextInput
                  topText="Floor"
                  iconType="material-community"
                  iconName="floor-plan"
                  iconSize={20}
                  placeholder="Floor"
                  textInputContainer={styles.amenitiesContainer}
                  textInputStyles={styles.amenitiesInputStyles}
                  textInputView={styles.amenitiesInputView}
                  keyboardType={'number-pad'}
                  value={clsFloor}
                  onChangeText={t => setClsFloor(t)}
                />
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: hp(1),
              }}>
              <CustomDropdown
                // container={{marginTop: hp(4)}}
                dropdown={{
                  ...styles.sizesDropdown,
                  width: wp(60),
                  height: hp(8),
                }}
                data={sizes}
                topLabelText={'Size'}
                labelFieldName={'label'}
                valueFieldName={'value'}
                iconType="material"
                iconName="fullscreen"
                placeholder={'Select Size'}
                value={clsAreaType}
                onChange={item => setClsAreaType(item.value)}
              />
              <CustomTextInput
                topText="Area"
                iconType="material-community"
                iconName="floor-plan"
                iconSize={20}
                placeholder="Area"
                textInputContainer={styles.amenitiesContainer}
                textInputStyles={styles.amenitiesInputStyles}
                textInputView={styles.amenitiesInputView}
                keyboardType={'number-pad'}
                value={clsPlotSize}
                onChangeText={t => setclsPlotSize(t)}
              />
            </View>
            <CustomTextInput
              textInputContainer={styles.prcTxtInpContainer}
              topText="Price."
              iconType="material"
              iconName="local-offer"
              iconSize={26}
              placeholder="Enter Price"
              keyboardType={'number-pad'}
              value={clsPrice}
              onChangeText={t => setClsPrice(t)}
            />
            <CustomTextInput
              topText="Details"
              iconType="material"
              iconName="info"
              iconSize={26}
              placeholder="Enter Details"
              textInputContainer={styles.textInputContainer}
              textInputStyles={styles.textInputStyles}
              iconStyles={styles.iconStyles}
              multiline={true}
              textInputView={styles.textInputView}
              value={clsDetails}
              onChangeText={t => setClsDetails(t)}
            />
            <CustomButton
              btnContainer={{...styles.submitBtnContainer, alignSelf: 'center'}}
              btnText="Submit"
              btnTextStyles={styles.btnTextStyles}
              indicator={clsIndicator}
              onPress={submitClassified}
              disabled={clsIndicator}
            />
          </View>
        )}

        <View style={{height: hp(8)}}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: colors.tertiary,
  },
  headerStyle: {
    width: wp(100),
    height: hp(12),
    backgroundColor: colors.primary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    marginTop: hp(4),
  },
  screenTitleStyle: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.4),
    color: colors.white,
  },
  invClassBtnContainer: {
    flexDirection: 'row',
    width: wp(80),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(3),
  },
  activeBtnStyle: {
    width: wp(36),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  btnTextStyles: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.5),
    color: colors.white,
  },
  inactiveBtnStyle: {
    width: wp(36),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    borderRadius: 5,
  },

  textInputContainer: {
    width: wp(90),
    height: hp(8),
    justifyContent: 'flex-start',
    paddingHorizontal: wp(5),
    borderRadius: 5,
    borderWidth: 1,
    marginTop: hp(3),
    height: hp(30),
  },
  textInputStyles: {
    width: wp(78),
    fontFamily: fonts.regular,
    textAlignVertical: 'top',
    marginTop: hp(-1),
  },
  textInputView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp(2),
  },
  submitBtnContainer: {
    width: wp(36),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: hp(6),
  },
  priceTextInputContainer: {
    width: wp(50),
    height: hp(8),
    justifyContent: 'flex-start',
    paddingHorizontal: wp(5),
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTextInputStyles: {
    width: wp(34),
    fontFamily: fonts.regular,
  },
  priceTextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'space-between',
    marginTop: hp(3.5),
  },
  priceTypeActice: {
    width: wp(10),
    // height: hp(5),
    aspectRatio:1,
    borderRadius: hp(5),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTypeInactice: {
    width: wp(10),
    aspectRatio:1,
    borderRadius: hp(5),
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTypeTextStyle: {
    fontFamily: fonts.semiBold,
    fontSize: hp(1.5),
    color: colors.white,
  },
  photoContainer: {
    width: wp(90),
    height: hp(20),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  insertPhotoText: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.5),
    color: colors.black,
    marginTop: hp(2),
  },
  fileNameStyle: {
    fontFamily: fonts.medium,
    fontSize: hp(2),
    color: colors.grey,
  },
  amenitiesMainContainer: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  amenitiesContainer: {
    width: wp(28),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: wp(2),
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  amenitiesInputStyles: {
    width: wp(18),
    fontFamily: fonts.regular,
  },
  amenitiesInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width:wp(25),

  },
  plNoTxtInpContainer: {
    width: wp(30),
    height: hp(7),
    justifyContent: 'flex-start',
    paddingHorizontal: wp(2),
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plNoTxtInpStyles: {
    width: wp(20),
    fontFamily: fonts.regular,
  },
  plNoTxtInpView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizesDropdown: {
    height: hp(7),
    width: wp(25),
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  delIconContainer: {
    position: 'absolute',
    right: wp(2),
    bottom: hp(1),
    backgroundColor: colors.white,
    borderRadius: hp(2),
    padding: 2,
  },
  prcTxtInpContainer: {
    marginTop: hp(2),
    height: hp(7),
    borderRadius: 8,
  },
  bulkText: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2),
    color: colors.grey,
  },
  bulkText:{
    fontFamily:fonts.medium,
    fontSize:12,
    color:colors.grey
  }
});
