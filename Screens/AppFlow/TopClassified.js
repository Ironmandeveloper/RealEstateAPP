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
import {topClassified} from '../../Constants/dummyData';
import TopClassifiedComp from '../../Components/TopClassifiedComp';
import {AppFlow} from '../../Api/ApiCalls';
import CustomLoader from '../../Components/CustomLoader';
var dataCopy = []
export default function TopClassified(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();

  useEffect(() => {
    GetInventories();
  }, []);
  async function GetInventories() {
    await AppFlow.getAllClassifieds()
      .then(function (response) {
        console.log(
          'success getting Top Classified data',
          // JSON.stringify(response.data, null, 2),
          response,
        );
        setData(response.data.data);
        dataCopy=response.data?.data
      })
      .catch(function (error) {
        console.log('error getting Top Classified Error', error.response);
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
        screenTitle="Top Classified"
        screenTitleStyle={styles.screenTitleStyle}
        onChangeText={t => {
          if (t.length > 0) {
            const newData = [...dataCopy];
            const a = newData.filter(item =>
              item?.purpose?.toLowerCase()?.includes(t.toLowerCase()),
            );
            setData(a);
          } else {
            setData(dataCopy);
          }
          setSearch(t);
        }}  
        value={search}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Top Classified</Text>
      </View>
      <TopClassifiedComp
        data={data}
        onPress={item =>
          props.navigation.navigate('AppFlow', {
            screen: 'ClassifiedDetails',
            params: {classified: item},
          })
        }
        numColumns={2}
        classifiedFlatListStyle={styles.flatListStyle}
        classifiedCardStyle={styles.classifiedCardStyle}
        classifiedImageStyle={styles.classifiedImageStyle}
        classifiedTitlePrice={styles.classifiedTitlePrice}
        classifiedTitleText={styles.classifiedTitleText}
        classifiedPriceText={styles.classifiedPriceText}
        classifiedAddressStyle={styles.classifiedAddressStyle}
        classifiedAmenities={styles.classifiedAmenities}
        classifiedAmenitiesText={styles.classifiedAmenitiesText}
        amenitiesIconSize={10}
        animation={false}
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
  classifiedCardStyle: {
    width: wp(43),
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: wp(2),
    alignItems: 'center',
    paddingBottom: hp(1),
    marginBottom: hp(1.8),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
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
