import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, ImageBackground, View, Image, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../Assets/Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BookingHistoryTwo = (props) => {
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [fathersName, setFathersName] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('')
    const [policyNumber, setPolicyNumber] = useState('')
    const [ward, setWard] = useState('')
    const [hospitalName, setHospitalName] = useState('')
    const [location, setLocation] = useState('')
    const [hospName, setHospName] = useState('')
    const [totalcharges, setTotalCharghes] = useState('')
    const [BookingIdGet, setBookingId] = useState('')
    const [getBookingAddress, setBookingAddress] = useState('')
    useEffect(() => {
        getBookingHistoryData();
    }, [])
    const getBookingHistoryData = async () => {
        try {
            await AsyncStorage.getItem('Date').then(
                (Date) =>
                    setDate(Date),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Name').then(
                (Name) =>
                    setName(Name),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Fathers_Name').then(
                (Fname) =>
                    setFathersName(Fname),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Gender').then(
                (Gender) =>
                    setGender(Gender),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Mobile_Number').then(
                (Mbnumber) =>
                    setMobileNumber(Mbnumber),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Policy Number').then(
                (Polnmb) =>
                    setPolicyNumber(Polnmb),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Hospital_Ward').then(
                (Ward) =>
                    setWard(Ward),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Hname').then(
                (Hname) =>
                    setHospitalName(Hname),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Location').then(
                (Location) =>
                    setLocation(Location),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('HospName').then(
                (HospName) =>
                    setHospName(HospName),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('TotalCharges').then(
                (HospName) =>
                    setTotalCharghes(HospName),
                //   setGetLocation(Location)
            )
            await AsyncStorage.getItem('Booking_Id').then(
                (idB) =>
                    setBookingId(idB),
                //   setGetLocation(Location)
            )
             await AsyncStorage.getItem('address').then(
                (bAddress) =>
                    setBookingAddress(bAddress),
                
            )

        }
        catch (error) {
            alert(error)
        }

    }

    return (
        <View style={{ width: wp('100%'), height: hp('100%'), }}>
            <View style={styles.head}>
                <View style={{ width: wp('30%'), height: hp('4%'), }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack("BookingHistory")} style={{ width: wp('8%'), height: hp('4%'), justifyContent: "center", alignItems: "center" }}>
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
            <View style={{ width: wp('100%'), height: hp('6%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: wp('2%'), marginTop: hp('1%') }}>
                <Image source={require('../Assets/Images/doctor1.png')} style={{ width: hp('5%'), height: hp('5%'), borderRadius: hp('2.5%') }} />
                <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold' }}>{date}</Text>
            </View>
            <View style={{ width: wp('100%'), height: hp('10%'), paddingHorizontal: wp('2%'), justifyContent: "center" }}>
                <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: Colors.black }}>Pay at Hospital</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('1%') }}>
                    <Text tyle={{ fontSize: hp('2%'), fontWeight: 'bold', color: Colors.lightGray }}>Total Amount</Text>
                    <Text style={{ fontSize: hp('1.8%'), fontWeight: 'bold', color: Colors.black }}>₹{totalcharges}</Text>
                </View>
            </View>
            <View style={{ width: wp('100%'), height: hp('15%'), }}>
                <View style={{ width: wp('100%'), height: hp('5%'), justifyContent: 'center', paddingHorizontal: wp('2%') }}>
                    <Text style={{ fontSize: hp('1.5%'), fontWeight: 'bold', color: '#2581d4' }}>Hospital Details</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('10%'), justifyContent: 'center', padding: wp('2%') }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2.2%'), color: Colors.black }}>{ward}</Text>
                    <Text style={{ fontWeight: '500', fontSize: hp('1.5%'), color: Colors.black }}>{hospitalName} Hospital {location} </Text>
                    <Text style={{ fontSize: hp('1.5%'), color: Colors.lightGray }}>{hospName}</Text>
                </View>
            </View>
            <View style={{ width: wp('100%'), height: hp('45%'), }}>
                <View style={{ width: wp('100%'), height: hp('5%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2.2%'), color: Colors.black }}>Booking Details</Text>
                    <Text style={{ fontSize: hp('1.8%'), color: Colors.black }}>{BookingIdGet}</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('4%'), marginTop: hp('2%'), justifyContent: 'center', paddingHorizontal: wp('2%') }}>
                    <Text style={{ fontWeight: 'bold', fontSize: hp('1.8%'), color: '#2581d4' }}>Patient Details</Text>
                </View>
                <View style={{ width: wp('100%'), height: hp('30%'), }}>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Name</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{name}</Text>
                    </View>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Age</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>45</Text>
                    </View>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Gender</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{gender}</Text>
                    </View>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Father's Name</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{fathersName}</Text>
                    </View>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Mobile Number</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{mobileNumber}</Text>
                    </View>
                    <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>Address</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{getBookingAddress}</Text>
                    </View>
                                       <View style={{ width: wp('100&'), height: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('2%'), alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.5%') }}>policyNumber</Text>
                        <Text style={{ color: Colors.gray, fontSize: hp('1.5%') }}>{policyNumber}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default BookingHistoryTwo;
const styles = StyleSheet.create({
    container: {

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
    },
    head: {
        width: wp('100%'),
        height: hp('10%'),
        backgroundColor: Colors.lightBlue,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },

});