import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../Constants/Colors';
import {Icon} from '@rneui/themed';
import {hp, wp} from '../../Constants/Responsive';
import {allImages} from '../../Constants/Images';
import {fonts} from '../../Constants/Fonts';
import CustomButton from '../../Components/CustomButton';
import {AppFlow} from '../../Api/ApiCalls';
import {URL} from '../../Constants/URL';
import CustomLoader from '../../Components/CustomLoader';
import Toast from 'react-native-simple-toast';

export default function AgencyProfile(props) {
  const {agency} = props.route.params;
  const [agencyData, setAgencyData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getAgencyDetails();
  }, []);
  async function getAgencyDetails() {
    console.log(agency);
    setIsLoading(true);
    AppFlow.getAgencyDetail(agency?.id)
      .then(res => {
        console.log(
          'response getting agency details',
          JSON.stringify(res, null, 2),
          // res,
        );
        setAgencyData(res?.data?.data);
      })
      .catch(err => {
        console.log(
          'error getting agency details',
          JSON.stringify(err, null, 2),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const handleClickSocial = url => {
    const check = url.includes('https://');
    Linking.canOpenURL(check ? url : `https://${url}`).then(supported => {
      if (supported) {
        if (check) {
          Linking.openURL(url);
        } else {
          Linking.openURL('https://' + url);
        }
      } else {
        Toast.show('Cannot Open' + url, Toast.SHORT);
        console.log("Don't know how to open URI: " + url);
      }
    });
  };
  return (
    <View style={styles.container}>
      <CustomLoader isLoading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Icon
                name={'arrow-back-circle'}
                type={'ionicon'}
                color={colors.primary}
                size={hp(5)}
              />
            </TouchableOpacity>
            <Text style={styles.headingText}>Agency Details</Text>
            <View></View>
          </View>

          <View style={styles.topMainView}>
            <Image
              source={
                agencyData?.file?.length
                  ? {uri: URL.imageURL + agencyData.file[0].file}
                  : allImages.agencydummy
              }
              style={styles.agencyProfileImage}
            />
            <View style={{marginLeft: wp(5), marginBottom: hp(1.5)}}>
              <Text style={styles.agencyNameText}>
                {agencyData?.name || 'Loading'}
              </Text>
              <Text style={styles.postByText}>
                By {agencyData?.ceo_name || 'Loading'}
              </Text>
            </View>
            <View style={styles.topTextView}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `tel:${agencyData?.ceo_mobile1 || '00000000'}`,
                  )
                }>
                <Image
                  source={allImages.call}
                  style={{width: hp(4), height: hp(4)}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Hi&phone=${agencyData?.whatapp_no}`,
                  )
                }>
                <Image
                  source={allImages.whatsapp}
                  style={{width: hp(4), height: hp(4)}}
                />
              </TouchableOpacity>
              <CustomButton
                btnText="Properties"
                indicator={false}
                onPress={() =>
                  props.navigation.navigate('AgencyProperties', {
                    id: agencyData.id,
                  })
                }
                btnContainer={styles.btnContainer}
                btnTextStyles={styles.btnTextStyles}
              />
            </View>
          </View>
          <Text style={styles.descText}>Location</Text>
          <Text style={{...styles.descDetailsText, marginBottom:hp(2)}}>
            {agencyData?.address || 'Loading'}{' '}
          </Text>
          {/* <Image
            source={allImages.map}
            style={{height: hp(25), width: wp(85), marginVertical: hp(1)}}
          /> */}
          <Text style={styles.connectionsText}>Social Connections</Text>
          <View
            style={{
              flexDirection: 'row',
              width: wp(55),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                agencyData?.facebook != '' || null
                  ? handleClickSocial(agencyData?.facebook)
                  : null;
              }}>
              <Icon
                type="material-community"
                name="facebook"
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                agencyData?.youtube != '' || null
                  ? handleClickSocial(agencyData?.youtube)
                  : null;
              }}>
              <Icon
                type="material-community"
                name="youtube"
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                agencyData?.instagram != '' || null
                  ? handleClickSocial(agencyData?.instagram)
                  : null;
              }}>
              <Icon
                type="material-community"
                name="instagram"
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                agencyData?.twitter != '' || null
                  ? handleClickSocial(agencyData?.twitter)
                  : null;
              }}>
              <Icon
                type="material-community"
                name="twitter"
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                agencyData?.website != '' || null
                  ? handleClickSocial(agencyData?.website)
                  : null;
              }}>
              <Icon
                type="material-community"
                name="web"
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.seperator} />
          {agencyData?.team?.length ? (
            <Text style={[styles.connectionsText, {marginVertical: hp(2)}]}>
              Team
            </Text>
          ) : null}
          {agencyData?.team?.length
            ? agencyData.team?.map((item, index) => {
                return (
                  <View style={styles.listMainView} key={index}>
                    <Image
                      source={
                        agencyData?.file?.length
                      ? {uri: URL.imageURL + agencyData.file[0].file}
                          : allImages.agencydummy
                      }
                      style={styles.agencyTeamImage}
                    />
                    <View style={styles.listNameView}>
                      <View style={{justifyContent: 'space-around'}}>
                        <Text style={styles.agentNameText}>
                          {item?.name || 'Loading'}
                        </Text>
                        <Text style={styles.agentDesgText}>
                          {item?.phone || 'Loading'}
                        </Text>
                      </View>
                      <View style={styles.teamContIcons}>
                        <TouchableOpacity
                          onPress={() => Linking.openURL(`tel:${item?.phone}`)}>
                          <Image
                            source={allImages.call}
                            style={{width: hp(6), height: hp(6)}}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `whatsapp://send?phone=${item?.whatsapp_no}`,
                            )
                          }>
                          <Image
                            source={allImages.whatsapp}
                            style={{width: hp(6), height: hp(6)}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.tertiary, alignItems: 'center'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(90),
    marginVertical: hp(2),
  },
  headingText: {color: colors.black, fontFamily: fonts.bold},
  topMainView: {
    width: wp(90),
    height: hp(18),
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },
  topTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(5),
    bottom: hp(1),
  },
  teamContIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agencyProfileImage: {
    width: hp(10),
    height: hp(10),
    backgroundColor: colors.white,
    borderRadius: hp(7),
    borderWidth: 1,
    borderColor: colors.black,
  },
  agencyTeamImage: {
    width: hp(8),
    height: hp(8),
    backgroundColor: colors.white,
    borderRadius: hp(7),
    borderWidth: 1,
    borderColor: colors.black,
  },
  agencyNameText: {
    color: colors.black,
    fontFamily: fonts.bold,
    marginVertical: hp(0.5),
    fontSize: hp(1.8),
  },
  postByText: {
    color: colors.grey,
    fontFamily: fonts.regular,
    fontSize: hp(1.8),
  },
  btnContainer: {
    width: wp(22),
    height: hp(3),
    backgroundColor: colors.black,
    borderRadius: hp(6),
    marginVertical: hp(0.5),
  },
  btnTextStyles: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: hp(1.3),
  },
  descText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    width: wp(85),
    fontSize: hp(2),
    marginTop: hp(2),
  },
  descDetailsText: {
    color: colors.black,
    fontFamily: fonts.regular,
    width: wp(85),
    fontSize: hp(1.8),
  },
  connectionsText: {
    color: colors.black,
    fontFamily: fonts.bold,
    fontSize: hp(2),
  },
  socialIcon: {width: hp(4), height: hp(4), marginHorizontal: wp(2)},
  teamAgentProfile: {
    width: hp(10),
    height: hp(10),
    backgroundColor: colors.white,
    borderRadius: hp(7),
  },
  listMainView: {
    width: wp(90),
    flexDirection: 'row',
    marginVertical: hp(1),
    alignItems: 'center',
  },
  listNameView: {
    width: wp(75),
    flexDirection: 'row',
    marginVertical: hp(1),
    paddingHorizontal: wp(2),
    borderBottomWidth: 0.8,
    borderBottomColor: colors.grey,
    justifyContent: 'space-between',
  },
  agentNameText: {
    fontFamily: fonts.bold,
    fontSize: hp(1.8),
    color: colors.black,
  },
  agentDesgText: {
    fontFamily: fonts.regular,
    fontSize: hp(1.8),
    color: colors.grey,
  },
  seperator: {
    marginTop: hp(2),
    backgroundColor: colors.grey,
    height: 1,
    width: wp(90),
  },
  indicator: {
    width: wp(100),
    height: hp(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
