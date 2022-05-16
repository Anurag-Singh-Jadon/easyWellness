import { Image, Keyboard, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseurl } from '../Config/baseurl';

const userDataReg = 'http://10.0.2.2:8000/user/phone/createProfile'

const ProfileScreen = ({ route, navigation }) => {
    const [selected, setSelected] = useState();
    const [gettokenId, setTokenID] = useState();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [checked, setChecked] = React.useState('first');
    const [date, setDate] = useState('');
    console.log('First name===' + firstName)
    const { Pname } = route.params;
    console.log("Last Page NAme VAlue", Pname)
    const saveValueFunction = () => {
        // Function to save the value in AsyncStorage
        try {
            if (firstName) {
                // To check the input not empty
                AsyncStorage.setItem('any_key_here', firstName);
                // Setting a data to a AsyncStorage with respect to a key
                setFirstName('');
                // Resetting the TextInput
                //   console.log("First name value====" +setFirstName)
                // alert('Data Saved');
                // Alert to confirm
            } else {
                alert('Please fill data');
            }
        } catch (error) {
            console.log(error)
        }
    };
    const userProfileData = (props) => {
        saveValueFunction();
        let p = date;
        p = p.split("-")
        let temp = p[1];
        p[1] = p[0];
        p[0] = temp;
        p = p.join("-")
        console.log(p);
        const userData = {
            fullName: (firstName + ' ' + lastName),
            dateOfBirth: (p),
            email: (email),
            gender: (isCheckSelected)
        }
        AsyncStorage.getItem('tokenId').then(
            (value) =>
                setTokenID(value),
        )
        console.log(gettokenId)
        console.log('---------------------setTokenID------------------');
        console.log(Pname)

        // console.log(userDataReg, userData)
        axios.post(userDataReg, userData, { headers: { "Authorization": `Bearer ${Pname}` } })
            .then(response => {
                console.log('data is coming');
                console.log(response.data);
                if (response.data.message === "Registered sucessfully") {
                    alert("Your Profile Data is Submitted  Successful")
                    navigation.navigate('DrawerNavigator')
                }
                else if (response.data.message === "Profile already created") {
                    alert("user is alredy register");

                }
                else {
                    console.log("Error Occured")
                }
            })
    }
    const myProfile = () => {
        saveValueFunction();
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rule = /^[a-zA-Z ]+(\.|')?[a-zA-Z ]+(\.|')?$/;
        const DOB_REGEX = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
        if (rule.test(firstName) == '') {
            alert('Enter the First Name')
        }
        else if (rule.test(lastName) == '') {
            alert('Enter Your Last Name');
        }
        else if (DOB_REGEX.test(date) == '') {
            alert('Enter Your Date of Birth');
        }
        else if (emailRegex.test(email) == '') {
            alert('Enter Your Email');
        }
        else {
            navigation.navigate('DrawerNavigator')
        }
    }
    const [isCheckSelected, setCheckSelected] = useState(1);
    const products = [{
        id: 1,
        name: "Male"
    },
    {
        id: 2,
        name: "Female"
    },
    {
        id: 3,
        name: "Other"
    }];
    const checkClick = (name) => {
        setCheckSelected(name)
    }
    const Selector = () => {
        setSelected(!selected)
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior="height"
                enabled={true}
                style={styles.doctContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <View style={styles.upperContainer}>
                            <View style={styles.txtContainer}>
                                <View style={{ height: hp('10%'), }} >
                                    <Text style={{ fontSize: hp('4%'), fontFamily: 'PTSans-Bold', color: 'white', fontWeight: 'bold', marginBottom: hp('-1%') }}>Welcome</Text>
                                    <Text style={{ fontSize: hp('4%'), color: 'white', fontWeight: 'bold' }}>to eHospi</Text>
                                </View>
                                <View style={{ marginTop: hp('1%'), }}>
                                    <Text style={{ fontSize: hp('1.5%'), color: 'white', }} numberOfLines={1}>Let's us quickly get to know you so</Text>
                                    <Text style={{ fontSize: hp('1.5%'), color: 'white', }} numberOfLines={1}>that we can get you the best help</Text>
                                </View>
                            </View>
                            <View style={{ width: wp('48%'), }}>
                                <Image source={require('../Assets/Images/profile.png')} style={{ width: wp('51%'), height: hp('35%'), marginTop: hp('3%') }} />
                            </View>
                        </View>
                        <View style={{ width: wp('100%'), height: hp('59%'), backgroundColor: 'white', borderTopLeftRadius: hp('5%'), borderTopRightRadius: hp('5%'), }}>
                            <View style={{ width: wp('100%'), height: hp('18%'), marginTop: hp('4%'), }}>
                                <Text style={{ fontSize: hp('1.8%'), marginLeft: hp('2%'), color: 'black', fontWeight: 'bold' }}>Full Name</Text>
                                <View style={{ width: wp('90%'), alignSelf: 'center', }}>
                                    <TextInput
                                        placeholder='First Name'
                                        style={{ borderBottomWidth: 1, borderBottomColor: '#7fffd4', fontSize: hp('2%') }}
                                        value={firstName}
                                        onChangeText={text => setFirstName(text)}
                                    />
                                    <TextInput
                                        placeholder='Last Name'
                                        style={{ borderBottomWidth: 1, borderBottomColor: '#7fffd4', fontSize: hp('2%') }}
                                        value={lastName}
                                        onChangeText={text => setLastName(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('10%'), marginTop: hp('2%'), paddingLeft: wp('3%'), }}>
                                <Text style={{ width: wp('100%'), fontSize: hp('1.8%'), color: 'black', fontWeight: 'bold' }}>Date of Birth</Text>
                                <View>
                                    <DatePicker
                                        style={styles.inputTxt3}
                                        date={date} // Initial date from state
                                        mode="date" // The enum of date,
                                        placeholder="DD-MM-YYYY"
                                        iconComponent={
                                            <FontAwesome5 name='calendar-alt' color='#a9a9a9' size={hp('3%')} />
                                        }
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1900"
                                        maxDate="19-01-2050"
                                        customStyles={{
                                            dateInput: { borderWidth: 0, alignItems: 'flex-start', paddingLeft: wp('1%'), fontSize: hp('1.5%') },
                                            dateText: { fontSize: hp('1.8%'), color: 'black' },
                                            placeholderText: {
                                                color: 'black',
                                                fontSize: hp('1.5%')
                                            }
                                        }}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        onDateChange={(date) => {
                                            setDate(date);
                                        }}
                                        androidMode={'spinner'}
                                    />
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('10%'), marginTop: hp('1.5%'), }}>
                                <Text style={{ fontSize: hp('1.8%'), marginLeft: hp('2%'), color: 'black', fontWeight: 'bold' }}>Gender</Text>
                                <View style={{ width: wp('100%'), height: hp('6%'), marginTop: hp('1%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                    {products.map((val) => {
                                        return (
                                            <TouchableOpacity key={val.name} onPress={checkClick.bind(this, val.name)}>
                                                <View style={{
                                                    width: wp('22%'),
                                                    height: hp('5.5%'),
                                                    borderRadius: hp('1%'),
                                                    marginLeft: hp('2.8%'),
                                                    backgroundColor: val.name == isCheckSelected ? '#2581d4' : "white",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    // flexDirection: 'row'
                                                }}>
                                                    <Text style={{ color: val.name == isCheckSelected ? 'white' : "#2581d4", fontWeight: 'bold' }}>{val.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                            <View style={{ width: wp('100%'), height: hp('10%'), marginTop: hp('1%'), }}>
                                <Text style={{ fontSize: hp('1.8%'), marginLeft: hp('2%'), color: 'black', fontWeight: 'bold' }}>Email Address</Text>
                                <TextInput
                                    placeholder='name@gmail.com'
                                    style={{ width: wp('90%'), alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#7fffd4', fontSize: hp('2%') }}
                                    value={email}
                                    keyboardType='email-address'
                                    onChangeText={(email) => setEmail(email)}
                                />
                            </View>
                        </View>
                        <View style={{ width: wp('100%'), height: hp('11%'), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                            <TouchableOpacity
                                onPressIn={userProfileData}
                                onPress={() => navigation.navigate('DrawerNavigator')}
                                style={{ width: wp('70%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#00ABF6', borderRadius: hp('1.5%'), marginTop: -hp('3.2%') }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2.2%') }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    doctContainer: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center',
        backgroundColor: '#02B2FF'
    },
    upperContainer: {
        width: wp('100%'),
        height: hp('30%'),
        backgroundColor: '#02B2FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtContainer: {
        width: wp('48%'),
        marginTop: hp('5%'),
        paddingLeft: wp('2.5%'),
    },
    inputTxt3: {
        width: wp('90%'),
        height: hp('7%'),
        borderRadius: wp('2%'),
        marginTop: wp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1%'),
        marginLeft: wp('3%')
    },
});

export default ProfileScreen;