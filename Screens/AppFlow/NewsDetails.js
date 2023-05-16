import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';
import {colors} from '../../Constants/Colors';
import {hp, wp} from '../../Constants/Responsive';
import {fonts} from '../../Constants/Fonts';
import {AppFlow} from '../../Api/ApiCalls';
import {URL} from '../../Constants/URL';

export default function NewsDetails(props) {
  const news = props?.route?.params?.news;
  const [screenData, setScreenData] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    AppFlow.getNewsDetails(news?.id || 1)
      .then(function (response) {
        console.log(
          'Response data',
          // JSON.stringify(response.data, null, 2),
          response.data.data,
        );
        setScreenData(response.data.data);
      })
      .catch(function (error) {
        console.log('Dashboard Error', error.response);
      });
  };
  console.log('Dashboard Error', screenData);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1, alignItems: 'center'}}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <View style={styles.iconBackground}>
              <Icon
                type="material"
                name="arrow-back"
                size={20}
                color={colors.white}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.screenTitleStyle}>News Details</Text>
          <View></View>
        </View>
        <Image
          source={
            screenData?.file
              ? {uri: URL.imageURL + screenData?.file?.file}
              : require('../../Assets/Images/news1.jpg')
          }
          style={{width: wp(90), height: hp(26), borderRadius: hp(2)}}
          resizeMode="cover"
        />
        <Text style={styles.newsTitleStyle}>{screenData?.title || ''}</Text>
        <View style={{marginHorizontal: wp(5), marginTop: hp(2)}}>
          <Text style={styles.newsHeadingStyle}>{screenData?.title || ''}</Text>
          <Text style={styles.newsDetailsText}>
            {screenData?.description || ''}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: colors.tertiary,
  },
  headerView: {
    width: wp(90),
    height: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBackground: {
    width: wp(10),
    height: hp(5),
    borderRadius: hp(3),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitleStyle: {
    fontFamily: fonts.bold,
    fontSize: hp(2.4),
    color: colors.black,
  },
  newsTitleStyle: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.5),
    color: colors.black,
    alignSelf: 'flex-start',
    marginLeft: wp(8),
    marginTop: hp(1),
  },
  newsHeadingStyle: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2),
    color: colors.black,
  },
  newsDetailsText: {
    fontFamily: fonts.regular,
    fontSize: hp(1.8),
    color: colors.black,
  },
});
