import React, { Component } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponent/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator, } from '@shankarmorwal/rn-viewpager';


import axios from 'axios';
import { baseurl } from '../Config/baseurl';

class SelectNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        }
    }
    handleSubmit = () => {
        const SubmitDAta = {
            phone: this.state.phone
        }
        console.log("phone no" + this.state.phone)

        // const phone =this.state
        // console.log(phone);
        console.log(SubmitDAta);
        console.log('hit')
        console.log('http://10.0.2.2:8000/user/phone/login/', SubmitDAta.phone);
        axios.post('http://10.0.2.2:8000/user/phone/login/', SubmitDAta)
            .then(res => {
                console.log(res.data)
                console.log(res.data.Details)
                let sfsdfsd = res.data.Details
                //   AsyncStorage.setItem('DetailsId', sfsdfsd);
                if (res.data.Status == 400) {
                    alert("Number is not ");
                }
                else if (res.data.Status == "Success") {
                    //  AsyncStorage.setItem('user_id')
                    AsyncStorage.setItem('DetailsId', res.data.Details);
                    this.props.navigation.navigate('Otp', { DetailsIdGet: res.data.Details, phoneNo: this.state.phone });

                }
                else {
                    console.log('else condtion')
                }
                //console.log(res);
                console.log(res.data.statusCode);
            })
            .catch(function (error) {
                console.log(error);
            });
        //event.preventDefault();
    }
    // _handleInput = () => {

    //     const { phone } = this.state;

    //     console.log('phone', phone)
    //     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //     if (phone.match(phoneno)) {

    //         //alert('Phone Number is Valid')
    //         this.props.navigation.navigate('Otp');
    //         return true;

    //     }
    //     else {
    //         alert("Invalid Phone Number");
    //         // this.setState({ valid: true })
    //         return false;
    //     }
    // }

    render() {

        // const user_name = this.props.navigation.getParam('userName'); 
        //console.log("User NAme-----",user_name)
        return (
            <SafeAreaView>
                <View style={styles.contr}>

                    {/* <Image source={require('../Assets/Images/Bed.png')} style={styles.imgBed} /> */}
                    <IndicatorViewPager
                        style={styles.imgSlider}
                        indicator={
                            <PagerDotIndicator pageCount={3} />
                        }>
                        <Image source={require('../Assets/Images/Bed.png')} />
                        <Image source={require('../Assets/Images/img01.jpg')} />
                        <Image source={require('../Assets/Images/Bed.png')} />
                    </IndicatorViewPager>

                    {/* <CustomButton

                    title={'CONTINUE'}
                    bgColor={Colors.white}
                    width={wp('90%')}
                    height={hp('7%')}
                    color={Colors.white}
                    fontSize={hp('2.5%')}
                    alignSelf={'center'}
                    marginTop={-hp('3%')}
                    borderRadius={hp('2%')}
                /> */}
                    <TextInput
                        placeholder='Enter Mobile Number'
                        placeholderTextColor={'#a2a2a2'}

                        style={styles.input}
                        keyboardType='name-phone-pad'
                        onChangeText={(phone) => this.setState({ phone: phone })}
                    />

                    <View style={styles.lowerContr}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: hp('3%'), alignItems: 'center', }}>
                            <View
                                style={styles.line}
                            />
                            <Text > OR </Text>
                            <View
                                style={styles.line}
                            />
                        </View>

                        <View style={styles.btnSet}>
                            <TouchableOpacity style={styles.payment}>
                                <Image source={require('../Assets/Images/Google.png')}
                                    style={{ width: wp('8%'), height: hp('4%'), }} />
                                <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.8%'), marginLeft: wp('1.5%') }}>Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.payment, { borderColor: Colors.blue }]}>
                                <Image source={require('../Assets/Images/Facebook.png')}
                                    style={{ width: wp('8%'), height: hp('4%'), }} />
                                <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.8%'), marginLeft: wp('1.5%') }}>Facebook</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity style={styles.lowerButton}>
                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.white }}>CONTINUE</Text>
                    </TouchableOpacity> */}
                        <CustomButton
                            onPress={() => this.handleSubmit()}
                            // onPress = {() =>  this.props.navigation.navigate('GeneralBeds')}
                            title={'CONTINUE'}
                            bgColor={'#2581d4'}
                            width={wp('90%')}
                            height={hp('7.5%')}
                            color={Colors.white}
                            fontSize={hp('2.4%')}
                            alignSelf={'center'}
                            marginTop={hp('3%')}
                            borderRadius={hp('1%')}
                        />
                        <View style={{ height: hp('5%'), width: wp('100%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <Text style={{ alignSelf: 'center', paddingTop: hp('1%'), color: Colors.blue, textDecorationLine: 'underline', fontSize: hp('1.5%') }}>Terms&Condition  </Text>
                            </TouchableOpacity>
                            <View >
                                <Text style={{ fontWeight: 'bold', color: Colors.black, marginTop: hp('1%'), fontSize: hp('1.5%') }}>and</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={{ alignSelf: 'center', paddingTop: hp('1%'), color: Colors.blue, marginLeft: wp('1%'), textDecorationLine: 'underline', fontSize: hp('1.5%') }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}
export default SelectNumber;

const styles = StyleSheet.create({
    contr: {
        width: wp('100%'),
        height: hp('100%')
    },
    lowerContr: {
        width: wp('100%'),
        height: hp('46.5%'),

    },
    imgSlider: {
        width: wp('100%'),
        height: hp('50%')
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: wp('25%'),
    },
    input: {
        width: wp('80%'),
        height: hp('7%'),
        fontSize: hp('2.5%'),
        //marginLeft: wp('3%'),
        //backgroundColor: 'pink',
        alignSelf: 'center',
        marginTop: -hp('3.5%'),
        paddingHorizontal: wp('7%'),
        borderRadius: hp('1%'),
        color: Colors.black,
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    lowerButton: {
        width: wp('90%'),
        height: hp('7%'),
        backgroundColor: 'blue',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp('2%'),
        marginTop: hp('5%')
    },
    payment: {
        flexDirection: 'row',
        width: wp('38%'),
        height: hp('6.2%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: hp('1.5%')
    },
    btnSet: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: wp('8%'),
        marginTop: hp('3%')
    }



})