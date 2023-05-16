import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomLoader from '../../../Components/CustomLoader';
import {useState} from 'react';
import {colors} from '../../../Constants/Colors';
import {hp, wp} from '../../../Constants/Responsive';
import {fonts} from '../../../Constants/Fonts';

export default function AddAgencyDetails(props) {
  const [isLoading, setIsLoading] = useState(false);
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
        </View>
      </ScrollView>
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
});
