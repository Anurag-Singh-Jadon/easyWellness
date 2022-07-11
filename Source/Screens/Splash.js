import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  Animated,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const [getKeyVAlue, setKeyVAlue] = useState('');

  //State for ActivityIndicator Animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('tokenkeyValue').then(
        ky =>{
            if (ky) {
                navigation.navigate('DrawerNavigator');
              } else {
                navigation.navigate('Login');
              }
        })
    }, 2000);
  }, []);

  const getDatakEYValue = async () => {
    try {
      await AsyncStorage.getItem('tokenkeyValue').then(
        ky => setKeyVAlue(ky),
        console.log('get key value-------', getKeyVAlue),
      );
    } catch (error) {
      alert(error);
    }
    console.log('get key value-------', getKeyVAlue);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            width: wp('100%'),
            height: hp('88%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/eHospi.png')}
            style={{
              justifyContent: 'space-between',
              width: wp('55%'),
              height: hp('30%'),
            }}
          />
        </View>
        <View
          style={{
            width: wp('100%'),
            height: hp('8%'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../Assets/Images/india.png')}
            style={{width: wp('5%'), height: wp('5%')}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2%'),
              marginLeft: wp('1%'),
            }}>
            Made in India
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  midContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: hp('12%'),
    width: hp('12%'),
  },
  logoCntnr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.lightYellow,
  },
  blackTxt: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.black,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
