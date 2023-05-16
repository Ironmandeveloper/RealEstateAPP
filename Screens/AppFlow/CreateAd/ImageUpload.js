import {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomLoader from '../../../Components/CustomLoader';
import {Icon} from '@rneui/base';
import {hp, wp} from '../../../Constants/Responsive';
import {colors} from '../../../Constants/Colors';
import {fonts} from '../../../Constants/Fonts';
import CustomButton from '../../../Components/CustomButton';

export default function ImageUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageType, setImageType] = useState('');
  const [inventoryImage, setInventoryImage] = useState({});
  const [logoImage, setLogoImage] = useState({});
  const openGallery = () => {
    let options = {
      selectionLimit: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else if (response.btnClick) {
        console.log('User Click button', response.btnClick);
      } else {
        console.log('Response =', response);
        const file = response.assets[0];
        if (imageType == 'inventory') {
          setInventoryImage(file);
        } else {
          setLogoImage(file);
        }
      }
      setModalVisible(false);
    });
  };
  const openCamera = () => {
    let options = {
      selectionLimit: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error', response.error);
      } else if (response.btnClick) {
        console.log('User Click button', response.btnClick);
      } else {
        console.log('Response =', response);
        const file = response.assets[0];
        if (imageType == 'inventory') {
          setInventoryImage(file);
        } else {
          setLogoImage(file);
        }
      }
      setModalVisible(false);
    });
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomLoader isLoading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon
                name={'arrow-back-circle'}
                type={'ionicon'}
                color={colors.primary}
                size={hp(5)}
              />
            </TouchableOpacity>
            <Text style={styles.headingText}>Create Ad</Text>
            <View style={{width: hp(5)}}></View>
          </View>
          <Text style={styles.stepText}>Add Image: Step 2</Text>
          <Text style={styles.uploadText}>Upload Inventory Image</Text>
          <TouchableOpacity
            style={styles.selectImage}
            onPress={() => {
              setModalVisible(true), setImageType('inventory');
            }}>
            {inventoryImage?.uri ? (
              <>
                <Image
                  source={{uri: inventoryImage.uri}}
                  style={{height: hp(25), width: wp(90)}}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => setInventoryImage({})}>
                  <Icon
                    name={'close'}
                    type={'material'}
                    color={colors.black}
                    size={hp(1.5)}
                    reverse
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Icon
                  name={'cloud-upload'}
                  type={'ionicon'}
                  color={colors.primary}
                  size={hp(5)}
                />
                <Text style={styles.fileText}>File Supported JPG,JPEG</Text>
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Agency Logo</Text>
          <TouchableOpacity
            style={styles.selectImage}
            onPress={() => {
              setModalVisible(true), setImageType('camera');
            }}>
            {logoImage?.uri ? (
              <>
                <Image
                  source={{uri: logoImage.uri}}
                  style={{height: hp(25), width: wp(90)}}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => setInventoryImage({})}>
                  <Icon
                    name={'close'}
                    type={'material'}
                    color={colors.black}
                    size={hp(1.5)}
                    reverse
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Icon
                  name={'cloud-upload'}
                  type={'ionicon'}
                  color={colors.primary}
                  size={hp(5)}
                />
                <Text style={styles.fileText}>File Supported JPG,Png</Text>
              </>
            )}
          </TouchableOpacity>
          <CustomButton
            btnContainer={{...styles.submitBtnContainer, alignSelf: 'center'}}
            btnText="Next"
            btnTextStyles={styles.btnTextStyles}
            indicator={false}
            onPress={() => props.navigation.navigate('AddAgencyDetails')}
            disabled={false}
          />
        </View>
      </ScrollView>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.bottomSheet}>
          <TouchableOpacity
            style={styles.bottomButtons}
            onPress={() => openCamera()}>
            <Icon
              name={'add-a-photo'}
              type={'material'}
              color={colors.black}
              size={hp(2)}
              reverse
            />
            <Text style={styles.bottomSheetText}>Photo Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButtons}
            onPress={() => openGallery()}>
            <Icon
              name={'add-photo-alternate'}
              type={'material'}
              color={colors.black}
              size={hp(2)}
              reverse
            />
            <Text style={styles.bottomSheetText}>Photo Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomButtons}
            onPress={() => setModalVisible(false)}>
            <Icon
              name={'close'}
              type={'material'}
              color={colors.black}
              size={hp(2)}
              reverse
            />
            <Text style={styles.bottomSheetText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    marginVertical: hp(2),
  },
  headingText: {color: colors.black, fontFamily: fonts.bold},
  stepText: {color: colors.primary, fontFamily: fonts.bold},
  uploadText: {
    color: colors.grey,
    fontFamily: fonts.bold,
    width: wp(90),
    marginTop: hp(5),
  },
  selectImage: {
    width: wp(90),
    height: hp(25),
    backgroundColor: colors.grey,
    borderRadius: 10,
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileText: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
  bottomSheet: {
    backgroundColor: colors.primary,
    width: wp(100),
    height: hp(25),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(0.5),
    paddingHorizontal: wp(5),
  },
  bottomSheetText: {
    width: wp(75),
    fontFamily: fonts.regular,
    color: colors.white,
  },
  closeIcon: {
    position: 'absolute',
    width: wp(5),
    height: hp(5),
    right: wp(8),
    top: hp(1),
  },
  submitBtnContainer: {
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: hp(6),
  },
  btnTextStyles: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.5),
    color: colors.white,
  },
});
