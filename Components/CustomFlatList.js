import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {URL} from '../Constants/URL';
import EmptyComponent from './EmptyComponent';
import {hp, wp} from '../Constants/Responsive';
import Carousel from 'react-native-snap-carousel';

export default function CustomFlatList(props) {
  const renderItem = ({item, index}) => {
    return (
      <Pressable key={index} onPress={() => props.onPress(item)}>
        <View style={props.featureCard} key={index}>
          <Image
            source={
              item?.file
                ? {uri: URL.imageURL + item.file.file}
                : require('../Assets/Images/feature1.jpg')
            }
            style={props.featureImageStyle}
            // resizeMode="contain"
          />
          <Text style={props.featureNameText} numberOfLines={3}>
            {props?.news
              ? `${item.description}`
              : `${item?.title} working with ${item.developer_name}`}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <>
      {props?.horizontal ? (
        <Carousel
          contentContainerStyle={props.flatListStyle}
          horizontal={props.horizontal}
          numColumns={props.numColumns}
          showsHorizontalScrollIndicator={false}
          data={props.data}
          keyExtractor={(item, index) => index || Math.random()}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          renderItem={renderItem}
          sliderWidth={wp(100)}
          sliderHeight={hp(100)}
          itemHeight={props?.featureCard?.height}
          itemWidth={props?.featureCard?.width}
          autoplay={true}
          autoplayDelay={0}
          loop={true}
        />
      ) : (
        <FlatList
          contentContainerStyle={props.flatListStyle}
          horizontal={props.horizontal}
          numColumns={props.numColumns}
          showsHorizontalScrollIndicator={false}
          data={props.data}
          keyExtractor={(item, index) => index || Math.random()}
          ListEmptyComponent={
            <EmptyComponent emptyContainer={{height: hp(5)}} />
          }
          renderItem={renderItem}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
