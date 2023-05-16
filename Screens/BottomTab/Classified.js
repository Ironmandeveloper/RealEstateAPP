import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState} from 'react';
import {colors} from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import {ImageBackground} from 'react-native';
import {allImages} from '../../Constants/Images';
import {fonts} from '../../Constants/Fonts';
import {Icon} from '@rneui/themed';
import CustomLoader from '../../Components/CustomLoader';
import CustomHeader from '../../Components/CustomHeader';
import {URL} from '../../Constants/URL';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {AppFlow} from '../../Api/ApiCalls';
import FilterComp from '../../Components/FilterComp';
import EmptyComponent from '../../Components/EmptyComponent';

var dataCopy = [];

export default function Classified(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterBtnIndicator, setFilterBtnIndicator] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  const getData = () => {
    AppFlow.getAllClassifieds()
      .then(function (response) {
        console.log('Response data', JSON.stringify(response.data, null, 2));
        setData(response?.data?.data);
        dataCopy = response?.data?.data;
      })
      .catch(function (error) {
        console.log('Dashboard Error', error);
      })
      .finally(function () {
        setLoading(false);
      });
  };
  function sortArr(arr) {
    const newArr = arr.sort(function (a, b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return newArr;
  }
  function filterArray(filterData) {
    setFilterBtnIndicator(true);
    var data = new FormData();
    data.append('title', filterData?.title || '');
    data.append('type', filterData?.type || '');
    data.append('purpose', filterData?.purpose || '');
    data.append('category', filterData?.clsCategory || '');
    data.append('bed', filterData?.clsBeds || '');
    data.append('bath', filterData?.clsBath || '');
    data.append('floor', filterData?.clsFloor || '');
    data.append('min_price', filterData?.low || '0');
    data.append('max_price', filterData?.high || '');
    data.append('size', filterData?.clsPlotArea || '');
    data.append('size_unit', filterData?.sizeUnit || '');
    console.log('responseeee', JSON.stringify(filterData, null, 2));
    AppFlow.classifiedFilter(data)
      .then(function (response) {
        console.log(
          'responseeee',
          // JSON.stringify(response?.data?.data, null, 2),
          JSON.stringify(response, null, 2),
        );
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setModalVisible(false);
        setFilterBtnIndicator(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader isLoading={loading} />
      <CustomHeader
        headerStyle={styles.headerStyle}
        iconContainer={styles.iconContainer}
        onLeftIconPress={() => props.navigation.goBack()}
        inputViewStyle={styles.inputViewStyle}
        textInputStyle={styles.textInputStyle}
        placeholder="Search"
        filter={true}
        onFilterPress={() => setModalVisible(!modalVisible)}
        placeholderTextColor={colors.grey}
        screenTitle="Classified"
        screenTitleStyle={styles.screenTitleStyle}
        onChangeText={t => {
          if (t.length > 0) {
            const newData = [...dataCopy];
            const a = newData.filter(item =>
              item?.title?.toLowerCase()?.includes(t.toLowerCase()),
            );
            setData(a);
          } else {
            setData(dataCopy);
          }
          setSearch(t);
        }}
        value={search}
      />
      <CustomLoader isLoading={false} />
      <FlatList
        // data={data?.reverse()}
        data={sortArr(data)}
        // inverted={data?.length?true:false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() =>
                props.navigation.navigate('AppFlow', {
                  screen: 'ClassifiedDetails',
                  params: {
                    classified: item,
                  },
                })
              }>
              <ImageBackground
                style={styles.listImage}
                imageStyle={{
                  borderRadius: 15,
                }}
                source={{
                  uri:
                    item?.file && item?.file?.length > 0
                      ? URL.imageURL + item?.file[0].file
                      : allImages.classifiedImages,
                }}>
                <Text style={styles.listTimeText}>
                  {item?.created_at
                    ? moment(item?.created_at).fromNow()
                    : 'N/A'}
                </Text>
              </ImageBackground>
              <View style={styles.listSubView}>
                <View style={styles.listItemDetailsView}>
                  <Text style={styles.itemDescriptionText} numberOfLines={1}>
                    {item?.category || 'N/A'} for {item?.purpose}
                  </Text>
                  <Text style={styles.itemTypeText}>
                    {item?.type || 'N/A'} {item?.category || 'N/A'}
                  </Text>
                </View>
                <View style={styles.listItemDetailsView}>
                  <Text style={styles.itemDimensionsText}>
                    {item?.size} {item?.size_unit}
                  </Text>
                  <Icon
                    name={'expand'}
                    type={'font-awesome-5'}
                    color={colors.primary}
                    size={hp(2)}
                  />
                </View>
              </View>
              <View style={styles.listItemDetailsView2}>
                <View style={styles.listItemDetailsView}>
                  <Icon
                    name={'location'}
                    type={'ionicon'}
                    color={colors.primary}
                    size={hp(2)}
                  />
                  <Text style={styles.listAddressText}>
                    {item?.location || 'N/A'}{' '}
                  </Text>
                </View>
                <View style={styles.listBottomIconsView}>
                  <View style={styles.listItemDetailsView}>
                    <Icon
                      name={'bed-outline'}
                      type={'ionicon'}
                      color={colors.white}
                      size={hp(2)}
                    />
                    <Text style={styles.listBottomIconsText}>
                      {item?.bath || '0'}
                    </Text>
                  </View>
                  <View style={styles.listBottomViewDivider}></View>
                  <View style={styles.listItemDetailsView}>
                    <Icon
                      name={'shower'}
                      type={'font-awesome'}
                      color={colors.white}
                      size={hp(1.7)}
                    />
                    <Text style={styles.listBottomIconsText}>
                      {item?.bed || '0'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <FilterComp
        filterModal={modalVisible}
        onCloseModal={() => setModalVisible(!modalVisible)}
        onValueChanged={(low, high) => console.log(low, high)}
        onSubmit={data => {
          filterArray(data);
        }}
        filterBtnIndicator={filterBtnIndicator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
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
    width: wp(58),
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
  listContainer: {
    width: wp(95),
    backgroundColor: colors.tertiary,
    marginVertical: hp(1),
  },
  listImage: {
    width: wp(95),
    height: hp(22),
    padding: 10,
  },
  listTimeText: {
    backgroundColor: 'rgba(1,1,1,0.8)',
    width: wp(30),
    color: colors.white,
    padding: 5,
    borderRadius: 20,
    textAlign: 'center',
  },
  listSubView: {
    width: wp(95),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
  },
  listItemDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDescriptionText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: hp(2),
    width: wp(35),
  },
  itemTypeText: {
    fontFamily: fonts.regular,
    color: colors.primary,
    fontSize: hp(1.5),
    marginLeft: wp(1),
  },
  itemDimensionsText: {
    fontFamily: fonts.bold,
    color: colors.black,
    fontSize: hp(1.5),
    marginRight: wp(1),
  },
  listItemDetailsView2: {
    width: wp(95),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
  },
  listAddressText: {
    fontFamily: fonts.regular,
    color: colors.black,
    fontSize: hp(1.5),
    marginLeft: wp(1),
    width: wp(60),
  },
  listBottomIconsView: {
    width: wp(18),
    paddingHorizontal: 5,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  listBottomIconsText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: hp(1.5),
    marginLeft: wp(1),
  },
  listBottomViewDivider: {
    height: hp(2),
    width: 2,
    borderRadius: 1,
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
