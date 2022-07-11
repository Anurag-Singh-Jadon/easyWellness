import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, BackHandler } from 'react-native';
import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';
import CustomButton from '../ReusableComponent/Button';
import { IndicatorViewPager, PagerDotIndicator } from '@shankarmorwal/rn-viewpager';
import axios from 'axios';
// import { facebookurl } from './facebook';

const Login = ({ navigation }) => {
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

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setgmail(userInfo);
            //Navigate user where you want and store information
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }

        axios({
            method: 'get',
            url: 'https://ehospi-finally-done.herokuapp.com/api/auth/google',
            withCredentials: true
        })
            .then(function (response) {
                console.log('response==>', response.data);
                flag = true;
                //id = response.data.kid
            })
            .catch(function (response) {
                console.log('error');
            });
    };
    handleGoogle = () => {
        GoogleSignin.configure({
            androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE862811103066-d0oue8c16ecomgsq46pkc634osk870o8.apps.googleusercontent.com',
            // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    console.log(JSON.stringify(userInfo))

                }).catch((e) => {
                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
        })

    }
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

                <TouchableOpacity style={styles.upperButton}
                    onPress={() => navigation.navigate('SelectNumber', { itemId: 86 })}
                //    onPress={() => navigation.navigate('DrawerNavigator', { itemId: 86 })}
                // onPress={() => navigation.navigate('SemiPrivateRoom', { itemId: 86 })}
                >
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold', color: Colors.white }}>Login with Mobile Number</Text>
                </TouchableOpacity>
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
                        <TouchableOpacity onPress={handleGoogle} style={styles.payment}>
                            <Image source={require('../Assets/Images/Google.png')}
                                style={{ width: wp('8%'), height: hp('4%'), }} />
                            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.8%'), marginLeft: wp('1.5%') }}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.payment, { borderColor: Colors.blue }]}
                        //  onPress={handleSubmit}
                        >
                            <Image source={require('../Assets/Images/Facebook.png')}
                                style={{ width: wp('8%'), height: hp('4%'), }} />
                            <Text style={{ fontWeight: 'bold', color: Colors.black, fontSize: hp('1.8%'), marginLeft: wp('1.5%') }}>Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity style={styles.lowerButton}>
                        <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold', color: Colors.white }}>CONTINUE</Text>
                    </TouchableOpacity> */}
                    <CustomButton

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

                    <View style={{ height: hp('5%'), width: wp('100%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity >
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
export default Login;

const styles = StyleSheet.create({
    contr: {
        width: wp('100%'),
        height: hp('100%')
        //flex: 1
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
    upperButton: {
        width: wp('80%'),
        height: hp('7%'),
        backgroundColor: '#2581d4',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp('1%'),
        marginTop: -hp('3.5%')
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
        marginTop: hp('3%'),

    }


})