import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, BackHandler } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../Config/baseurl';
const bookBedApi = 'https://ehospi-new-api.herokuapp.com/api/allfindBedstatus';


const BookBed = (props) => {
    const [getLocation, setGetLocation] = useState('');
    const [getValue, setGetValue] = useState('');
    const [bookGeneralward, setGeneralward] = useState([]);
    const [getHospitalCode, setHospitalCode] = useState([]);
    const [bookAmenities, setbookAmenities] = useState([]);
    const [thebookBed, setbookBed] = useState([]);
    const [getBookBedValue, setBookBedValue] = useState([]);
    const [getTokenId, setTokenId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [getHospitalAddress, setHospitalAddress] = useState('');

    useEffect(() => {
        displayData();
        HospitalbookBed();
    }, [getTokenId]);

    useEffect(() => {
        const backAction = () => {
            console.log('You can not go Back');
            // Alert.alert("Hi User", "You can not go Back", [
            //     {
            //         text: "Cancel",
            //         onPress: () => null,
            //         style: "cancel"
            //     },
            //     // { text: "YES", onPress: () => BackHandler.exitApp() }
            // ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [])
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('Hname').then(
                (Hname) =>
                    setGetValue(Hname),
            )
            let user2 = await AsyncStorage.getItem('Location').then(
                (Location) =>
                    setGetLocation(Location)
            )
            let user3 = await AsyncStorage.getItem('Hcode').then(
                (code) =>
                    setHospitalCode(code)

            )
            let user4 = await AsyncStorage.getItem('Haddress').then(
                (Hadd) =>
                    //   setGetValue(Hname),
                    setHospitalAddress(Hadd)
            )
            await AsyncStorage.getItem('tokenId').then(
                (token) =>
                    //   setGetValue(Hname),
                    setTokenId(token)
            )

        }
        catch (error) {
            alert(error)
        }
    }
    // const userServicesData = () => {
    //     // console.log('Book bed Data is coming')
    //     axios.get(bookBedApi, { headers: { "hospitalCode": "6TS84N" } })
    //         .then(response => {
    //             return setGeneralward(response.data)
    //         })
    // }

    const HospitalbookBed = () => {
        setIsLoading(true)
        console.log('code wise Hospital Book bed')
        axios.get(baseurl + 'user/findBeds/' + getHospitalCode, { headers: { "Authorization": `Bearer ${getTokenId}` } })

            .then(response => {
                // console.log('------------response.data--------')
                // console.log(response.data[0].beds[0].bedName)
                setBookBedValue(response.data[0].beds)

            }).catch((e) => {
                console.log(e)
            }).finally(() => setIsLoading(false));
    }

    return (
        <View style={styles.container}>
            <View style={styles.imgSlider}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/img01.jpg')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                    <Image source={require('../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%'), }} />
                </ScrollView>
            </View>
            <View style={{ marginTop: hp('-1%'), padding: wp('2%'), height: hp('8%'), }}>
                <Text style={{ fontSize: hp('3%'), color: Colors.black, fontWeight: 'bold', }}>{getValue} </Text>
                <Text style={{ fontSize: hp('2%'), color: Colors.black, }}>{getHospitalAddress}</Text>
            </View>
            <View style={{ width: wp('100%'), height: hp('7%'), backgroundColor: 'pink', flexDirection: 'row' }}>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('About')} >
                    <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('Department')}>
                    <Text>Department</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#00abf6', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }}>
                    <Text>Bed Booking</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lowerContainer}>
                <View style={{ width: wp('100%'), height: hp('10%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), marginTop: hp('-4%') }}>Bed Availablity</Text>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: wp('25%'), height: hp('4%'), backgroundColor: Colors.lightGreen, alignItems: 'center', justifyContent: 'center', borderRadius: hp('1%') }}  >
                            <Text>145</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', marginTop: hp('1%'), fontSize: hp('1.8%') }}>Available Beds</Text>
                    </View>
                </View>
                <View style={{ height: hp('40%') }}>
                    {isLoading ? (
                        <ActivityIndicator color='#bc2b78'
                            size="large" style={{ flex: 1, alignSelf: 'center', marginTop: 25 }} />
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* //////////////////////////////////////General Ward ////////////////////////////////////*/}
                            {getBookBedValue.length !== 0 && getBookBedValue.map((val) => {
                                const asdasdasd = val.charges.amenitiesCharges
                                return (
                                    <View style={{ width: wp('98%'), height: hp('25.76%'), backgroundColor: '#ece6e6', marginTop: hp('3%'), borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%'), alignSelf: 'center' }}>

                                        <View style={{ width: wp('96%'), height: hp('6.7%'), justifyContent: 'center', paddingLeft: wp('1%'), }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.6%'), color: Colors.black }}>{val.bedName}</Text>
                                        </View>
                                        <View style={{ width: wp('98%'), height: hp('19%'), flexDirection: 'row', backgroundColor: '#ffffff', borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%'), alignSelf: 'center' }}>
                                            <View style={{ width: wp('77%'), height: hp('19%'), backgroundColor: '#ffffff', borderBottomLeftRadius: hp('2%') }}>
                                                <View style={{ width: wp('77%'), height: hp('4%'), flexDirection: 'row', backgroundColor: '#ffffff' }}>
                                                    <View style={{ width: wp('38.5%'), height: hp('5%'), justifyContent: 'center', }}>
                                                        <Text style={{ marginLeft: wp('1%'), fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.black }}>Facility</Text>
                                                    </View>
                                                    <View style={{ width: wp('38.5%'), height: hp('5%'), justifyContent: 'center' }}>
                                                        <Text style={{ marginLeft: wp('1%'), fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.black }}>Charges</Text>
                                                    </View>

                                                </View>
                                                <View style={{ width: wp('77%'), height: hp('15%'), flexDirection: 'row', }}>
                                                    <View style={{ width: wp('38.5%'), height: hp('15%'), padding: wp('1%') }}>

                                                        {val.facilities.map((v) => {
                                                            return (<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                                                <Text style={{ fontSize: hp('1.8%'), }}>{v}</Text>
                                                            </View>
                                                            )
                                                        })}

                                                    </View>
                                                    <View style={{ width: wp('38.5%'), height: hp('15%'), padding: wp('1%'), }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                                            <Text style={{ fontSize: hp('1.8%'), }}>Amenities</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                                <Text style={{ fontSize: hp('1.8%') }}>{asdasdasd}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                                            <Text style={{ fontSize: hp('1.8%') }}>Bed</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                                <Text style={{ fontSize: hp('1.8%') }}>{val.charges.bedCharges}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                                                            <Text style={{ fontSize: hp('1.8%') }}>Facility </Text>
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                                <Text style={{ fontSize: hp('1.8%') }}>{val.charges.facilitiesCharges}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), }}>
                                                            <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', color: Colors.black }}>Total Amount</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                                                <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', color: Colors.black }}>{val.charges.totalCharges}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: wp('21%'), height: hp('19%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderBottomRightRadius: hp('2%') }}>
                                                <TouchableOpacity style={{ width: wp('18%'), height: hp('4%'), borderRadius: hp('1%'), backgroundColor: Colors.skyblue, alignItems: 'center', justifyContent: 'center' }}

                                                    onPress={() => {
                                                        AsyncStorage.setItem('Ward', val.bedName);
                                                        AsyncStorage.setItem('TotalCharges', (val.charges.totalCharges).toString());
                                                        AsyncStorage.setItem('Facility Charges', (val.charges.facilitiesCharges).toString());
                                                        AsyncStorage.setItem('Bed Charges', (val.charges.bedCharges).toString());
                                                        AsyncStorage.setItem('Aminity Charges', (val.charges.amenitiesCharges).toString());
                                                        AsyncStorage.setItem('amenitValue', JSON.stringify(val.amenities));
                                                        // alert(val.amenities);
                                                        // alert(val.charges.amenitiesCharges);
                                                        props.navigation.navigate('SemiPrivateRoom');
                                                    }}
                                                >
                                                    <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: Colors.black }}>Book Now</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                        </ScrollView>
                    )}
                </View>
            </View>
        </View >
    );
};
export default BookBed;
const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: '#f7f7f7'
    },
    imgSlider: {
        width: wp('100%'),
        height: hp('31%')
    },
    lowerContainer: {
        width: wp('100%'),
        height: hp('54.5%'),
    }

});