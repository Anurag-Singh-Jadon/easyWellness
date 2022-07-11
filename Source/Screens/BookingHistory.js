import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseurl } from '../Config/baseurl';

const bookingHistory = (props) => {
  const [bookingHistory, setBookingHistory] = useState('');
  const [getTokenId, setTokenId] = useState();
  const[isLoading,setIsLoading] = useState(false); 
  const [getValue, setGetValue] = useState('');
  const [getWard, setWard]  = useState('');


  useEffect(() => {
    userBookinghistory();
    getprvData();
  }, [getTokenId])

  const userBookinghistory = () => {
    setIsLoading(true);
    // console.log('code wise Hospital Book bed')
    axios.get(baseurl+'user/findBookings', { headers: { "Authorization": `Bearer ${getTokenId}` } })
      .then(response => {
               setBookingHistory(response.data)
              }).catch((e) => {
                console.log(e)
            }).finally(() => setIsLoading(false));
  }
   const getprvData = async () =>{
    await AsyncStorage.getItem('tokenId').then(
      (token) =>
                  setTokenId(token)
  )
  AsyncStorage.getItem('Ward').then(
    (value) =>
        setWard(value),
);
AsyncStorage.getItem('Hname').then(
    (hname) =>
        setGetValue(hname),
            );
  }

  return (
    <View style={styles.container}>
       <View style={styles.head}>
        <View style={{ width: wp('30%'), height: hp('4%'), }}>
          <TouchableOpacity onPress={() => props.navigation.goBack("ProfileDetails")} style={{ width: wp('8%'), height: hp('4%'), justifyContent: "center", alignItems: "center" }}>
            <Ionicons name="md-chevron-back" size={hp('3.2%')} color='#fff' />
            {/* <Text style={{ fontFamily: "Roboto-Regular", fontSize: hp('2%'), color: Colors.primaryColor8 }}>Back</Text> */}
          </TouchableOpacity>
        </View>
        <View style={{ width: wp('40%'), height: hp('4%'), alignItems: 'center', }}>
          <Text style={{ fontFamily: "Roboto-Bold", fontSize: hp('2.5%'), color: '#fff', textAlignVertical: "center" }}>Booking History</Text>
        </View>
        <View style={{ width: wp('30%'), height: hp('4%'), }}>
        </View>
      </View>
      {isLoading ? (
                        <ActivityIndicator  color = '#bc2b78'
                        size = "large" style={{ flex:1,alignSelf: 'center', }} />
                    ) : (
      <ScrollView showsVerticalScrollIndicator={false}>
               {bookingHistory.length !== 0 && bookingHistory.map((val) => {
                 console.log("Address========",val.address)
                 console.log(val)
          return (
            <View style={{
              backgroundColor: '#fff', height: hp('17%'),  width: wp('88%'), alignSelf: "center", marginTop: hp('2%'), borderRadius: hp('1%'),
              shadowColor: '#000000',
              elevation: hp('2%')
            }}>
              <View style={{ flexDirection: "row", backgroundColor: '#CCEBFA', height: hp('3%'), width: wp('88%'), borderTopLeftRadius: hp('1%'), borderTopRightRadius: hp('1%'), justifyContent: "space-between", paddingLeft: wp('1.5%'), paddingRight: wp('1.5%'), alignItems: "center" }}>
                <Text style={{ fontFamily: "Roboto-Medium", fontSize: hp('1.5%'), color: '#000' }}>{val.bookingDate},{val.bookingTime}</Text>
                <TouchableOpacity>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: hp('1.5%'), marginRight:wp('1.5%'), color: '#000' }}>{val.bookingStatus}      {val.bookingId}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", height: hp('3.5%'), width: wp('88%'), paddingLeft: wp('1.5%'), alignItems: "center" }}>

                <Text style={{ fontFamily: "Roboto-Medium", fontSize: hp('1.5%'), color: '#0B12E2' }}>{val.bedType}</Text>
              </View>
              <View style={{ flexDirection: "row", height: hp('7%'), width: wp('88%'), justifyContent: "center", borderBottomColor: '#D0D2D2', borderBottomWidth: hp('0.1%'), }}>

                <View style={{ height: hp('6.5%'), width: wp('56.5%'), justifyContent: "center", paddingLeft: wp('1%') }}>
                  <Text style={{ fontFamily: "Roboto-Bold", fontSize: hp('1.5%'), color: '#000000', }}>{getValue}{val.address}</Text>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: hp('1.5%'), color: '#0B12E2' }}>{getWard}</Text>
                </View>
                <View style={{ height: hp('6.5%'), width: wp('30%'), justifyContent: 'center' }}>
                  <TouchableOpacity style={{ width: wp('20%'), height: hp('3.5%'), backgroundColor: '#CCEBFA', borderRadius: hp('0.8%'), alignSelf: "center", justifyContent: "center" }}
                  onPress={() => {
                    AsyncStorage.setItem('Name', val.patientName);
                    AsyncStorage.setItem('Gender', (val.gender));
                    AsyncStorage.setItem('Fathers_Name', (val.fatherHusbandName));
                    AsyncStorage.setItem('Booking_Id', (val.bookingId));
                    AsyncStorage.setItem('Mobile_Number', (val.phone));
                    AsyncStorage.setItem('Policy Number', (val.policyNumber));
                    AsyncStorage.setItem('Date', (val.bookingDate));
                    AsyncStorage.setItem('Time', (val.bookingTime));
                    AsyncStorage.setItem('Hospital_Ward', (val.bedType));
                    AsyncStorage.setItem('address', (val.address));
                    props.navigation.navigate('BookingHistoryTwo');
                  }}
                  >
                    <Text style={{ fontWeight: 'normal', fontSize: hp('1.3%'), color: '#000', textAlign: "center" }}>VIEW DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: wp('88%'), height: hp('3%'), flexDirection: 'row', alignItems: "center" }}>
                <Text style={{ fontFamily: "Roboto-Bold", fontSize: hp('1.5%'), color: '#0B12E2', marginLeft: wp('1.5%') }}>Patient Name</Text>
                <Text style={{ fontFamily: "Roboto-Medium", fontSize: hp('1.5%'), color: '#000000', marginLeft: wp('1.5%') }}>{val.patientName}/22/{val.gender} </Text>
              </View>
            </View>
          )
        })}
      </ScrollView>
                    )}
       </View>
  );
}
export default bookingHistory
const styles = StyleSheet.create({
  container: {

    flex: 1,
   width: wp('100%'),
   height: hp('100%')
  },

  bookingHistory: {
    flexDirection: 'row',
    width: wp('85%'),
    height: hp('7%'),

    alignItems: 'center',
    padding: wp('2%'),
    backgroundColor: '#6495ed',
  },
  head: {
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: Colors.lightBlue,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
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
