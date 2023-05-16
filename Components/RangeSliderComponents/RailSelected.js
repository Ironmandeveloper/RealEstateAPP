import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../Constants/Colors';

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
});
