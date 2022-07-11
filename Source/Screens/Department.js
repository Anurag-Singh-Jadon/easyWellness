import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity, BackHandler } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Colors from '../Assets/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseurl } from '../Config/baseurl';

const Department = (props) => {
    const [expanded, setExpanded] = React.useState(true);
    const [getValue, setGetValue] = useState('');
    const [getHospitalCode, setHospitalCode] = useState([]);
    const [getDepartmentValue, setDepartmentValue] = useState([]);
    const handlePress = () => setExpanded(!expanded);
    const [getTokenId, setTokenId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [getHospitalAddress, setHospitalAddress] = useState('');
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

    useEffect(() => {
        displayData();
        HospitalDepartment();
    }, [getTokenId]);
    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('Hname').then(
                (Hname) =>
                    setGetValue(Hname),
            )
            let user2 = await AsyncStorage.getItem('Hcode').then(
                (code) =>
                    setHospitalCode(code)

            )
            let user3 = await AsyncStorage.getItem('Haddress').then(
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
    const HospitalDepartment = () => {
        setIsLoading(true)
        // console.log('code wise Hospital Department')
        axios.get(baseurl + 'user/findDepartment/' + getHospitalCode, { headers: { "Authorization": `Bearer ${getTokenId}` } })
            .then(response => {
                setDepartmentValue(response.data[0].details)
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
            <View style={{ marginTop: hp('-1%'), padding: wp('2%'), height: hp('8%') }}>
                <Text style={{ fontSize: hp('3%'), color: Colors.black, fontWeight: 'bold', }}>{getValue}</Text>
                <Text style={{ fontSize: hp('2%'), color: Colors.black, }}>{getHospitalAddress}</Text>
            </View>
            <View style={{ width: wp('100%'), height: hp('7%'), backgroundColor: 'pink', flexDirection: 'row' }} >
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('About')} >
                    <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#00abf6', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }}  >
                    <Text>Department</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: wp('33.33%'), height: hp('7%'), backgroundColor: '#abdcfb', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#00abf6' }} onPress={() => props.navigation.navigate('BookBed')}>
                    <Text>Bed Booking</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lowerContainer}>
                <List.Section >
                    <View style={{ height: hp('51.5%') }}>
                        {isLoading ? (
                            <ActivityIndicator color='#bc2b78'
                                size="large" style={{ flex: 1, alignSelf: 'center', marginTop: 25 }} />
                        ) : (
                            <ScrollView >
                                {getDepartmentValue.length !== 0 && getDepartmentValue.map((val) => {
                                    return (
                                        <List.Accordion
                                            title={val.department}
                                        >
                                        </List.Accordion>
                                    )
                                })}
                            </ScrollView>
                        )}
                    </View>
                </List.Section>
            </View>
        </View>
    );
};



export default Department;

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