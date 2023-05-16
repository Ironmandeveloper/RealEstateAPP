import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {hp, wp} from '../Constants/Responsive';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';
import {Icon} from '@rneui/themed';
import {URL} from '../Constants/URL';
import EmptyComponent from './EmptyComponent';
import Carousel from 'react-native-snap-carousel';

export default function TopClassifiedComp(props) {
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        key={index}
        style={props.classifiedCardStyle}
        onPress={() => props.onPress(item)}>
        <Image
          source={
            item?.file?.length
              ? {uri: URL.imageURL + item?.file[0]?.file}
              : require('../Assets/Images/classified.jpeg')
          }
          style={props.classifiedImageStyle}
          // resizeMode="contain"
        />
        <View style={props.classifiedTitlePrice}>
          <Text style={props.classifiedTitleText} numberOfLines={1}>
            {item?.category || ''} For Sale
          </Text>
          <Text style={props.classifiedPriceText}>
            Rs/. {item?.price || 'Loading'}
          </Text>
        </View>
        <View></View>
        <Text style={props.classifiedAddressStyle} numberOfLines={3}>
          {item?.description || 'Loading'}
        </Text>
        <View style={styles.classifiedAmenitiesContainer}>
          <View style={props.classifiedAmenities}>
            <Icon
              type="font-awesome"
              name="bed"
              size={props.amenitiesIconSize}
              color={colors.white}
            />
            <Text style={props.classifiedAmenitiesText}>{item?.bed || ''}</Text>
          </View>
          <View style={props.classifiedAmenities}>
            <Icon
              type="font-awesome"
              name="bath"
              size={props.amenitiesIconSize}
              color={colors.white}
            />
            <Text style={props.classifiedAmenitiesText}>
              {item?.bath || ''}
            </Text>
          </View>
          <View style={props.classifiedAmenities}>
            <Text style={props.classifiedAmenitiesText}>
              {item?.size || 'N/A'} {item?.size_unit || 'N/A'}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      {props.horizontal ? (
        <Carousel
          contentContainerStyle={props.classifiedFlatListStyle}
          horizontal={props.horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={props.data}
          numColumns={props.numColumns}
          keyExtractor={(item, index) => index || Math.random()}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          renderItem={renderItem}
          sliderWidth={wp(100)}
          itemHeight={props?.classifiedCardStyle?.height}
          itemWidth={props?.classifiedCardStyle?.width}
          autoplay={true}
          autoplayDelay={0}
          loop={true}
        />
      ) : (
        <FlatList
          contentContainerStyle={props.classifiedFlatListStyle}
          horizontal={props.horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={props.data}
          numColumns={props.numColumns}
          keyExtractor={(item, index) => index || Math.random()}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  classifiedAmenitiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(35),
  },
});
