import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

 const bookingHistory = (props) => {
  return (
    <View style={styles.container}>

      {/* 
      <View style={styles.bookingHistory}>
        <Icon name="arrow-left" size={hp('3%')} color={'black'} style={styles.myIcon1} />
        <Text style={styles.text1} >Booking History</Text>

      </View> */}
      <Icon name="clipboard-list" size={hp('16%')}  style={styles.myIcon2} />
      <View style={styles.txtContainer}>
        <Text style={styles.text1}>You haven't booked any Bed yet </Text>
        <Text style={styles.text2}>Get started with your first Bed Booking </Text>
      </View>
      <TouchableOpacity style={styles.bookNow} onPress={ ()=>  props.navigation.navigate('GeneralBeds')}  >
        <Text style={styles.bookNowText} >Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}
export default bookingHistory
const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('7%'),
  },

  bookingHistory: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('7%'),
    
    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#6495ed',
  },

  // myIcon1: {
  //   marginLeft:hp('2%'),
  //    marginTop:hp('0.5%')
  // },

  myIcon2: {
    marginLeft: hp('2%'),
    
  },

  txtContainer: {
    marginTop: hp('2.8%'),
    alignItems: 'center',
  },

  text1: {
    color: 'black',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'DancingScript-Bold',
  },
  text2: {
    color: 'black',
    fontSize: hp('2%'),
    fontWeight: 'bold'
  },

  bookNow: {
    width: wp('25%'),
    height: hp('5%'),
    borderColor: '#2581d4',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('4%'),
    borderRadius: wp('1.5%'),
  },

  bookNowText: {
    color: '#2581d4',
    fontSize: hp('2.5%'),
    fontWeight: 'bold'
  }

});