import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../Constants/Colors';
import {wp} from '../../Constants/Responsive';

const Notch = props => {
  return <View style={styles.root} {...props} />;
};

export default memo(Notch);

const styles = StyleSheet.create({
  root: {
    width: wp(85),
    height: 5,
    backgroundColor: colors.black,
    borderRadius: 20,
  },
});
