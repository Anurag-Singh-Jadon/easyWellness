import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
import { Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import HospitalCard from '../HospitalCard';
import axios from 'axios';
import { baseurl } from '../../Config/baseurl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

const findAllHospital = 'http://10.0.2.2:8000/user/findHospital'

const GeneralBeds = (props) => {
    const [getValue, setGetValue] = useState(null);
    const [getTokenId, setTokenId] = useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [jatin, setJatin] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);
    const [theArray, setTheArray] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedHospitalCode, setSelectedHospitalCode] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [getInsuranceName, setInsuranceName] = useState([]);
    const [getDropdownValue, setDropdownValue] = useState('Insurance List')


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

    const onChangeSearch = query => setSearchQuery(query);
    useEffect(() => {
        getInsuranceList();
        getValueFunction();
        HospitalData();
        // console.log("----------------getTokenValue-======================");
        console.log(getTokenId);
    }, []);

    const selfPay = () => {

        getHospitalList();
    }
    const getHospitalList = () => {
        fetch('http://10.0.2.2:8000/user/findHospital', { headers: { "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDgzNDkxMDU3OTgiLCJpYXQiOjE2NTI2NzQ3MjIsImV4cCI6MTY1Mjc2MTEyMn0.MHdBlSzt6XaYD31sXwPFUATga7QCIDNq-IwJQIJ0N9g'}` } })
            .then((response) => response.json())
            .then((responseJson) => {
                // setJatin(responseJson);
                setHospitalList(responseJson);
                // setMasterDataSource(responseJson);
                // console.log(responseJson[0].latitude, responseJson[0].longitude)
                console.log('responseJson data')
                console.log('Self Pay',responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const getInsuranceList = () => {
        fetch('http://10.0.2.2:8000/user/findInsurance', { headers: { "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDgzNDkxMDU3OTgiLCJpYXQiOjE2NTI2NzQ3MjIsImV4cCI6MTY1Mjc2MTEyMn0.MHdBlSzt6XaYD31sXwPFUATga7QCIDNq-IwJQIJ0N9g'}` } })
            .then((response) => response.json())
            .then((responseJson) => {
                setFilteredDataSource(responseJson);
                setMasterDataSource(responseJson);
                // console.log(responseJson[0].latitude, responseJson[0].longitude)
                console.log(' Insurance responseJson data')
                console.log(responseJson)
                responseJson.unshift({ "insurance": "Self Pay" });
                setInsuranceName(responseJson)
                console.log(' Insurance responseJson data--------------')

            })
            .catch((error) => {
                console.error(error);
            });
    }
    const insuranceSelect = (item) => {
        console.log(item.insurance);

        fetch('http://10.0.2.2:8000/user/insuranceHospital/' + item.insurance, { headers: { "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDgzNDkxMDU3OTgiLCJpYXQiOjE2NTI2NzQ3MjIsImV4cCI6MTY1Mjc2MTEyMn0.MHdBlSzt6XaYD31sXwPFUATga7QCIDNq-IwJQIJ0N9g'}` } })
            .then((response) => response.json())
            .then((responseJson) => {
                // setFilteredDataSource(responseJson);
                // setMasterDataSource(responseJson);
                // setJatin(responseJson);
                setHospitalList(responseJson);
                // setSelectedLanguage(item.data[0].hospitalName);
                console.log(item.data[0].hospitalName);
                console.log('specific', responseJson);
                // console.log(responseJson[0].latitude, responseJson[0].longitude)
                console.log(' Insurance name wise responseJson data')
                if (responseJson.length === 0) {
                    console.log("No hospital found")
                }
                else {
                    responseJson.map((v) => {
                        console.log(v.data[0])
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }
    const LanguageSelector = () => {
        //console.log('Language Select', selectedLanguage);
    }

    const getValueFunction = () => {
        // Function to get the value from AsyncStorage
        try {
            AsyncStorage.getItem('any_key_here').then(
                (value) =>

                    setGetValue(value),

            );
            AsyncStorage.getItem('tokenId').then(
                (value) =>
                    setTokenId(value),
                console.log('setTokenValue'),
                console.log(getTokenId)
            )
        } catch (error) {
            console.log(error)
        }
    };
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
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
        // const latValue= item.latitude
        // const longValue= item.longitude
        // console.log('latValue,longValue')
        // console.log(latValue,longValue)

        return (

 ( getDropdownValue || getInsuranceName === 'Self Pay' ? 

                 <View >
            {hospitalList.length !== 0 && hospitalList.map((val) => {
                // console.log("Slf Pay", val);
                return (
                    <View style={{ width: wp('100%'), height: hp('15%'), marginTop: hp('1.5%'), backgroundColor: Colors.white }}>
                        <View style={{ height: hp('9%'), padding: wp('2%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <View >
                                <Text style={{ fontSize: hp('2.6%'), color: Colors.black, fontWeight: 'bold' }}>{val.hospitalCode}</Text>
                                <Text style={{ fontSize: hp('1.6%'), color: Colors.black, }}>{val.city}</Text>
                            </View>
                            <TouchableOpacity style={{ width: wp('22%'), height: hp('4.8%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC0EF', borderRadius: hp('1%'), marginRight: hp('1%') }}
                               // onPress={() => getItem(item)}
                               onPress={() => {
                                setSelectedHospitalCode(val.hospitalCode)
                                AsyncStorage.setItem('Hcode', val.hospitalCode);
                                AsyncStorage.setItem('Hname', val.hospitalName);
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
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{val.numberOfBeds}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: Colors.lightGreen, borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('1%') }}>
                                    <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{val.numberOfBeds}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: hp('6%'), width: wp('35%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                                <Text style={{ fontSize: hp('1.3%'), marginLeft: wp('1%'), color: Colors.black }}>{props.t3}</Text>
                            </View>
                        </View>
                    </View>
                )
            })}

        </View>
:

         
            <View >
                {hospitalList.length !== 0 && hospitalList.map((val) => {
                    console.log("Other", val);
                    return (
                        <View style={{ width: wp('100%'), height: hp('15%'), marginTop: hp('1.5%'), backgroundColor: Colors.white }}>
                            <View style={{ height: hp('9%'), padding: wp('2%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View >
                                    <Text style={{ fontSize: hp('2.6%'), color: Colors.black, fontWeight: 'bold' }}>{val.data[0].hospitalCode}</Text>
                                    <Text style={{ fontSize: hp('1.6%'), color: Colors.black, }}>{val.data[0].city}</Text>
                                </View>
                                <TouchableOpacity style={{ width: wp('22%'), height: hp('4.8%'), alignItems: 'center', justifyContent: 'center', backgroundColor: '#7BC0EF', borderRadius: hp('1%'), marginRight: hp('1%') }}
                                    // onPress={() => getItem(item)}
                                    onPress={() => {
                                        setSelectedHospitalCode(val.data[0].hospitalCode)
                                        AsyncStorage.setItem('Hcode', val.data[0].hospitalCode);
                                        AsyncStorage.setItem('Hname', val.data[0].hospitalName);
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
                                        <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{val.data[0].numberOfBeds}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: wp('18%'), height: hp('3.6%'), backgroundColor: Colors.lightGreen, borderRadius: hp('0.5%'), alignItems: 'center', justifyContent: 'center', marginLeft: wp('1%') }}>
                                        <Text style={{ color: Colors.white, fontSize: hp('1.5%') }}>{val.data[0].numberOfBeds}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ height: hp('6%'), width: wp('35%'), padding: wp('1%'), alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>

                                    <Text style={{ fontSize: hp('1.3%'), marginLeft: wp('1%'), color: Colors.black }}>{props.t3}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}

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
        // Function for click on an item
        // alert('Id : ' + item.latitude + ' Title : ' + item.longitude);

        //console.log("item id" + item.latitude)
        let Hcode = selectedHospitalCode;
        AsyncStorage.setItem('Hcode', Hcode);
        //setSelectedHospitalCode('');
        // alert('Hospital Code saves', Hcode)
        props.navigation.navigate('HospitalDetailScreen')
        //let Location = item.hospitalLocation;
        // console.log('Hospital data===', item.latitude)

    }
    const onclick_it = (item, index) => {
        // console.log("index value====" + index)
        // alert('switch case')
        // console.log(item._id)
        // console.log("Key Value====!! " + item.hospitalName)
        // console.log(item.hospitalName)


        // if (item.index.hospital == 'Fortis Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'Max Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'Apollo Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'AIIMS Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'Lotus Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'Jaypee Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
        // else if (item.hospital == 'Surbhi Hospital') {
        //     props.navigation.navigate('HospitalDetailScreen')
        // }
    }

    const HospitalData = () => {
        axios.get(findAllHospital)
            .then(response => {
                return setTheArray(response.data)
            })
    }

    const data = theArray;

    return (

        <View style={styles.contnr}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#B2F3FF', '#0489D6']} style={{ borderBottomLeftRadius: hp('3%'), borderBottomRightRadius: hp('3%') }} >
                <View style={{ width: wp('100%'), height: hp('20%'), flexDirection: 'row', justifyContent: 'space-between', padding: wp('2%'), alignItems: 'center', }}>

                    <View style={{ padding: wp('2%') }}>
                        <Text style={{ fontSize: hp('2.5%'), color: Colors.white, }}>Hi, {getValue}</Text>

                        <Text style={{ fontWeight: 'bold', fontSize: hp('3%'), color: Colors.white, }}>Find Your Hospital </Text>
                    </View>

                    {/* <Image source={require('../../Assets/Images/doctor.jpg')}
                        style={{ width: wp('18%'), height: wp('18%'), borderRadius: hp('5%') }} /> */}
                </View>
            </LinearGradient>

            <Searchbar style={{ width: wp('85%'), height: hp('7%'), alignSelf: 'center', marginTop: -hp('3.5%'), borderRadius: hp('5%') }}
                placeholder="Search"
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
            />
            <View style={{ height: hp('7%'), justifyContent: 'center', alignSelf: 'center', width: wp('100%'), alignItems: 'center', }}>

                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#249cf2' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={getInsuranceName}
                    //{data=getInsuranceName.map((i)=>{labelField=i.insurance,valueField=i.insurance})}

                    // search
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
                        // console.log(Value)
                    }

                    }
                // renderLeftIcon={() => (
                //     <AntDesign
                //         style={styles.icon}
                //         color={isFocus ? 'blue' : 'black'}
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                />
            </View>
            <View style={{ height: hp('72.5%') }}>

                <FlatList
                    data={hospitalList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>

            {/* <TouchableOpacity
                onPress={HospitalData}
                style={{ width: wp('70%'), height: hp('6%'), justifyContent: 'center', alignItems: 'center', backgroundColor: '#00ABF6', borderRadius: hp('1.5%'), marginBottom: hp('1%') }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: hp('2.2%') }}>Submit</Text>
            </TouchableOpacity> */}

            {/* <View>


                <FlatList
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) =>

                        <HospitalCard
                            hospital={item.hospitalName}
                            speciality={item.hospitalLocation}
                            t1={item.allbeds}
                            t2={item.allbeds}
                            t3={item.t3}
                            onPress={() => onclick_it(item, index)}
                        />
                    }
                />

            </View> */}
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