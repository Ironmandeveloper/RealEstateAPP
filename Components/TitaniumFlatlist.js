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
import {URL} from '../Constants/URL';
import EmptyComponent from './EmptyComponent';
import Carousel from 'react-native-snap-carousel';

export default function TitaniumFlatlist(props) {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => props.onPress(item)}
      key={index}
      style={{alignItems: 'center', marginRight: wp(2)}}>
      <View style={props.cardStyle}>
        <Image
          source={
            item?.file?.length
              ? {uri: URL.imageURL + item.file[0].file}
              : require('../Assets/Images/agency-icon.png')
          }
          style={{width: hp(10), height: hp(10), borderRadius: hp(5)}}
          // resizeMode="contain"
        />
      </View>
      <Text style={props.listTitleStyle}>{item?.name || 'Loading'}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={props.listContainerstyle}>
      <Carousel
        contentContainerStyle={props.flatListStyle}
        horizontal={props.horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={props.data}
        numColumns={props.numColumns}
        keyExtractor={(item, index) => index || Math.random()}
        ListEmptyComponent={<EmptyComponent emptyContainer={{height: hp(5)}} />}
        renderItem={renderItem}
        sliderWidth={wp(100)}
        itemHeight={props?.cardStyle?.height}
        itemWidth={props?.cardStyle?.width}
        autoplay={true}
        autoplayDelay={0}
        loop={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
