import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDirections from 'react-native-google-maps-directions'
import { baseurl } from '../Config/baseurl';
import axios from 'axios';
const Services = baseurl + 'addservices'
const ServicesApi = 'https://updated-ehospi-apis.herokuapp.com/findbyhname/';


const About = (props) => {
    const [getLocation, setGetLocation] = useState('');
    const [getValue, setGetValue] = useState('');
    const [theArray, setTheArray] = useState([]);
    const [pin, setPin] = React.useState({
        // latitude: 37.78825,
        // longitude: -122.4324
        latitude: 28.6267895,
        longitude: 77.3724016
    })
    const [region, setRegion] = React.useState({
        latitude: 28.6267895,
        longitude: 77.3724016,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    useEffect(() => {
        displayData();
        userServicesData();
    });
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('Hname').then(
                (Hname) =>
                    setGetValue(Hname),
                //   setGetLocation(Location)
            )
            let user2 = await AsyncStorage.getItem('Location').then(
                (Location) =>
                    //   setGetValue(Hname),
                    setGetLocation(Location)
            )

        }
        catch (error) {
            alert(error)
        }
    }
    const userServicesData = async () => {
        //console.log('Data is coming')
        const configurationObject = {
            method: 'get',
            url: ServicesApi + 'JP Hospital',
        }
        axios(configurationObject).then((result) => {
            setTheArray(result.data)
            //console.log(result.data)
        });
    }
    const storeServices = theArray.services;


    const HandleGetDirections = () => {
        const data = {
            source: {
                latitude: -33.8356372,
                longitude: 18.6947617
            },
            destination: {
                latitude: -33.8600024,
                longitude: 18.697459
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
                    latitude: -33.8600025,
                    longitude: 18.697452
                },
                {
                    latitude: -33.8600026,
                    longitude: 18.697453
                },
                {
                    latitude: -33.8600036,
                    longitude: 18.697493
                }
            ]
        }

        getDirections(data)
    }

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <View style={styles.imgSlider}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                        <Image source={require('../Assets/Images/img01.jpg')} style={{ width: wp('100%'), height: hp('30%'), }} />
                        <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                        <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    </ScrollView>
                </View>
                <View style={{ padding: wp('2%'), height: hp('8%') }}>
                    <Text style={{ fontSize: hp('2.5%'), color: Colors.black, fontWeight: 'bold', }}>{getValue} </Text>
                    <Text style={{ fontSize: hp('1.8%'), color: Colors.black, }}>{getLocation}</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('7%'), backgroundColor: 'pink', flexDirection: 'row' }} >
                    <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#00abf6', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} >
                        <Text>About</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('Department')} >
                        <Text>Department</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('BookBed')}>
                        <Text>Bed Booking</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.lowerContainer}>
                    <View style={{ height: hp('55%') }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ width: wp('100%'), height: hp('16%'), }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), color: Colors.darkGray, marginLeft: wp('1%') }}>Services</Text>
                                <View style={{ marginTop: hp('1%'), }}>
                                    {theArray.length != 0 && storeServices.map((val) => {
                                        return (
                                            <Text style={{ color: Colors.black, fontSize: hp('1.5%'), marginLeft: wp('1%') }}>{val}</Text>
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


        </SafeAreaView >
    );
};



export default About;

const styles = StyleSheet.create({
    container: {
        //flex: 1
        width: wp('100%'),
        height: hp('100%'),

    },
    imgSlider: {
        width: wp('100%'),
        height: hp('30%')
    },
    lowerContainer: {
        width: wp('100%'),
        height: hp('55%'),
    },
    map: {
        width: wp('96%'),
        height: hp('32%'),
        alignSelf: 'center',
        borderRadius: hp('1%')


    }

});