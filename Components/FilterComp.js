import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomDropdown from './CustomDropdown';
import {hp, wp} from '../Constants/Responsive';
import CustomTextInput from './CustomTextInput';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import Slider from 'rn-range-slider';
import Thumbs from './RangeSliderComponents/Thumbs';
import Rails from './RangeSliderComponents/Rails';
import RailSelected from './RangeSliderComponents/RailSelected';
import Label from './RangeSliderComponents/Label';
import Notch from './RangeSliderComponents/Notch';
import CustomButton from './CustomButton';
import {
  invenCategories,
  purpose,
  sizes,
  typeItem,
} from '../Constants/dummyData';
export default function FilterComp(props) {
  console.log(props, 'filter modal');
  useEffect(() => {}, [props?.filterModal]);
  const [filterItems, setFilterItems] = useState({});
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  const renderThumb = useCallback(() => <Thumbs name={'High'} />, []);
  const renderRail = useCallback(() => <Rails />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.filterModal}
        style={{backgroundColor: 'red'}}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => props.onCloseModal()}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              style={{
                width: wp(90),
              }}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dropdownsContainer}>
                <CustomDropdown
                  data={typeItem}
                  topLabelText={'Type'}
                  labelFieldName={'label'}
                  valueFieldName={'value'}
                  iconType="material"
                  iconName="merge-type"
                  placeholder={'Select Type'}
                  value={filterItems.type || ''}
                  onChange={item => {
                    setFilterItems(previous => {
                      return {...previous, type: item.value};
                    });
                  }}
                  dropdown={{
                    width: wp(43),
                  }}
                />
                <CustomDropdown
                  data={purpose}
                  topLabelText={'Purpose'}
                  labelFieldName={'label'}
                  valueFieldName={'value'}
                  iconType="material"
                  iconName="business"
                  placeholder={'Purpose'}
                  value={filterItems?.purpose || ''}
                  onChange={item => {
                    setFilterItems(previous => {
                      return {...previous, purpose: item.value};
                    });
                  }}
                  dropdown={{
                    width: wp(43),
                  }}
                />
              </View>
              <View style={styles.dropdownsContainer}>
                <CustomDropdown
                  dropdown={{
                    width: wp(43),
                  }}
                  data={sizes}
                  topLabelText={'Size'}
                  labelFieldName={'label'}
                  valueFieldName={'value'}
                  iconType="material"
                  iconName="fullscreen"
                  placeholder={'Select Size'}
                  value={filterItems?.sizeUnit || ''}
                  onChange={item => {
                    setFilterItems(previous => {
                      return {...previous, sizeUnit: item.value};
                    });
                  }}
                />
                <CustomTextInput
                  topText="Area"
                  iconType="material-community"
                  iconName="floor-plan"
                  iconSize={20}
                  placeholder="Area"
                  textInputContainer={{
                    width: wp(40),
                    height: hp(7),
                  }}
                  textInputStyles={styles.textInputStyles}
                  // textInputView={styles.amenitiesInputView}
                  keyboardType={'number-pad'}
                  value={filterItems?.clsPlotArea || ''}
                  onChangeText={t =>
                    setFilterItems(prev => {
                      return {...prev, clsPlotArea: t};
                    })
                  }
                />
              </View>
              <CustomDropdown
                data={invenCategories}
                topLabelText={'Category'}
                labelFieldName={'label'}
                valueFieldName={'value'}
                iconType="material"
                iconName="category"
                placeholder={'Select Category'}
                value={filterItems?.clsCategory || ''}
                onChange={item => {
                  setFilterItems(previous => {
                    return {...previous, clsCategory: item.value};
                  });
                }}
                dropdown={{
                  width: wp(90),
                }}
              />
              <View style={{...styles.dropdownsContainer, marginTop: hp(2)}}>
                {filterItems?.clsCategory == 'House' ||
                filterItems?.clsCategory == 'Apartment' ||
                filterItems?.clsCategory == 'villa' ? (
                  <>
                    <CustomTextInput
                      topText="Beds"
                      iconType="font-awesome"
                      iconName="bed"
                      iconSize={20}
                      placeholder="Beds"
                      textInputStyles={styles.amenitiesInputStyles}
                      textInputView={styles.amenitiesInputView}
                      keyboardType={'number-pad'}
                      value={filterItems?.clsBeds || ''}
                      onChangeText={t =>
                        setFilterItems(previous => {
                          return {...previous, clsBeds: t};
                        })
                      }
                      textInputContainer={{
                        width: wp(29),
                      }}
                    />
                    <CustomTextInput
                      topText="Bath"
                      iconType="font-awesome"
                      iconName="bath"
                      iconSize={20}
                      placeholder="Baths"
                      textInputStyles={styles.amenitiesInputStyles}
                      textInputView={styles.amenitiesInputView}
                      keyboardType={'number-pad'}
                      value={filterItems?.clsBath || ''}
                      onChangeText={t =>
                        setFilterItems(previous => {
                          return {...previous, clsBath: t};
                        })
                      }
                      textInputContainer={{
                        width: wp(29),
                      }}
                    />
                    <CustomTextInput
                      topText="Floor"
                      iconType="material-community"
                      iconName="floor-plan"
                      iconSize={20}
                      placeholder="Floor"
                      textInputStyles={styles.amenitiesInputStyles}
                      textInputView={styles.amenitiesInputView}
                      keyboardType={'number-pad'}
                      value={filterItems?.clsFloor || ''}
                      onChangeText={t =>
                        setFilterItems(previous => {
                          return {...previous, clsFloor: t};
                        })
                      }
                      textInputContainer={{
                        width: wp(29),
                      }}
                    />
                  </>
                ) : null}
              </View>
              <View style={{marginTop: hp(2)}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.rangeText}>Price Range</Text>
                  <Text style={styles.priceText}>
                    {low} - {high}
                  </Text>
                </View>
                <Slider
                  style={styles.slider}
                  min={0}
                  max={10000000000}
                  step={1000}
                  floatingLabel
                  renderThumb={renderThumb}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={(low, high) => {
                    handleValueChange(low, high);
                  }}
                />
                <CustomButton
                  btnContainer={{
                    ...styles.submitBtnContainer,
                    alignSelf: 'center',
                    marginTop: hp(3),
                  }}
                  btnText="Submit"
                  onPress={() => {
                    props.onSubmit({
                      ...filterItems,
                      low: low,
                      high: high,
                    });
                  }}
                  indicator={props?.filterBtnIndicator}
                  disabled={false}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  dropdownsContainer: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: -hp(5),
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalView: {
    width: wp(100),
    height: hp(60),
    backgroundColor: colors.tertiary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  textInputStyles: {
    width: wp(28),
    fontFamily: fonts.regular,
  },
  slider: {
    width: wp(90),
  },
  rangeText: {
    maxWidth: wp(30),
    backgroundColor: colors.primary,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    color: colors.white,
    marginBottom: hp(3),
  },
  priceText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondary,
    marginLeft: wp(4),
    marginBottom: hp(2.5),
  },
});
