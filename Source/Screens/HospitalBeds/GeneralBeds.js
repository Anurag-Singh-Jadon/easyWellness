import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import HospitalCard from '../HospitalCard';
import axios from 'axios';
import { baseurl } from '../../Config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

const findAllHospital = baseurl + 'user/findHospital'

const GeneralBeds = (props) => {
    const [getValue, setGetValue] = useState(null);
    const [getTokenId, setTokenId] = useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [jatin, setJatin] = useState([]);
    const [hospitaddddddddlList, setHospitaldddddddList] = useState([]);
    const [get1, set1] = useState([])
    const [getInsuranceHospitalData, setInsuranceHospitalData] = useState([])
    const [theArray, setTheArray] = useState([]);
    const [selectedHospitalCode, setSelectedHospitalCode] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [getInsuranceName, setInsuranceName] = useState([]);
    const [getDropdownValue, setDropdownValue] = useState('Insurance List')
    const [getsetKmm, setKmm] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };

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

    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        getInsuranceList();
        getValueFunction();
        insuranceSelect();

    }, [getTokenId]);

    const selfPay = () => {

        getHospitalList();
    }
    const getHospitalList = () => {
        setIsLoading(true)
        fetch(baseurl + 'user/findHospital', { headers: { "Authorization": `Bearer ${getTokenId}` } })
            .then((response) => response.json())
            .then(async (responseJson) => {

                await setHospitaldddddddList(responseJson);

            })
            .catch((error) => {
                // console.error(error);
            }).finally(() => setIsLoading(false));
    }
    const getInsuranceList = () => {
        setIsLoading(true)
        fetch(baseurl + 'user/findInsurance', { headers: { "Authorization": `Bearer ${getTokenId}` } })
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                // console.log(responseJson[0].latitude, responseJson[0].longitude)
                // console.log(' Insurance responseJson data')
                // console.log(responseJson)
                responseJson.unshift({ "insurance": "Self Pay" });
                setInsuranceName(responseJson)


            })
            .catch((error) => {
                // console.error(error);
            }).finally(() => setIsLoading(false));
    }
    const insuranceSelect = (item) => {
        console.log('item value---------')
        console.log(item && item.insurance);
        let p;
        item ? p = item.insurance : ""
        setIsLoading(true)
        axios.get(baseurl + 'user/insuranceHospital/' + p, { headers: { "Authorization": `Bearer ${getTokenId}` } })
            .then(async response => {
                //  setKmm(response.data)
                await setHospitaldddddddList(response.data);

                //  return setTheArray(response.data)
            }).catch((e) => {
                console.log(e)
            }).finally(() => setIsLoading(false));
    }
    const LanguageSelector = () => {
        //console.log('Language Select', selectedLanguage);
    }

    const getValueFunction = () => {
        // Function to get the value from AsyncStorage
        try {
            AsyncStorage.getItem('First_Name').then(
                (value) =>

                    setGetValue(value),

            );
            AsyncStorage.getItem('tokenId').then(
                (value) =>
                    setTokenId(value),
                // console.log('setTokenValue'),
                // console.log(getTokenId)
            )
        } catch (error) {
            console.log(error)
        }
    };
    const searchFilterFunction = (text) => {

        if (text) {

            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.hospitalName
                        ? item.hospitalName.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);

            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        // console.log('latValue,longValue--------------------')
        // console.log(item.data[0])
        return (
            (getDropdownValue === 'Self Pay' ?

                <View >
                    {/* {hospitaddddddddlList.length !== 0 && hospitaddddddddlList.map((val) => { */}


                    {/* return ( */}
                    <View style={{ width: wp('100%'), height: hp('15%'), marginTop: hp('1.5%'), backgroundColor: Colors.white }}>
                        <View style={{ height: hp('9%'), padding: wp('2%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View >
                                <Text style={{ fontSize: hp('2.6%'), color: Colors.black, fontWeight: 'bold' }}>{item.hospitalName}</Text>
                                <Text style={{ fontSize: hp('1.6%'), color: Colors.black, }}>{item.city}</Text>
                            </View>
                            <TouchableOpacity style={{ width: wp('22%'), height: hp('4.8%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC0EF', borderRadius: hp('1%'), marginRight: hp('1%') }}
                                // onPress={() => getItem(item)}
                                onPress={() => {
                                    setSelectedHospitalCode(item.hospitalCode)
                                    AsyncStorage.setItem('Hcode', item.hospitalCode);
                                    AsyncStorage.setItem('Hname', item.hospitalName);
                                    AsyncStorage.setItem('Haddress', item.hospitalAddress);
                                    //setSelectedHospitalCode('');
                                    // alert('Hospital Code saves', val.data[0].hospitalName)
                                    props.navigation.navigate('HospitalDetailScreen')
                                    // alert(val.data[0].hospitalCode);

                                }}
                            >
                                <Text style={{ color: Colors.white, fontWeight: '800', fontSize: hp('1.6%') }}>View & Book</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: hp('6%'), width: wp('100%'), flexDirection: 'row', }}>
                            <View style={{ height: hp('6%'), width: wp('65%'), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '600', marginLeft: wp('1%') }}>Availability of Beds:</Text>
                                <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: '#7BC0EF', borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{item.numberOfBeds}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: Colors.lightGreen, borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('1%') }}>
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{item.numberOfBeds}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('6%'), width: wp('35%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                                <Text style={{ fontSize: hp('1.3%'), marginLeft: wp('1%'), color: Colors.black }}>{props.t3}</Text>
                            </View>
                        </View>
                    </View>
                    {/* ) */}
                    {/* })} */}

                </View>
                :


                <View >

                    {/* {get1.length !== 0 && get1.map((val) => {
                    
                    return ( */}
                    <View style={{ width: wp('100%'), height: hp('15%'), marginTop: hp('1.5%'), backgroundColor: Colors.white }}>
                        <View style={{ height: hp('9%'), padding: wp('2%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View >
                                <Text style={{ fontSize: hp('2.6%'), color: Colors.black, fontWeight: 'bold' }}>{item.data && item.data[0].hospitalName}</Text>
                                <Text style={{ fontSize: hp('1.6%'), color: Colors.black, }}>{item.data && item.data[0].city}</Text>
                            </View>
                            <TouchableOpacity style={{ width: wp('22%'), height: hp('4.8%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC0EF', borderRadius: hp('1%'), marginRight: hp('1%') }}
                                // onPress={() => getItem(item)}
                                onPress={() => {
                                    setSelectedHospitalCode(item.data && item.data[0].hospitalCode)
                                    AsyncStorage.setItem('Hcode', item.data && item.data[0].hospitalCode);
                                    AsyncStorage.setItem('Hname', item.data && item.data[0].hospitalName);
                                    AsyncStorage.setItem('Haddress', item.data && item.data[0].hospitalAddress);
                                    //setSelectedHospitalCode('');
                                    // alert('Hospital Code saves', val.data[0].hospitalName)
                                    props.navigation.navigate('HospitalDetailScreen')
                                    // alert(val.data[0].hospitalCode);

                                }}
                            >
                                <Text style={{ color: Colors.white, fontWeight: '800', fontSize: hp('1.6%') }}>View & Book</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: hp('6%'), width: wp('100%'), flexDirection: 'row', }}>
                            <View style={{ height: hp('6%'), width: wp('65%'), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '600', marginLeft: wp('1%') }}>Availability of Beds:</Text>
                                <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: '#7BC0EF', borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{item.data && item.data[0].numberOfBeds}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: Colors.lightGreen, borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('1%') }}>
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{item.data && item.data[0].numberOfBeds}</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ height: hp('6%'), width: wp('35%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                                    <Text style={{ fontSize: hp('1.3%'), marginLeft: wp('1%'), color: Colors.black }}>{props.t3}</Text>
                                </View> */}
                        </View>
                    </View>
                    {/* )
                })}  */}

                </View>
            )

        );

    };



    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: wp('70%'), alignSelf: 'center',

                }}
            />
        );
    };


    const getItem = (item) => {
        let Hcode = selectedHospitalCode;
        AsyncStorage.setItem('Hcode', Hcode);
        props.navigation.navigate('HospitalDetailScreen')

    }

    // const HospitalData = () => {
    //     axios.get(findAllHospital)
    //         .then(response => {
    //             return setTheArray(response.data)
    //         })
    // }

    // const data = theArray;
    // console.log('insurance list',hospitaddddddddlList)
    return (

        <View style={styles.contnr}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#B2F3FF', '#0489D6']} style={{ borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }} >
                <View style={{ width: wp('100%'), height: hp('20%'), flexDirection: 'row', justifyContent: 'space-between', padding: wp('2%'), alignItems: 'center', }}>

                    <View style={{ padding: wp('2%') }}>
                        <Text style={{ fontSize: hp('2.5%'), color: Colors.white, }}>Hi, {getValue}</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), color: Colors.white, }}>Find Your Hospital </Text>
                    </View>
                </View>
            </LinearGradient>

            <Searchbar style={{ width: wp('85%'), height: hp('7%'), alignSelf: 'center', marginTop: -hp('3.5%'), borderRadius: hp('5%') }}
                placeholder="Search"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
            />
            {isLoading ? (
                <ActivityIndicator color='#bc2b78'
                    size="large" style={{ flex: 1, alignSelf: 'center', marginTop: 25 }} />
            ) : (
                <View style={{ height: hp('7%'), justifyContent: 'center', alignSelf: 'center', width: wp('100%'), alignItems: 'center', }}>

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: '#249cf2' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={getInsuranceName}
                        maxHeight={300}
                        labelField="insurance"
                        valueField="insurance"
                        placeholder={getDropdownValue}
                        // searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            // setValue(item.insurance);
                            //setValue((item.insurance == 'Self Pay') ? selfPay() : item.insurance )
                            setValue((item.insurance == 'Self Pay') ? selfPay() : item.insurance ? insuranceSelect(item) : item.insurance)
                            setDropdownValue(item.insurance);

                        }

                        }

                    />
                </View>
            )}
            <View style={{ height: hp('69.5%') }}>

                <FlatList
                    data={hospitaddddddddlList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                // renderItem={ ItemView  => await(
                //     // return a component using that data
                //   )}

                />
            </View>

        </View >

    )
}


export default GeneralBeds;

const styles = StyleSheet.create({
    contnr: {
        width: wp('100%'),
        height: hp('75%'),
        alignItems: 'center'

    },
    txt: {
        fontWeight: 'bold',
        fontSize: hp('2.7%')
    },
    itemStyle: {
        padding: 10,
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
    },
    dropdown: {
        height: hp('5%'),
        borderColor: '#0489D6',
        borderWidth: wp("0.3%"),
        borderRadius: 8,
        //paddingHorizontal: 8,
        width: wp('95%'),
        // backgroundColor:'green'
    },
    icon: {
        marginRight: wp('0.5%'),
        color: '#249cf2'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'blue',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,

    },
    placeholderStyle: {
        fontSize: 15,
        marginHorizontal: wp('2%')
    },
    selectedTextStyle: {
        fontSize: hp('2%'),
        fontWeight: "bold",
        marginHorizontal: wp('2%')

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});