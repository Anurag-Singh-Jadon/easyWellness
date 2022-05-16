import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import Colors from '../Assets/Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Tab, Text, TabView, colors } from 'react-native-elements';
import About from '../Screens/About';
import Department from '../Screens/Department';
import HomeScreen from '../Screens/BookBed';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BookBed from '../Screens/BookBed';
import { color } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDirections from 'react-native-google-maps-directions'
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import axios from 'axios';
import { baseurl } from '../Config/baseurl';



const HospitalDetailScreen = ({ route, navigation }) => {
    const [index, setIndex] = React.useState(0);
    const _isMounted = useRef(true);
    const [getLocation, setGetLocation] = useState('');
    const [getValue, setGetValue] = useState('');
    const [theArray, setTheArray] = useState([]);
    const [getHospitalCode,setHospitalCode] = useState([]);
    const [getServices,setServices] = useState([]);
    // const hospitalDetails = route.params;
     const HLat = 28.621309
     const HLong = 77.365471
    //    console.log(HLat,HLong)
    const HandleGetDirections = () => {
        const data = {
            source: {
                latitude: 28.621309,
                longitude: 77.365471
            },
            destination: {
                latitude: HLat,
                longitude: HLong
            },
            params: [
                {
                    key: "travelmode",
                    value: "driving"        // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: "dir_action",
                    value: "navigate"       // this instantly initializes navigation using the given travel mode
                }
            ],
            waypoints: [
                {
                    latitude: HLat,
                    longitude: HLong
                },
                {
                    latitude: HLat,
                    longitude: HLong
                },
                {
                    latitude: HLat,
                    longitude: HLong
                }
            ]
        }
        getDirections(data)
    }
    const [pin, setPin] = React.useState({
        // latitude: 37.78825,
        // longitude: -122.4324
        latitude: 28.6267895,
        longitude: 77.3724016
    })
    const [region, setRegion] = React.useState({
        latitude: HLat,
        longitude: HLong,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    
    useEffect(() => {
        displayData();
       // userServicesData();
       HospitalDataServices();
        _isMounted.current = false;
    });
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('Hname').then(
                (Hname) =>
                    setGetValue(Hname),
                //   setGetLocation(Location)
            )
            let user2 = await AsyncStorage.getItem('Hcode').then(
                (code) =>
                    //   setGetValue(Hname),
                    setHospitalCode(code)
            )

        }
        catch (error) {
            alert(error)
        }
    }
    const HospitalDataServices = () => {
      
        axios.get('http://10.0.2.2:8000/user/findServices/' + getHospitalCode, { headers: { "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDg5NTA2MTIzNTIiLCJpYXQiOjE2NTI2NzcxOTAsImV4cCI6MTY1Mjc2MzU5MH0.o8UV_ikmevKxUXAG1UC9Rn0fDIR1mhBtK8zEeGvh81Q'}` } })
            .then(response => {
                  // console.log(response.data)
                // console.log(response.data[0].details)
                setServices(response.data[0].details)
              // console.log(getServices);
                // console.log(response.data[0].details[1].services)
            })
    }
   
    return (
        <View style={styles.contr}>
                       <View style={styles.imgSlider}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/img01.jpg')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                </ScrollView>
            </View>
            <View style={{ padding: wp('2%'), height: hp('8%'), }}>
                <Text style={{ fontSize: hp('2.5%'), color: Colors.black, fontWeight: 'bold', }}>{getValue}</Text>
                <Text style={{ fontSize: hp('1.8%'), color: Colors.black, }}>{getHospitalCode}</Text>
            </View>
            <View style={{ width: wp('100%'), height: hp('7%'), flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#00abf6', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }}  >
                    <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => navigation.navigate('Department')} >
                    <Text>Department</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => navigation.navigate('BookBed')}>
                    <Text>Bed Booking</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.lowerContainer}>
                <View style={{ height: hp('55%') }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: wp('100%'), height: hp('16%'), }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), color: Colors.darkGray, marginLeft: wp('1%') }}>Services</Text>
                            <View style={{ marginTop: hp('1%'), }}>
                                {getServices.length !== 0 && getServices.map((val) => {
                                    return (
                                        <Text style={{ color: Colors.black, fontSize: hp('1.5%'), marginLeft: wp('1%') }}>{val.services}</Text>
                                    )

                                })}
                            </View>
                        </View>
                        {/* <TouchableOpacity>
                            <Text style={{ marginTop: hp('2%'), color: Colors.blue }}>+5 more</Text>
                        </TouchableOpacity> */}

                        {/* <Text style={{fontSize:16}}>Address</Text> */}
                        {/* <Image source={require('../Assets/Images/map.png')}
                            style={{ width: wp('100%'), height: hp('30%'), borderRadius: hp('1.5%'), marginTop: hp('2%'), }} /> */}
                        <View style={{ width: wp('96%'), height: hp('32%'), alignSelf: 'center', borderRadius: hp('1%') }}>

                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 28.6267895,
                                    longitude: 77.3724016,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                provider="google"
                            >
                                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                                <Marker
                                    coordinate={pin}
                                    pinColor="red"
                                    draggable={true}
                                    onDragStart={(e) => {
                                        console.log("Drag start", e.nativeEvent.coordinates)
                                    }}
                                    onDragEnd={(e) => {
                                        setPin({
                                            latitude: e.nativeEvent.coordinate.latitude,
                                            longitude: e.nativeEvent.coordinate.longitude
                                        })
                                    }}
                                >
                                    <Callout>
                                        <Text >I'm here</Text>
                                    </Callout>
                                </Marker>
                            </MapView>
                        </View>

                        {/* <View style={{ width: wp('100%'), height: hp('8%'), backgroundColor: 'pink' }}> */}
                        <TouchableOpacity style={{ width: wp('100%'), height: hp('7%'), backgroundColor: Colors.skyblue, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: hp('3%') }} onPress={HandleGetDirections}>
                            <Text style={{ fontWeight: 'bold', color: Colors.white, fontSize: hp('3%') }}>Get Directions</Text>
                        </TouchableOpacity>
                        {/* </View> */}

                    </ScrollView>

                </View>


            </View>


        </View>

    )
}


export default HospitalDetailScreen;
const styles = StyleSheet.create({
    contr: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: Colors.white
    },
    imgSlider: {
        width: wp('100%'),
        height: hp('30%')
    },
    lowerContnr: {
        width: wp('100%'),
        height: hp('55%'),

    },
    map: {
        width: wp('96%'),
        height: hp('32%'),
        alignSelf: 'center',
        borderRadius: hp('1%')


    }

})