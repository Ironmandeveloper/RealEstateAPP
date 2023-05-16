import React, {useEffect, useRef, useState} from 'react';
import {
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
import {URL} from '../../Constants/URL';
import {Linking} from 'react-native';

export default function ClassifiedDetails(props) {
  const {classified} = props.route.params;
  const carouselRef = useRef();
  const [data, setData] = useState();
  useEffect(() => {
    GetClassiffiedDetails();
  }, []);
  async function GetClassiffiedDetails() {
    await AppFlow.GetClassiffiedDetails(classified.id)
      .then(function (response) {
        console.log('Classified data', JSON.stringify(response.data, null, 2));
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log('Classified Error', error.response);
      });
  }
  const _renderItem = ({item, index}) => {
    const url = URL.imageURL + item.file;
    return (
      <View style={styles.slide}>
        <Image source={{uri: url}} style={{width: wp(100), height: hp(30)}} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {marginBottom: wp(5)}]}>
          <Carousel
            ref={c => {
              carouselRef.current = c;
            }}
            data={data?.file?.length ? data.file : [allImages.homeImage]}
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
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon
                name={'arrow-back-circle'}
                type={'ionicon'}
                color={colors.primary}
                size={hp(5)}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Hi&phone=${data?.number}`,
                  )
                }>
                <Icon
                  name={'whatsapp'}
                  type={'fontisto'}
                  color={'#25D366'}
                  reverse
                  size={hp(1.5)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => Linking.openURL(`tel:${data?.number}`)}>
                <Icon
                  name={'phone'}
                  type={'material'}
                  color={colors.primary}
                  reverse
                  size={hp(1.5)}
                />
                <Text style={styles.headingText}>Call For Details</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.shareIconStyles}>
                <Icon
                  name={'md-share-social'}
                  type={'ionicon'}
                  color={colors.white}
                  size={hp(1.5)}
                />
              </TouchableOpacity> */}
            </View>
            <Image source={allImages.user} style={styles.userImage} />
          </View>
          <View style={styles.locationPinView}>
            <Icon
              name={'location'}
              type={'ionicon'}
              color={colors.primary}
              size={hp(3)}
            />
          </View>
          <Text style={styles.locationText}>{data?.location || 'N/A'}</Text>
          <Text style={[styles.titleText]}>
            {data?.type || 'N/A'} {data?.category || 'N/A'} for {data?.purpose}
          </Text>
          <View style={styles.amenitiesMainView}>
            <View style={styles.amenitiesSubView}>
              <Icon
                name={'scan1'}
                type={'antdesign'}
                color={colors.primary}
                size={hp(3)}
              />
              <Text style={styles.amenitiesText}>
                {data?.size} {data?.size_unit}
              </Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.amenitiesSubView}>
              <Icon
                name={'bed'}
                type={'ionicon'}
                color={colors.primary}
                size={hp(3)}
              />
              <Text style={styles.amenitiesText}>{data?.bed} Bedroom</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.amenitiesSubView}>
              <Icon
                name={'bath'}
                type={'font-awesome-5'}
                color={colors.primary}
                size={hp(2.5)}
              />
              <Text style={styles.amenitiesText}>{data?.bath}</Text>
            </View>
          </View>
          <Text style={styles.addTitle}>{data?.title}</Text>
          <Text style={styles.descText}>Description</Text>
          <Text style={styles.descDetailsText}>{data?.description}</Text>
          {/* <Text style={styles.descText}>Location</Text>
          <TouchableOpacity>
            <Image
              source={allImages.map}
              style={{height: hp(25), width: wp(85)}}
            />
            <View style={styles.mapFabView}>
              <Icon
                name={'directions-fork'}
                type={'material-community'}
                color={colors.primary}
                size={hp(4)}
                style={styles.mapFab}
              />
            </View>
          </TouchableOpacity> */}
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
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  shareIconStyles: {
    padding: 10,
    backgroundColor: '#2726267D',
    borderRadius: 20,
  },
  userImage: {
    width: hp(15),
    height: hp(15),
    borderRadius: hp(8),
    position: 'absolute',
    bottom: hp(-30),
    right: wp(30),
    zIndex: 100,
  },
  locationPinView: {
    elevation: 10,
    marginTop: hp(9),
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
  },
  amenitiesText: {
    color: colors.white,
    fontFamily: fonts.regular,
    marginLeft: wp(2),
    fontSize: hp(1.8),
  },
  locationText: {
    color: colors.black,
    fontFamily: fonts.regular,
    marginVertical: hp(1),
    fontSize: hp(1.8),
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    fontSize: hp(2.2),
    marginVertical: hp(1),
  },
  amenitiesMainView: {
    backgroundColor: colors.black,
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: 5,
  },
  amenitiesSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seperator: {
    width: 2,
    height: hp(3),
    backgroundColor: colors.white,
    marginHorizontal: 5,
  },
  descText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    width: wp(85),
    fontSize: hp(2),
    marginTop: hp(1),
  },
  addTitle: {
    color: colors.black,
    fontFamily: fonts.bold,
    width: wp(85),
    fontSize: 20,
    marginTop: hp(2),
  },
  descDetailsText: {
    color: colors.black,
    fontFamily: fonts.regular,
    width: wp(85),
    fontSize: hp(1.8),
  },
  agencyProfileImage: {
    width: hp(10),
    height: hp(10),
    backgroundColor: colors.white,
    borderRadius: hp(7),
  },
  agencyNameText: {
    color: colors.black,
    fontFamily: fonts.regular,
    marginVertical: hp(0.5),
  },
  postByText: {
    color: colors.grey,
    fontFamily: fonts.regular,
    fontSize: hp(1.5),
  },
  btnContainer: {
    width: wp(22),
    height: hp(3.5),
    backgroundColor: colors.primary,
    borderRadius: hp(6),
    marginVertical: hp(0.5),
  },
  btnTextStyles: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: hp(1.5),
  },
  fabImage: {
    width: hp(5),
    height: hp(5),
    backgroundColor: colors.white,
    borderRadius: hp(7),
  },
  fabView: {
    position: 'absolute',
    right: wp(5),
    elevation: 10,
  },
  mapFab: {
    backgroundColor: colors.black,
    width: hp(5),
    height: hp(5),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapFabView: {position: 'absolute', bottom: hp(1), right: wp(1)},
});
