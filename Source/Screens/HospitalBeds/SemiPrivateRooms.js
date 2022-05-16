import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Assets/Constants/Colors';
import DashedLine from 'react-native-dashed-line';
import MarginGrid from '../../ReusableComponent/MarginGrid';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../ReusableComponent/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//const bookBedApi = 'https://ehospi-new-api.herokuapp.com/api/allfindBedstatus';

const SemiPrivateRooms = ({ props, navigation }) => {
    const [checked, setChecked] = React.useState('first');
    const [modalVisible, setModalVisible] = useState(false);
    const [getDate, setGetDate] = useState('');
    const [bookFacilityData, setFacilityData] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [animating, setAnimating] = useState(true);
    const [getTime, setGetTime] = useState('');
    const [getFormate, setGetFormate] = useState('');
    const [getLocation, setGetLocation] = useState('');
    const [getValue, setGetValue] = useState('');
    const [getamenitiesCharges , setamenitiesCharges] = useState('');
    const [getbedCharges , setbedCharges] = useState('');
    const [getfacilitiesCharges , setfacilitiesCharges] = useState('');
    const [gettotalCharges , settotalCharges] = useState('');
    const [getHospitalCode, setHospitalCode] = useState('');
    const [getWard, setWard] = useState('');
    const [getamenitiesValue, setamenitiesValue] = useState('');

    const RemoveSaveData = async () => {
        try {
            await AsyncStorage.removeItem('any_key_here');
            // console.log('Previous date and time have been removed');
            navigation.navigate('BookingSlot');
            setTimeout(() => {
                setAnimating(false);
            }, 1000)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // onRefresh();
        GetSavedDate();
        GetBookBedData();
       // userfacilityData();

    });
    // AsyncStorage.setItem('Ward', val.bedName);
    // AsyncStorage.setItem('TotalCharges', val.charges.totalCharges);
    // AsyncStorage.setItem('Facility Charges', val.charges.facilitiesCharges);
    // AsyncStorage.setItem('Bed Charges', val.charges.bedCharges);
    // AsyncStorage.setItem('Aminity Charges', val.charges.amenitiesCharges);
    const GetBookBedData = () => {
        AsyncStorage.getItem('amenitiesValue').then(
            (value) =>
            setamenitiesValue(value), 
                console.log('amenities Value-----',getamenitiesValue)
                );
        AsyncStorage.getItem('Ward').then(
            (value) =>
                setWard(value), 
                // console.log('ward value-----',getWard)
                );
        AsyncStorage.getItem('Aminity Charges').then(
                    (amenitiesCharges) =>
                        setamenitiesCharges(amenitiesCharges),
                        // console.log('amenities charges----',getamenitiesCharges) 
                        );
        AsyncStorage.getItem('Bed Charges').then(
                            (value) =>
                                setbedCharges(value),
                                // console.log('bed charges----',getbedCharges)
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
    }
    const GetSavedDate = async () => {
        try{
        let user = await AsyncStorage.getItem('TotalCharges').then(
            (Hname) =>
            setGetDate(Hname),
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
        } catch(e){
            console.log(e);
        }
    };

    const userfacilityData = () => {
        // console.log('Book bed Data is coming')
        axios.get(bookBedApi, { headers: { "hospitalCode": "6TS84N" } })
            .then(response => {

                return setFacilityData(response.data)

            })
    }


    const generalWardAmenities = bookFacilityData.generalWard



    return (
        <SafeAreaView>
            <View style={styles.contnr}>
                <ImageBackground source={require('../../Assets/Images/Bed.png')} style={{ width: wp('100%'), height: hp('30%') }} >
                    {/* <View style={{ flexDirection: 'row', marginLeft: wp('3%'), marginTop: hp('1%') }}>
                        <TouchableOpacity >
                            <FontAwesome5 name='angle-left' color={Colors.white} size={hp('4%')} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('3%'), color: Colors.white, marginLeft: wp('4%') }}>Semi-Private Ward</Text>

                    </View> */}
                </ImageBackground>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%'), padding: wp('2%'), height: hp('8%'), }}>
                    <View>
                        <Text style={{ fontSize: hp('3%'), color: Colors.black, fontWeight: 'bold', }}>{getValue} </Text>
                        <Text style={{ fontSize: hp('2%'), color: Colors.black, }}>{getLocation}</Text>
                    </View>
                    {/* <TouchableOpacity >
                    <Text style={{ alignSelf: 'flex-end', color: '#FF0202', fontSize: hp('2.5%') }}>Edit</Text>
                </TouchableOpacity> */}
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
                        <View style={{ width: wp('100%'), height: hp('30%'), marginTop: hp('1%'), }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), padding: wp('2%') }}>Amenities</Text>
                            {/* <MarginGrid name1='user' name2='tv' t1='AC' t2='TV' />
                            <MarginGrid name1='wifi' name2='blender' t1='Free Wifi' t2='Geyser' />
                            <MarginGrid name1='power-off' name2='dungeon' t1='Power backup' t2='Elevator' /> */}
                            <View style={{ width: wp('100%'), height: hp('6%'), flexDirection: 'row', marginTop: hp('1%'), }}>
                            { getamenitiesValue.map((val) => {
// console.log('amenities value',val)
                                    //         return(
                                    // <Text>{val}</Text>
                                    //             )

                            })}
                                <View style={{ width: wp('45%'), height: hp('6%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('4%') }}>
                                    {/* <TouchableOpacity >
                    <FontAwesome5 name="user" color={Colors.darkGray} size={hp('2%')} />
                </TouchableOpacity> */}
                                    {/* {getamenitiesValue !==0 && getamenitiesValue.map((val) => {
                                        return (

                                            <Text style={{ fontSize: hp('1.8%'), marginLeft: wp('7%'), }}>{val}</Text>
                                        )
                                    })

                                    } */}
                                </View>
                                {/*  <View style={{ width: wp('55%'), height: hp('6%'), flexDirection: 'row', alignItems: 'center', paddingLeft: wp('8%'), }}>
                <TouchableOpacity >
                    <FontAwesome5 name="tv" color={Colors.darkGray} size={hp('2%')} />
                </TouchableOpacity>
                <Text style={{ fontSize: hp('1.8%'), color: Colors.darkGray, marginLeft: wp('7%'), }}></Text>

            </View> */}
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
                                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold'}}>{gettotalCharges}</Text>
                                </View>
                            </View>
                            {/* <View style={{ borderBottomWidth: 0.8, width: wp('100%'), backgroundColor: Colors.black, marginTop: hp('2%') }} /> */}
                        </View>
                        {/* <View style={{ width: wp('100%'), height: hp('18%'),backgroundColor:'orange' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: hp('2.5%'), padding: wp('2%') }}>Payment Type</Text>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp('2%'), marginTop: hp('0.5%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Pay Now or Partial Payment</Text>
                                <RadioButton
                                    value="first"
                                    status={checked === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('first')}
                                />

                            </View>
                            <View style={{ width: wp('100%'), height: hp('4%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: wp('2%'), marginTop: hp('1%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: hp('2%') }}>Pay at Hospital</Text>
                                <RadioButton
                                    value="second"
                                    status={checked === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('second')}
                                />

                            </View>
                            <View style={{ height: hp('1%'), width: wp('100%'), backgroundColor: '#f1f1f1', marginTop: hp('1%') }} />

                        </View> */}
                        <View style={{ width: wp('100%'), height: hp('12%'),alignItems:"center",justifyContent:'center',}}>
                           

                            

                            <View style={{ width: wp('100%'), height: hp('10%'),  alignItems: 'center', justifyContent:'center', }}>
                               
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
                            {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
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
        backgroundColor:Colors.white


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

 //backgroundColor: Colors.grayShade,
 //backgroundColor: 'red' 