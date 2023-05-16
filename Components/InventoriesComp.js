import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import {fonts} from '../Constants/Fonts';
import {colors} from '../Constants/Colors';
import {Icon} from '@rneui/themed';
import {URL} from '../Constants/URL';
import EmptyComponent from './EmptyComponent';
import Carousel from 'react-native-snap-carousel';

export default function InventoriesComp(props) {
  const renderItem = ({item, index}) => {
    if (item?.inventory_data?.length == 1) {
      const newItem = item?.inventory_data[0];
      return (
        <TouchableOpacity
          key={index}
          style={props.inventoryCard}
          onPress={() => props.onPress(item)}>
          <View style={styles.profileContainer}>
            <View style={props.profileImgContainer}>
              <Image
                source={
                  newItem?.agency?.file?.length
                    ? {
                        uri: URL.imageURL + newItem?.agency?.file[0]?.file,
                      }
                    : require('../Assets/Images/agency-dummy.png')
                }
                style={props.profileImgStyle}
                // resizeMode="contain"
              />
            </View>
            <View style={{marginLeft: wp(4)}}>
              <Text style={styles.title}>{newItem?.agency?.name || 'N/A'}</Text>
              <Text style={styles.byUser}>
                By: {newItem?.agency?.ceo_name || 'N/A'}
              </Text>
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.text2}>
              {newItem?.category} {newItem?.plot_no} is available {'\n'} in{' '}
              {newItem?.block}, {newItem?.society?.name}, {newItem?.city?.name}{' '}
              {'\n'} at {newItem?.price}
              {newItem?.price_unit} Rupees
            </Text>
          </View>
          <View style={styles.locationMain}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                {newItem?.category} for {newItem?.purpose || ''}
              </Text>
              <Icon
                type="material"
                name="place"
                size={10}
                color={colors.white}
              />
            </View>
            <Text
              style={{
                ...styles.text2,
                marginLeft: wp(2),
                width: wp(55),
              }}
              numberOfLines={1}>
              {newItem?.category} {newItem?.plot_no} in {newItem?.block}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      const constantData = item.inventory_data[0];
      return (
        <TouchableOpacity
          key={index}
          style={props.inventoryCard}
          onPress={() => props.onPress(item)}>
          <View style={styles.profileContainer}>
            <View style={props.profileImgContainer}>
              <Image
                source={
                  item?.inventory_data[0]?.agency?.file.length
                    ? {
                        uri:
                          URL.imageURL +
                          item?.inventory_data[0]?.agency?.file[0].file,
                      }
                    : require('../Assets/Images/agency-dummy.png')
                }
                style={props.profileImgStyle}
                resizeMode="contain"
              />
            </View>
            <View style={{marginLeft: wp(4)}}>
              <Text style={styles.title}>
                {constantData?.agency?.name || 'N/A'}
              </Text>
              <Text style={styles.byUser}>
                By: {constantData?.agency?.ceo_name || 'N/A'}
              </Text>
            </View>
          </View>
          <Text style={styles.detailsContainer} numberOfLines={5}>
            {item?.inventory_data.map(invent => {
              return (
                <Text style={styles.text2}>
                  {/* {invent?.category}  */}
                  {invent?.plot_no}
                  {/* is available in */}
                  {', '}
                  {invent?.block}, {invent?.society?.name},{' '}
                  {/* {invent?.city?.name} at  */}
                  {invent?.price} {invent?.price_unit} {'\n'}
                </Text>
              );
            })}
          </Text>
          <View style={styles.locationMain}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>
                {constantData?.category} for {constantData?.purpose || ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <>
      {props?.horizontal == false ? (
        <FlatList
          contentContainerStyle={props.flatListStyle}
          horizontal={props.horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          data={props.data}
          keyExtractor={(item) => item.id || Math.random()}
          renderItem={renderItem}
        />
      ) : (
        <Carousel
          data={props.data}
          layout="default"
          contentContainerStyle={props.flatListStyle}
          horizontal={false}
          numColumns={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          keyExtractor={(item) => item.id || Math.random()}
          renderItem={renderItem}
          sliderWidth={wp(100)}
          sliderHeight={hp(100)}
          itemHeight={props?.inventoryCard?.height}
          itemWidth={props?.inventoryCard?.width}
          autoplay={true}
          autoplayDelay={0}
          loop={true}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: hp(1.5),
    color: colors.secondary,
  },
  byUser: {
    fontFamily: fonts.regular,
    fontSize: hp(1.4),
    color: colors.grey,
  },
  detailsContainer: {
    maxWidth: wp(65),
    marginLeft: wp(4),
    marginTop: hp(2),
  },
  text2: {
    fontFamily: fonts.regular,
    fontSize: hp(1.5),
    color: colors.secondary,
    maxWidth: wp(65),
  },
  locationContainer: {
    height: hp(3),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    borderRadius: hp(2),
  },
  locationText: {
    fontFamily: fonts.medium,
    fontSize: hp(1.3),
    color: colors.white,
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
});
