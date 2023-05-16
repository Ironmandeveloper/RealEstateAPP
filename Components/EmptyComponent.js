import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp} from '../Constants/Responsive';
import {colors} from '../Constants/Colors';
import {fonts} from '../Constants/Fonts';

export default function EmptyComponent(props) {
  return (
    <View style={[styles.emptyContainer, props.emptyContainer]}>
      <Text style={[styles.emptyText, props.emptyText]}>No Data Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: hp(90),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: hp(2),
  },
});
