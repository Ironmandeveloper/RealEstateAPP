import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import {allImages} from '../../Constants/Images';
import {fonts} from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import CustomHeader from '../../Components/CustomHeader';
import InventoriesComp from '../../Components/InventoriesComp';
import {topInventories} from '../../Constants/dummyData';
import axios from 'axios';
import {AppFlow} from '../../Api/ApiCalls';
import {useFocusEffect} from '@react-navigation/native';
import {URL} from '../../Constants/URL';
import CustomLoader from '../../Components/CustomLoader';
import EmptyComponent from '../../Components/EmptyComponent';
import moment from 'moment';

export default function AgencyProperties(props) {
  const {id} = props.route.params;
  const [inventData, setInventData] = useState();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [id]),
  );

  const getData = () => {
    AppFlow.agencyProperties(id)
      .then(function (response) {
        console.log(
          'success getting agency data',
          JSON.stringify(response.data, null, 2),
        );
        setInventData(response.data.data.inventory);
      })
      .catch(function (error) {
        console.log('Error getting agency data', error.response);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <CustomLoader isLoading={loading} />
      <CustomHeader
        headerStyle={styles.headerStyle}
        iconContainer={styles.iconContainer}
        leftIconName="arrow-back"
        leftIconType="material"
        leftIconColor={colors.white}
        leftIconSize={30}
        onLeftIconPress={() => props.navigation.goBack()}
        inputViewStyle={styles.inputViewStyle}
        textInputStyle={styles.textInputStyle}
        placeholder="Search"
        placeholderTextColor={colors.grey}
        screenTitle="Properties"
        screenTitleStyle={styles.screenTitleStyle}
      />
      <Text style={styles.titleText}>Agency Properties</Text>
      <FlatList
        data={inventData}
          
        ListEmptyComponent={
          <EmptyComponent emptyContainer={{height: hp(10), width: wp(90)}} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp(2.5),
          paddingBottom: hp(5),
          paddingTop: hp(3),
        }}
        renderItem={({item, index}) => {
          const inventories = item.inventory_data;
          if (inventories.length > 0) {
            return (
              <View style={styles.listContainer}>
                <View style={styles.listLeftView}>
                  <Image
                    source={
                      inventories[0]?.agency?.file?.file
                        ? {
                            uri:
                              URL.imageURL + inventories[0]?.agency?.file?.file,
                          }
                        : allImages.logo1
                    }
                    style={styles.listImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.listImageText}>
                    {inventories[0]?.agency?.ceo_name || 'N/A'}
                  </Text>
                </View>
                <View style={styles.listRightView}>
                  <Text style={styles.listHeading}>
                    {inventories[0]?.agency?.name || 'N/A'}
                  </Text>
                  <Text style={{marginVertical: hp(1)}} numberOfLines={4}>
                    {inventories.map(val => {
                      return (
                        <Text style={styles.listText}>
                          {val?.category || ''} {val?.plot_no || ''},{' '}
                          {val?.block || ''}{' '}
                          {val?.block?.toLowerCase().includes('block')
                            ? ''
                            : 'Block'}{' '}
                          @{val?.price} {val?.price_unit} {val?.feature}{' '}
                          {val?.size} {val?.size_unit}
                          {'\n'}
                        </Text>
                      );
                    })}
                  </Text>
                  <View style={styles.listBtnView}>
                    <Text style={styles.listPersonName}>
                      {item?.created_at
                        ? moment(item.created_at).fromNow()
                        : 'N/A'}
                    </Text>
                    <CustomButton
                      btnText="See Details"
                      indicator={false}
                      onPress={() =>
                        props.navigation.navigate('AppFlow', {
                          screen: 'InventoryDetails',
                          params: {
                            inventory: inventories,
                          },
                        })
                      }
                      btnContainer={styles.btnContainer}
                      btnTextStyles={styles.btnTextStyles}
                    />
                  </View>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  headingText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    width: wp(90),
    marginVertical: hp(1),
  },
  headerStyle: {
    width: wp(100),
    height: hp(20),
    backgroundColor: colors.primary,
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: hp(2.5),
    color: colors.black,
    marginVertical: hp(2),
    width: wp(90),
  },
  inputViewStyle: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: wp(5),
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginTop: hp(1),
    height:hp(7)
  },
  textInputStyle: {
    width: wp(75),
    fontFamily: fonts.regular,
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
  btnContainer: {
    width: wp(22),
    height: hp(3.5),
    backgroundColor: colors.secondary,
    borderRadius: hp(6),
  },
  btnTextStyles: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: hp(1.5),
  },
  listContainer: {
    backgroundColor: colors.white,
    minHeight: hp(15),
    width: wp(95),
    elevation: 5,
    marginVertical: hp(1),
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
  },
  listLeftView: {
    backgroundColor: colors.grey,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(20),
    backgroundColor: colors.white,
  },

  listImageText: {
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize: hp(1.5),
    color: colors.white,
  },
  listRightView: {
    width: wp(64),
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  listHeading: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: hp(1.8),
  },
  listPersonName: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: hp(1.6),
  },
  listText: {
    fontFamily: fonts.regular,
    color: colors.grey,
    fontSize: hp(1.6),
  },
  listBtnView: {
    width: wp(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
