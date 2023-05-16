import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {hp, wp} from '../../Constants/Responsive';
import {colors} from '../../Constants/Colors';
import CustomHeader from '../../Components/CustomHeader';
import {fonts} from '../../Constants/Fonts';
import {Featured} from '../../Constants/dummyData';
import CustomFlatList from '../../Components/CustomFlatList';
import {AppFlow} from '../../Api/ApiCalls';
import CustomLoader from '../../Components/CustomLoader';

export default function TopClassified(props) {
  const [loading, setLoading] = useState(true);
  const [screenData, setScreenData] = useState([]);
  useEffect(() => {
    getFeatured();
  }, []);
  async function getFeatured() {
    AppFlow.getAllFeatured()
      .then(res => {
        console.log(
          'success getting featured products',
          JSON.stringify(res.data, null, 2),
        );
        setScreenData(res.data.data);
      })
      .catch(err => {
        console.log('err getting featured products', err);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  return (
    <View style={styles.mainContainer}>
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
        screenTitle="Featured Projects"
        screenTitleStyle={styles.screenTitleStyle}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Featured Projects</Text>
      </View>
      <CustomFlatList
        data={screenData}
        numColumns={3}
        featureCard={styles.featureCard}
        featureImageStyle={styles.featureImageStyle}
        featureNameText={styles.featureNameText}
        flatListStyle={styles.flatListStyle}
        onPress={item =>
              props.navigation.navigate('AppFlow', {
                screen: 'FeaturedDetails',
                params: {data: item},
              })
            }
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
  featureCard: {
    width: wp(26),
    height: hp(15),
    backgroundColor: colors.white,
    marginHorizontal: wp(1.5),
    alignItems: 'center',
    borderRadius: hp(1),
    marginBottom: hp(1.5),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  featureImageStyle: {
    width: wp(26),
    height: hp(8),
    borderTopRightRadius: hp(1),
    borderTopLeftRadius: hp(1),
  },
  featureNameText: {
    fontFamily: fonts.medium,
    fontSize: hp(1.2),
    color: colors.black,
    alignSelf: 'flex-start',
    marginHorizontal: wp(1),
    marginTop: hp(0.5),
  },
  flatListStyle: {paddingTop: hp(1), paddingBottom: hp(30)},
  classifiedCardStyle: {
    width: wp(43),
    backgroundColor: colors.white,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: wp(2),
    alignItems: 'center',
    paddingBottom: hp(1),
    marginBottom: hp(1.8),
  },

  classifiedImageStyle: {
    width: wp(39),
    height: hp(12),
    borderRadius: 10,
    marginTop: hp(1),
  },
  classifiedTitlePrice: {
    flexDirection: 'row',
    width: wp(36),
    justifyContent: 'space-between',
    marginTop: hp(0.5),
    alignItems: 'center',
  },
  classifiedTitleText: {
    fontFamily: fonts.bold,
    fontSize: hp(1.4),
    color: colors.secondary,
    maxWidth: wp(25),
  },
  classifiedPriceText: {
    fontFamily: fonts.bold,
    fontSize: hp(1.4),
    color: colors.primary,
    textAlign: 'right',
  },
  classifiedAddressStyle: {
    fontFamily: fonts.regular,
    fontSize: hp(1),
    color: colors.grey,
    width: wp(35),
  },
  classifiedAmenities: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    borderRadius: 4,
    marginTop: hp(1),
  },
  classifiedAmenitiesText: {
    fontFamily: fonts.semiBold,
    fontSize: hp(1.2),
    color: 'white',
    marginLeft: wp(0.5),
  },
});
