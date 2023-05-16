import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../Components/CustomHeader';
import {hp, wp} from '../../Constants/Responsive';
import {colors} from '../../Constants/Colors';
import {allImages} from '../../Constants/Images';
import TitaniumFlatlist from '../../Components/TitaniumFlatlist';
import {fonts} from '../../Constants/Fonts';
import InventoriesComp from '../../Components/InventoriesComp';
import CustomFlatList from '../../Components/CustomFlatList';
import TopClassifiedComp from '../../Components/TopClassifiedComp';
import {useFocusEffect} from '@react-navigation/native';
import {AppFlow} from '../../Api/ApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoader from '../../Components/CustomLoader';
import {Linking} from 'react-native';
import {Icon} from '@rneui/base';

export default function HomeScreen(props) {
  const [screenData, setScreenData] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [agenciesData, setAgenciesData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
      GetUser();
      getAllAgencies();
    }, []),
  );
  // useEffect(() => {
  //   getData();
  // });
  const GetUser = async () => {
    let userData = await AsyncStorage.getItem('AuthUser');
    setUser(JSON.parse(userData));
  };
  async function getAllAgencies() {
    AppFlow.getAllAgencies()
      .then(res => {
        console.log(
          'response getting all agences',
          JSON.stringify(res.data, null, 2),
          // res,
        );
        setAgenciesData(res?.data?.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {});
  }
  const getData = () => {
    AppFlow.dashboard()
      .then(function (response) {
        console.log(
          'Response data',
          JSON.stringify(response?.data.data.agency, null, 2),
          // response.data.data,
        );
        setScreenData(response.data.data);
      })
      .catch(function (error) {
        console.log('Dashboard Error', error.response);
      })
      .finally(function () {
        setIsLoading(false);
      });
  };
  function sortArr(arr) {
    const newArr = arr.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return newArr;
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomLoader isLoading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader
          headerStyle={styles.headerStyle}
          leftImage={allImages.logo2}
          leftImageStyle={{width: wp(36), height: hp(8)}}
          rightIconName={'account-circle'}
          loginText={user ? null : true}
          rightIconType="material"
          rightIconColor={colors.white}
          rightIconSize={35}
          onRighttIconPress={() => {
            user
              ? props.navigation.navigate('AppFlow', {screen: 'Profile'})
              : props.navigation.navigate('AuthStack', {screen: 'Login'});
          }}
          inputViewStyle={styles.inputViewStyle}
          textInputStyle={styles.textInputStyle}
          placeholder="Search"
          placeholderTextColor={colors.grey}
          iconContainer={styles.iconContainer}
          onChangeText={t => {}}
        />
        {isLoading ? null : (
          <>
          
            {Platform.OS=='android' && screenData?.app_update?.update == '1' ? (
              <View style={styles.updateAppBanner}>
                <Text style={styles.updateAppText}>
                  New stable Version of this app has released. To install
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'http://play.google.com/store/apps/details?id=com.ittilaa',
                    )
                  }>
                  <Text style={styles.clickHere}>Click Here</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                marginHorizontal: wp(5),
                paddingVertical: hp(2),
                paddingHorizontal: wp(5),
                borderRadius: 5,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() =>
                props.navigation.navigate('AppFlow', {screen: 'AddInformation'})
              }>
              <Text style={styles.updateAppText}>Create Ad</Text>
              <Icon
                name={'home-group-plus'}
                type={'material-community'}
                color={colors.white}
                size={hp(3)}
              />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Agencies</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AppFlow', {screen: 'AllAgencies'})
                }>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <TitaniumFlatlist
              horizontal={true}
              data={agenciesData.length ? sortArr(agenciesData) : []}
              // data={[]}
              cardStyle={styles.cardStyle}
              listContainerstyle={styles.listContainerstyle}
              flatListStyle={styles.flatListStyle}
              listTitleStyle={styles.listTitleStyle}
              onPress={item =>
                props.navigation.navigate('AppFlow', {
                  screen: 'AgencyProfile',
                  params: {agency: item},
                })
              }
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Top Inventories</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AppFlow', {
                    screen: 'TopInventories',
                  })
                }>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            {/* <AutoScrollFlatList/> */}
            <InventoriesComp
              data={
                screenData?.inventory?.length
                  ? screenData?.inventory.reverse()
                  : []
              }
              inventoryCard={styles.inventoryCard}
              horizontal={true}
              flatListStyle={styles.flatListStyle}
              profileImgStyle={styles.profileImgStyle}
              profileImgContainer={styles.profileImgContainer}
              animation={false}
              onPress={item =>
                props.navigation.navigate('AppFlow', {
                  screen: 'InventoryDetails',
                  params: {inventory: item.inventory_data},
                })
              }
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Top Classified</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AppFlow', {
                    screen: 'TopClassified',
                  })
                }>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <TopClassifiedComp
              data={screenData?.classified.length ? screenData.classified : []}
              // data={[]}
              horizontal={true}
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
              onPress={item =>
                props.navigation.navigate('AppFlow', {
                  screen: 'ClassifiedDetails',
                  params: {classified: item},
                })
              }
              // onPress={item => props.navigation.navigate('FeaturedDetails')}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Featured Projects</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AppFlow', {
                    screen: 'FeaturedProjects',
                  })
                }>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <CustomFlatList
              animation={false}
              data={screenData?.featured?.length ? screenData?.featured : []}
              // data={[]}
              horizontal={true}
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
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>News</Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('AppFlow', {
                    screen: 'News',
                    params: {data: screenData?.news},
                  })
                }>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <CustomFlatList
              data={screenData?.news?.length ? screenData?.news : []}
              // data={[]}
              horizontal={true}
              featureCard={styles.newsCard}
              featureImageStyle={styles.newsImageStyle}
              featureNameText={styles.newsNameText}
              onPress={item =>
                props.navigation.navigate('AppFlow', {
                  screen: 'NewsDetails',
                  params: {news: item},
                })
              }
              flatListStyle={styles.flatListStyle}
              news
            />
            <View style={{height: hp(4)}}></View>
          </>
        )}
        <View style={{height: hp(8)}}></View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: hp(1),
  },
  cardStyle: {
    height: wp(25),
    width: wp(25),
    backgroundColor: colors.white,
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainerstyle: {
    // marginHorizontal:wp(5),
    marginTop: hp(2),
  },
  flatListStyle: {marginHorizontal: wp(5), paddingRight: wp(6)},
  listTitleStyle: {
    maxWidth: wp(20),
    fontFamily: fonts.regular,
    textAlign: 'center',
    fontSize: hp(1.5),
    color: colors.secondary,
    marginTop: hp(1),
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp(90),
    marginTop: hp(2),
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
  inventoryCard: {
    width: wp(75),
    backgroundColor: colors.white,
    // elevation: 1,
    borderRadius: 14,
    marginTop: hp(2),
    marginRight: wp(8),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.08)',
    paddingBottom: hp(2),
  },
  profileImgStyle: {
    width: hp(6),
    height: hp(6),
    borderRadius: wp(8),
  },
  profileImgContainer: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(7),
    backgroundColor: colors.white,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classifiedCardStyle: {
    width: wp(40),
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: wp(3),
    alignItems: 'center',
    paddingBottom: hp(1),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.09)',
    justifyContent: 'space-between',
  },

  classifiedImageStyle: {
    width: wp(36),
    height: hp(10),
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
    fontSize: 8,
    color: colors.secondary,
    maxWidth: wp(22),
  },
  classifiedPriceText: {
    fontFamily: fonts.bold,
    fontSize: 8,
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
  featureCard: {
    width: wp(26),
    height: hp(15),
    backgroundColor: colors.white,
    marginRight: wp(3),
    alignItems: 'center',
    borderRadius: hp(1),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.09)',
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
    textAlignVertical: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  newsCard: {
    width: wp(26),
    height: hp(15),
    backgroundColor: colors.white,
    marginRight: wp(3),
    alignItems: 'center',
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: hp(0.5),
  },
  newsImageStyle: {
    width: wp(23),
    height: hp(8),
    borderRadius: hp(1),
  },
  newsNameText: {
    width: wp(23),
    fontFamily: fonts.medium,
    fontSize: hp(1.2),
    color: colors.black,
    alignSelf: 'flex-start',
    marginHorizontal: wp(1),
    marginTop: hp(0.5),
  },
  updateAppBanner: {
    // flexDirection:'row',
    width: wp(90),
    borderRadius: hp(0.5),
    padding: 5,
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: hp(2),
  },
  updateAppText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.white,
  },
  clickHere: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
    // alignSelf:'flex-start',
    // textAlign:'left'
  },
});
