import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Modal, BackHandler } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Assets/Constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../ReusableComponent/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//const bookBedApi = 'https://ehospi-new-api.herokuapp.com/api/allfindBedstatus';

const SemiPrivateRooms = ({ route, props, navigation }) => {
    const [checked, setChecked] = React.useState('first');
    const [modalVisible, setModalVisible] = useState(false);
    const [getDate, setGetDate] = useState('');
    // const [refreshing, setRefreshing] = React.useState(false);
    const [animating, setAnimating] = useState(true);
    const [getTime, setGetTime] = useState('');
    const [getFormate, setGetFormate] = useState('');
    const [getLocation, setGetLocation] = useState('');
    const [getValue, setGetValue] = useState('');
    const [getamenitiesCharges, setamenitiesCharges] = useState('');
    const [getbedCharges, setbedCharges] = useState('');
    const [getfacilitiesCharges, setfacilitiesCharges] = useState('');
    const [gettotalCharges, settotalCharges] = useState('');
    const [getHospitalCode, setHospitalCode] = useState('');
    const [getWard, setWard] = useState('');
    const [getamenitlue, setamenialue] = useState([]);
    const [getHospitalAddress, setHospitalAddress] = useState('');

    useEffect(() => {
        GetSavedDate();
        GetBookBedData();
    });

    useEffect(() => {
        const backAction = () => {
            console.log('You can not go Back');

            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [])
    const RemoveSaveData = async () => {
        try {
            await AsyncStorage.removeItem('any_key_here');
            navigation.navigate('BookingSlot');
            setTimeout(() => {
                setAnimating(false);
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    const GetBookBedData = async () => {
        AsyncStorage.getItem('amenitValue').then(
            (vl) =>
                setamenialue(JSON.parse(vl)),
        );
        AsyncStorage.getItem('Ward').then(
            (value) =>
                setWard(value),
        );
        AsyncStorage.getItem('Aminity Charges').then(
            (amenitiesCharges) =>
                setamenitiesCharges(amenitiesCharges),
        );
        AsyncStorage.getItem('Bed Charges').then(
            (value) =>
                setbedCharges(value),
        );
        AsyncStorage.getItem('Facility Charges').then(
            (value) =>
                setfacilitiesCharges(value),
        );
        AsyncStorage.getItem('TotalCharges').then(
            (value) =>
                settotalCharges(value),
        );

        AsyncStorage.getItem('Hcode').then(
            (code) =>

                setHospitalCode(code),
        );
        let user4 = await AsyncStorage.getItem('Haddress').then(
            (Hadd) =>
                //   setGetValue(Hname),
                setHospitalAddress(Hadd)
        )
    }
    const GetSavedDate = async () => {
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
            // Function to get the value from AsyncStorage
            AsyncStorage.getItem('date').then(
                (value) =>
                    setGetDate(value),
            );
            AsyncStorage.getItem('timing').then(
                (value) =>
                    // AsyncStorage returns a promise
                    // Adding a callback to get the value
                    setGetTime(value),
            );
            AsyncStorage.getItem('formate').then(
                (formate) =>
                    // AsyncStorage returns a promise
                    // Adding a callback to get the value
                    setGetFormate(formate),
            );
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SafeAreaView>
            <View style={styles.contnr}>
                <ImageBackground source={require('../../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%') }} >
                </ImageBackground>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), padding: wp('2%'), height: hp('8%'), }}>
                    <View>
                        <Text style={{ fontSize: hp('3%'), color: Colors.black, fontWeight: 'bold', }}>{getValue} </Text>
                        <Text style={{ fontSize: hp('2%'), color: Colors.black, }}>{getHospitalAddress}</Text>
                    </View>
                </View>
                <View style={{ width: wp('100%'), height: hp('58%'), }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ width: wp('95%'), height: hp('8%'), backgroundColor: '#717791', alignSelf: 'center', marginTop: hp('0.8%'), flexDirection: 'row', borderRadius: hp('1%') }}>
                            <TouchableOpacity style={{ width: wp('52.5%'), height: hp('8%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('6%') }}
                                // onPress={() => navigation.navigate('BookingSlot')}
                                onPress={RemoveSaveData}
                            >
                                <View >
                                    <FontAwesome5 name='calendar-alt' color={Colors.white} size={hp('2.5%')} />
                                </View>
                                <Text style={{ fontSize: hp('1.5%'), color: Colors.white, marginLeft: wp('4%') }}>Date: {getDate} {getTime} {getFormate}</Text>
                            </TouchableOpacity>
                            <View style={{ width: wp('0.5%'), height: hp('6%'), backgroundColor: Colors.white, marginTop: hp('1%') }} />
                            <View style={{ width: wp('42%'), height: hp('8%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('6%') }}>

                                <TouchableOpacity >
                                    <FontAwesome5 name='user' color={Colors.white} size={hp('3%')} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: hp('1.5%'), color: Colors.white, marginLeft: wp('4%'), }}>1 Room <Text style={{ fontSize: hp('1.5%'), alignSelf: 'center' }}>Details</Text></Text>

                            </View>
                        </View>
                        <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('1%'), }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), padding: wp('2%') }}>Amenities</Text>

                            <View style={{ width: wp('100%'), height: hp('13%'), alignItems: 'center', marginTop: hp('0.5%'), flexWrap: 'wrap', paddingVertical: hp('0.5%'), }}>
                                {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
                                {getamenitlue.length !== 0 && getamenitlue.map((yt) => {

                                    return (

                                        <Text style={{ fontSize: hp('1.8%'), marginLeft: wp('7%'), marginVertical: hp('0.2%') }} lineBreakMode={'clip'}>{yt}</Text>

                                    )
                                })}
                                {/* </ScrollView> */}

                            </View>

                        </View>
                        <View style={{ width: wp('100%'), height: hp('28%'), }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), padding: wp('2%') }}>Payment Details</Text>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: wp('4%'), alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>Amenities</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('2%')} />
                                    <Text style={{ fontSize: hp('2%') }}>{getamenitiesCharges}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: wp('4%'), alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>Bed</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('2%')} />
                                    <Text style={{ fontSize: hp('2%') }}>{getbedCharges}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: wp('4%'), alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%') }}>Facility</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                    <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('2%')} />
                                    <Text style={{ fontSize: hp('2%') }}>{getfacilitiesCharges}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), paddingHorizontal: wp('4%'), alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Toatl Charges</Text>
                                <View style={{ flexDirection: 'row', alignItems: "center", }}>
                                    <FontAwesome5 name='rupee-sign' color={Colors.black} size={hp('2%')} />
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>{gettotalCharges}</Text>
                                </View>
                            </View>
                            {/* <View style={{ borderBottomWidth: 0.8, width: wp('100%'), backgroundColor: Colors.black, marginTop: hp('2%') }} /> */}
                        </View>

                        <View style={{ width: wp('100%'), height: hp('12%'), alignItems: "center", justifyContent: 'center', }}>
                            <View style={{ width: wp('100%'), height: hp('10%'), alignItems: 'center', justifyContent: 'center', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('HospitalForm')} style={{ width: wp('80%'), height: hp('7%'), backgroundColor: "#2581D4", alignItems: 'center', justifyContent: 'center', borderRadius: hp('1%') }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), color: Colors.white }}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                ><View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => setModalVisible(!modalVisible)}>
                                <FontAwesome5 name='times' size={hp('2.5%')} color={Colors.black} />
                            </TouchableOpacity>
                            <Image source={require('../../Assets/Images/Group.png')}
                                style={{ width: hp('20%'), height: hp('20%'), borderRadius: hp('10%') }} />

                            <Text style={styles.modalText}>Thank You!</Text>
                            <Text style={styles.modalText2}>Your Booking Successful</Text>
                            <Text style={{ textAlign: "center", fontSize: 14, marginBottom: 5, fontWeight: "bold" }}>Booking ID:36678689</Text>
                            <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>You booked a bed in Sarder Hospital on</Text>
                            <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>February 17,2022</Text>
                            <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 5 }}>at 02:00 PM</Text>
                            <CustomButton
                                onPress={() => navigation.navigate('DrawerNavigator')}
                                title={'DONE'}
                                bgColor={Colors.blue}
                                width={wp('75%')}
                                height={hp('7%')}
                                color={Colors.white}
                                fontSize={hp('2.5%')}
                                alignSelf={'center'}
                                padding={hp('8%')}
                                borderRadius={hp('2%')}
                                marginTop={hp('3%')}
                            />
                            <TouchableOpacity style={{ marginTop: hp('1%') }}>
                                <Text style={{ alignSelf: 'center', color: Colors.blue, }}> <Text style={{ fontWeight: 'bold' }}></Text> Edit Your Appointment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}


export default SemiPrivateRooms;

const styles = StyleSheet.create({
    contnr: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: Colors.white
    },
    txt: {
        fontWeight: 'bold',
        fontSize: hp('2.7%')
    },
    centeredView: {
        flex: 1,
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: hp('2%')
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "bold"
    },
    modalText2: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 20,
    }
})
