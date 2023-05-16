import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../Constants/Colors';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../../Constants/Responsive';
import {allImages} from '../../Constants/Images';
import {fonts} from '../../Constants/Fonts';
import Carousel from 'react-native-snap-carousel';
import CustomButton from '../../Components/CustomButton';
import {AppFlow} from '../../Api/ApiCalls';
import CustomLoader from '../../Components/CustomLoader';

export default function PackageDetails(props) {
  const {planId} = props.route.params;
  const [screenData, setScreenData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getPlan();
  }, []);

  async function getPlan() {
    AppFlow.getPaymentPlan(planId?.id || 1)
      .then(res => {
        console.log(JSON.stringify(res.data, null, 2), 'respose');
        setScreenData(res?.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }
  const carouselRef = useRef();
  const _renderItem = ({item, index}) => {
    console.log(item);
    return (
      <View style={styles.slide}>
        <Image source={{uri: item}} style={{width: wp(100), height: hp(30)}} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomLoader isLoading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {marginBottom: wp(5)}]}>
          <Carousel
            ref={c => {
              carouselRef.current = c;
            }}
            data={[
              allImages.homeImage,
              allImages.homeImage,
              allImages.homeImage,
            ]}
            renderItem={_renderItem}
            sliderWidth={wp(100)}
            itemWidth={wp(100)}
            autoplay={true}
            loop={true}
          />
          <View style={styles.bothChevronsView}>
            <TouchableOpacity
              onPress={() => carouselRef.current.snapToPrev()}
              style={styles.chevron}>
              <Icon
                name={'chevron-back-circle-outline'}
                type={'ionicon'}
                color={colors.white}
                size={hp(2)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => carouselRef.current.snapToNext()}
              style={styles.chevron}>
              <Icon
                name={'chevron-forward-circle-outline'}
                type={'ionicon'}
                color={colors.white}
                size={hp(2)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon
                name={'arrow-back-circle'}
                type={'ionicon'}
                color={colors.primary}
                size={hp(5)}
              />
            </TouchableOpacity>
            <Text style={styles.headingText}>Standard </Text>
            <View style={styles.societyTextView}>
              <Text style={styles.townText}>Home</Text>
              <Icon
                name={'home'}
                type={'font-awesome'}
                color={colors.black}
                size={hp(2)}
                style={{marginLeft: 10}}
              />
              <View style={styles.seperator} />
              <Text style={styles.townText}>5-Marla</Text>
              <Icon
                name={'scan1'}
                type={'antdesign'}
                color={colors.black}
                size={hp(2)}
                style={{marginLeft: 10}}
              />
            </View>
          </View>
          <Text style={styles.descText}>Payment Plan</Text>
          <View style={styles.listHeaderView}>
            <Text style={styles.listTedxtStyles}>Payment Plan</Text>
            <Text style={styles.listTedxtStyles}>Payment Plan</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>Total Price</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>Down Payment</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>After Two Months</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>5 Marla Installments</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>Baloon Payments</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
          <View style={styles.bothTextView}>
            <Text style={styles.listingText}>On Posession</Text>
            <Text style={styles.listingText}>1,800,000</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  bothChevronsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(95),
    position: 'absolute',
    top: hp(12),
  },
  chevron: {
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    position: 'absolute',
    top: hp(2),
  },
  headingText: {
    color: colors.white,
    fontFamily: fonts.regular,
    padding: 5,
    backgroundColor: '#2726267D',
    borderRadius: 40,
    paddingHorizontal: 10,
    marginRight: wp(3),
  },
  societyTextView: {
    height: hp(5),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    borderRadius: hp(1),
    position: 'absolute',
    bottom: hp(-26),
    left: wp(23),
    zIndex: 1000,
  },
  townText: {
    fontFamily: fonts.bold,
    color: colors.white,
    fontSize: hp(1.5),
  },
  seperator: {
    height: hp(3),
    width: wp(0.5),
    backgroundColor: colors.white,
    marginHorizontal: wp(2),
  },
  descText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: hp(2),
  },
  listHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp(90),
    backgroundColor: colors.white,
    marginTop: hp(5),
    paddingVertical: hp(1),
    borderRadius: hp(5),
  },
  listTedxtStyles: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: hp(1.8),
  },
  bothTextView: {
    width: wp(75),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginVertical: hp(0.3),
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  listingText: {
    fontFamily: fonts.regular,
    fontSize: hp(2),
    color: colors.grey,
  },
});
