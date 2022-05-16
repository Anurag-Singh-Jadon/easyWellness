import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { RadioButton } from 'react-native-paper';
import Promotion from '../ReusableComponent/Promotion';
import BedReact from '../ReusableComponent/BedReact';
import HospBed from '../Assets/Images/hospbed.png';
import Doctor2 from '../Assets/Images/doctor2.png';
import Medicine from '../Assets/Images/medicine.png';
import DoctorDepartment from '../ReusableComponent/DoctorDepartment';
import Flask from '../Assets/Images/flask.png';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CardImages from '../ReusableComponent/Cardimages';
// import Bed1 from '../Assets/Images/BedSet/Bed1.png';
// import Bed2 from '../Assets/Images/BedSet/Bed2.png';
// import Bed3 from '../Assets/Images/BedSet/Bed3.png';
// import Bed4 from '../Assets/Images/BedSet/Bed4.png';
// import Bed5 from '../Assets/Images/BedSet/Bed5.png';

const Home = ({ navigation }) => {
  // const  itemId  = route.params;
  // const manualVal =  props.params.firstName;
  // console.log('first name value' +manualVal )
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [checked, setChecked] = React.useState('Insurance');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [getValue, setGetValue] = useState('');
  const [getLocation, setLocation] = useState('');
  // console.log('getvalue data' + getValue);
  useEffect(() => {
    getValueFunction();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '/' + month + '/' + year);
    setCurrentTime(hours + ':' + min + ':' + sec);
  }, []);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = React.useState('Male');

  const getValueFunction = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('any_key_here').then(
      value =>
        // AsyncStorage returns a promise
        // Adding a callback to get the value
        setGetValue(value),
      // Setting the value in Text

      //   alert(getValue);
      // console.log('first value=====' + getValue),
    );
  };
  const MyLocation = async () => {
    var lat, long;
    console.log('onpress');
    const p = Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        axios.get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          currentLatitude +
          ',' +
          currentLongitude +
          '&key=AIzaSyDdsdP84i7BKJhB7dYY6R0pBguoEVr55UU',
        ).then(res => {
          let location = res.data.results[res.data.results.length - 6].address_components[0].long_name + ", " + res.data.results[res.data.results.length - 6].address_components[1].long_name
          console.log(location);
          setLocation(location)
        });

      },

      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }

    );


    // Axios.get(
    //     'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    //       lat +
    //       ',' +
    //       long +
    //       '&key=AIzaSyDdsdP84i7BKJhB7dYY6R0pBguoEVr55UU',
    //   ).then(res => {
    //     console.log('get data');
    //     console.log(lat, long);
    //     console.log(res.data);
    //   });

  };
  return (
    <SafeAreaView>
      <View style={styles.contnr}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#B2F3FF', '#0489D6']}
          style={{
            borderBottomLeftRadius: hp('3%'),
            borderBottomRightRadius: hp('3%'),
          }}>
          <View
            style={{
              width: wp('100%'),
              height: hp('15%'),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: wp('35%'),
                height: hp('9%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('1.7%'),
                  color: Colors.white,
                }}>
                {' '}
                {currentDate}{' '}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: hp('1.7%'),
                  color: Colors.white,
                }}>
                {currentTime}
              </Text>
            </View>
            <View
              style={{
                width: wp('30%'),
                height: hp('9%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <TouchableOpacity onPress={() => navigation.navigate('Location')}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), color: Colors.white, }}>Your Location </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.5%'), color: Colors.white, }}>Noida Sector 62 </Text>
                            </TouchableOpacity> */}
              <TouchableOpacity onPress={MyLocation} style={{ width: wp('40%'), alignItems: "center", justifyContent: 'center' }}>
                {/* <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('1.5%'),
                    color: Colors.white,
                  }}>
                 {}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: hp('1.5%'),
                    color: Colors.white,
                  }}>
                  Noida Sector 62{' '}
                </Text> */}
                <Ionicons
                  name="md-location-sharp"
                  size={hp('2.8%')}
                  style={{ color: '#ffff', }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: hp('1.7%'), color: '#ffff' }}>{getLocation}</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', padding: wp('2%'), }}>
                        <FontAwesome5Icon name='bars' color={Colors.white} size={hp('4%')} />
                        <View style={{ marginLeft: hp('2%') }}>
                            <TouchableOpacity><Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.white }}>Your Location</Text></TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.white }}>Sector 62 </Text>
                        </View>
                    </View> */}
            {/* <Image source={require('../Assets/Images/doctor.jpg')}
                        style={{ width: wp('18%'), height: wp('18%'), borderRadius: hp('5%') }} /> */}
          </View>
        </LinearGradient>
        <Searchbar
          style={{
            width: wp('85%'),
            alignSelf: 'center',
            marginTop: -hp('3.5%'),
            borderRadius: hp('5%'),
          }}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View
          style={{
            width: wp('100%'),
            height: hp('63%'),
            marginTop: hp('1.5%'),
            paddingTop: wp('2%'),
          }}>
          <View style={{ height: hp('55%') }}>
            <ScrollView showsVerticalScrollIndicator={false} >
              {/* <View style={{ width: wp('85%'), height: hp('5%'), backgroundColor: Colors.white, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius:hp('1%') }}>
                            <Text>Payment Mode</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="first"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('first')}
                                />
                                <Text>Self Pay</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="second"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('second')}
                                />
                                <Text>Insurance</Text>
                            </View>
                        </View> */}
              {/* <View
                style={{
                  width: wp('95%'),
                  height: hp('5%'),
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  borderRadius: hp('1%'),
                }}>
                <Text>Payment Mode</Text>
                {/* <Text style={{ fontSize: 18, marginBottom: 50 }}>
          Value = {selectedButton}
        </Text> */}
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="first"
                  status={isChecked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked('first')}
                />
                <Text>Self Pay</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Insurance"
                  status={isChecked === 'Insurance' ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked('Insurance')}
                />
                <Text>{checked}</Text>
              </View>
              <TouchableOpacity onPress={() => setVisible(!visible)}>
                <AntDesign
                  name="caretdown"
                  size={hp('2%')}
                  style={{ padding: hp('0.8%') }}
                />
              </TouchableOpacity>
          </View> 
          {visible && (
            <View
              style={{
                width: wp('95%'),
                height: hp('15%'),
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  width: wp('40%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="Self Insurance"
                  status={
                    checked === 'Self Insurance' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('Self Insurance')}
                />
                <Text>Self Insurance</Text>
              </View>

              <View
                style={{
                  width: wp('40%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="Family Insurance"
                  status={
                    checked === 'Family Insurance' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('Family Insurance')}
                />
                <Text>Family Insurance</Text>
              </View>
              <View
                style={{
                  width: wp('40%'),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton
                  value="Your Insurance"
                  status={
                    checked === 'Your Insurance' ? 'checked' : 'unchecked'
                  }
                  onPress={() => setChecked('Your Insurance')}
                />
                <Text>Your Insurance</Text>
              </View>
            </View>
          )} */}



              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Promotion />
                <Promotion />
                <Promotion />
                <Promotion />
              </ScrollView>
              <View
                style={{
                  width: wp('95%'),
                  height: wp('34%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                }}>
                <Text style={{ fontWeight:'bold' }}>Search by Category</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <DoctorDepartment
                    name="tooth"
                    t1="Dentist"
                    source={require('../Assets/Images/Teeth.png')}
                  />
                  <DoctorDepartment
                    name="heartbeat"
                    t1="Cardiologist"
                    source={require('../Assets/Images/Cardio.png')}
                  />
                  <DoctorDepartment
                    name="eye"
                    t1="Neurologist"
                    source={require('../Assets/Images/Opthelmo.png')}
                  />
                  <DoctorDepartment
                    name="child"
                    t1="Gynecologist"
                    source={require('../Assets/Images/Gyneco.png')}
                  />
                  <DoctorDepartment
                    name="eye"
                    t1="Dermatologist"
                    source={require('../Assets/Images/Nephro.png')}
                  />
                  <DoctorDepartment
                    name="lungs"
                    t1="Nephrologist"
                    source={require('../Assets/Images/Oncologist.png')}
                  />
                  <DoctorDepartment
                    name="shield-virus"
                    t1="Oncologist"
                    source={require('../Assets/Images/Oncologist.png')}
                  />
                  <DoctorDepartment
                    name="child"
                    t1="Gynecologist"
                    source={require('../Assets/Images/Gyneco.png')}
                  />
                </ScrollView>
              </View>
              <View
                style={{
                  width: wp('95%'),
                  height: wp('34%'),
                  alignSelf: 'center',
                }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <DoctorDepartment
                    name="eye"
                    t1="Dermatologist"
                    source={require('../Assets/Images/Nephro.png')}
                  />
                  <DoctorDepartment
                    name="lungs"
                    t1="Nephrologist"
                    source={require('../Assets/Images/Oncologist.png')}
                  />
                  <DoctorDepartment
                    name="shield-virus"
                    t1="Oncologist"
                    source={require('../Assets/Images/Oncologist.png')}
                  />
                  <DoctorDepartment
                    name="child"
                    t1="Gynecologist"
                    source={require('../Assets/Images/Gyneco.png')}
                  />
                  <DoctorDepartment
                    name="tooth"
                    t1="Dentist"
                    source={require('../Assets/Images/Teeth.png')}
                  />
                  <DoctorDepartment
                    name="heartbeat"
                    t1="Cardiologist"
                    source={require('../Assets/Images/Cardio.png')}
                  />
                  <DoctorDepartment
                    name="eye"
                    t1="Neurologist"
                    source={require('../Assets/Images/Opthelmo.png')}
                  />
                  <DoctorDepartment
                    name="child"
                    t1="Gynecologist"
                    source={require('../Assets/Images/Gyneco.png')}
                  />
                </ScrollView>
              </View>
              <View
                style={{
                  width: wp('95%'),
                  height: wp('34%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                  padding: wp('1%'),
                }}>
                <Text style={{ fontWeight: 'bold', marginLeft: wp('2%') }}>
                  Our Offering
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <BedReact
                    title="Bed Booking"
                    image={HospBed}
                    onPress={() => navigation.navigate('GeneralBeds')}
                  />
                  <BedReact
                    title="Consultation"
                    image={Doctor2}
                    onPress={() => navigation.navigate('Consultation')}
                  />
                  <BedReact
                    title="Lab Tests"
                    image={Flask}
                    onPress={() => navigation.navigate('LabTest')}
                  />
                  <BedReact
                    title="Medicines"
                    image={Medicine}
                    onPress={() => navigation.navigate('Medicines')}
                  />
                </View>
              </View>
              <Image
                source={require('../Assets/Images/Ambulance.jpg')}
                style={{
                  width: wp('90%'),
                  height: wp('23%'),
                  borderRadius: hp('1.5%'),
                  marginTop: hp('2%'),
                  alignSelf: 'center',
                }}
              />

              <View
                style={{
                  width: wp('100%'),
                  height: wp('47%'),
                  marginTop: hp('1%'),
                  alignSelf: 'center',
                  padding: wp('1%'),
                  marginBottom: hp('1%'),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginLeft: wp('2%'),
                    fontSize: hp('2.5%'),
                    marginLeft: wp('4%'),
                    marginTop: hp('1%'),
                  }}>
                  Near By Hospitals
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: Colors.greenSyan,
                      alignSelf: 'flex-end',
                    }}>
                    view all
                  </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      width: wp('25%'),
                      height: hp('17%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('HospitalDetailScreen')}>
                      <Image
                        source={require('../Assets/Images/Apollo.jpg')}
                        style={{
                          width: wp('20%'),
                          height: wp('20%'),
                          borderRadius: hp('1.5%'),
                          marginTop: hp('2%'),
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp('1.5%'),
                        marginTop: hp('1%'),
                      }}>
                      Apollo Hospital
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('25%'),
                      height: hp('17%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assets/Images/Fortis.png')}
                      style={{
                        width: wp('20%'),
                        height: wp('20%'),
                        borderRadius: hp('1.5%'),
                        marginTop: hp('2%'),
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp('1.5%'),
                        marginTop: hp('1%'),
                      }}>
                      Fortis Hospital
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('25%'),
                      height: hp('17%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assets/Images/Apollo.jpg')}
                      style={{
                        width: wp('20%'),
                        height: wp('20%'),
                        borderRadius: hp('1.5%'),
                        marginTop: hp('2%'),
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp('1.5%'),
                        marginTop: hp('1%'),
                      }}>
                      Max Hospital
                    </Text>
                  </View>
                  <View
                    style={{
                      width: wp('25%'),
                      height: hp('17%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={require('../Assets/Images/Aiims.png')}
                      style={{
                        width: wp('20%'),
                        height: wp('20%'),
                        borderRadius: hp('1.5%'),
                        marginTop: hp('2%'),
                      }}
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: hp('1.5%'),
                        marginTop: hp('1%'),
                      }}>
                      AIIMS
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View >
    </SafeAreaView >
  );
};
export default Home;

const styles = StyleSheet.create({
  contnr: {
    width: wp('100%'),
    height: hp('100%'),
  },
  view: {
    margin: 10,
  },
});
