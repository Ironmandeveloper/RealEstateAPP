import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {hp, wp} from '../../Constants/Responsive';
import {colors} from '../../Constants/Colors';
import CustomHeader from '../../Components/CustomHeader';
import {fonts} from '../../Constants/Fonts';
import CustomFlatList from '../../Components/CustomFlatList';
import {NewsData} from '../../Constants/dummyData';

export default function News(props) {
  const data = props?.route?.params?.data || [];
  return (
    <View style={styles.mainContainer}>
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
        screenTitle="News"
        screenTitleStyle={styles.screenTitleStyle}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>News</Text>
      </View>
      <CustomFlatList
        data={data}
        numColumns={3}
        featureCard={styles.newsCard}
        featureImageStyle={styles.newsImageStyle}
        featureNameText={styles.newsNameText}
        flatListStyle={styles.flatListStyle}
        onPress={() => props.navigation.navigate('NewsDetails')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.tertiary,
  },
  headerStyle: {
    width: wp(100),
    height: hp(20),
    backgroundColor: colors.primary,
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
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp(90),
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: hp(2.5),
    color: colors.secondary,
  },
  viewAllText: {
    fontFamily: fonts.medium,
    fontSize: hp(2),
    color: colors.primary,
  },

  flatListStyle: {paddingTop: hp(1), paddingBottom: hp(30)},
  newsCard: {
    width: wp(28),
    backgroundColor: colors.white,
    marginHorizontal: wp(1.5),
    alignItems: 'center',
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: colors.primary,
    paddingTop: hp(0.7),
    paddingBottom: hp(2),
    marginBottom: hp(1.8),
  },
  newsImageStyle: {
    width: wp(25),
    height: hp(8),
    borderRadius: hp(1),
  },
  newsNameText: {
    width: wp(23),
    fontFamily: fonts.medium,
    fontSize: hp(1.3),
    color: colors.black,
    alignSelf: 'flex-start',
    marginHorizontal: wp(1),
    marginTop: hp(0.5),
  },
});
