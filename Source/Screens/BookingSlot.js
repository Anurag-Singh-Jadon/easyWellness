import React, { useState, useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, FlatList, Modal, Pressable, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '../Assets/Constants/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';
import Circle from '../ReusableComponent/Circle';
import CustomButton from '../ReusableComponent/Button';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Calender = (props) => {

    const [selectedTime, setSelectedTime] = useState('');
    const [selectedFormate, setSelectedFormate] = useState('');

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    const userBookingData = () => {

        let c = selectedDate.split("/");
        var r = Math.floor(1000 + Math.random() * 9000);
        let temp1 = c[2], temp2 = c[1], temp3 = c[0];
        c[0] = temp2;
        c[1] = temp1;
        c[2] = temp3;
        c = c.join("-");
        const userSlot = {
            bookingId: r,
            hospitalCode: '123',
            date: (c),
            time: '9:00',
            bookedtime: "02:40",
            // phone: "9793405249",


        }
        console.log(userSlot);

        axios.post('https://ehospi-new-api.herokuapp.com/api/hospitalBedBooking', userSlot)
            .then(response => {
                console.log('Booking Slot data is coming');
                console.log(response.data);
                if (response.data.status === "Booked bed sucessfully") {

                    props.navigation.navigate('SemiPrivateRoom')
                }
                else if (response.data.status === "Profile already created") {
                    alert("user is alredy register");

                }
                else {
                    console.log("Error Occured")
                }
            })
    }
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? Colors.circleColor : Colors.lightblueC;
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.id);
                    setSelectedTime(item.time);
                    setSelectedFormate(item.formate)
                }
                }
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };


    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
        }
    };

    const Data1 = [
        {
            id: 1,
            time: `07:00`, formate: `AM`
        },
        {
            id: 2,
            time: `08:00`, formate: `AM`
        },
        {
            id: 3,
            time: `09:00`, formate: `PM`
        },
        {
            id: 4,
            time: `10:00`, formate: `PM`
        },
        {
            id: 5,
            time: `11:00`, formate: `PM`
        },


    ]
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>

            {/* <Circle time={item.time} formate={item.formate}  /> */}

            <Text style={{ fontWeight: 'bold', color: Colors.white, fontSize: hp('2%') }}>{item.time}</Text>
            <Text style={{ fontWeight: 'bold', color: Colors.white, fontSize: hp('2%') }}>{item.formate}</Text>
        </TouchableOpacity>
    );
    const Data2 = [
        {
            id: 6,
            time: `12:00`, formate: `PM`
        },
        {
            id: 7,
            time: `01:00`, formate: `PM`
        },
        {
            id: 8,
            time: `02:00`, formate: `PM`
        },
        {
            id: 9,
            time: `03:00`, formate: `PM`
        },
        {
            id: 10,
            time: `04:00`, formate: `PM`
        },
        {
            id: 11,
            time: `40`, formate: `PM`
        },

    ]
    const Data3 = [
        {
            id: 12,
            time: `05:00`, formate: `PM`
        },
        {
            id: 13,
            time: `06:00`, formate: `PM`
        },
        {
            id: 14,
            time: `07:00`, formate: `PM`
        },
        {
            id: 15,
            time: `08:00`, formate: `PM`
        },


    ]
    const Data4 = [
        {
            id: 16,
            time: `09:00`, formate: `PM`
        },
        {
            id: 17,
            time: `10:00`, formate: `PM`
        },
        {
            id: 18,
            time: `11:00`, formate: `PM`
        },
        {
            id: 19,
            time: `12:00`, formate: `PM`
        },


    ]
    // const Item2 = ({ Item, onPress, backgroundColor, textColor }) => (
    //     <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>

    //         {/* <Circle time={item.time} formate={item.formate}  /> */}

    //         <Text>{Item.time}</Text>
    //         <Text>{Item.formate}</Text>
    //     </TouchableOpacity>
    // );
    const saveDate = () => {
        // Function to save the value in AsyncStorage

        // To check the input not empty
        AsyncStorage.setItem('date', selectedDate);
        // Setting a data to a AsyncStorage with respect to a key


        AsyncStorage.setItem('timing', selectedTime);
        AsyncStorage.setItem('formate', selectedFormate);

        console.log('Async me timing', selectedTime)
        console.log('Async me formate', selectedFormate)


        alert('Data Saved');
        // Alert to confirm



    };

    const DoubleFunc = () => {
        userBookingData();
        // props.navigation.navigate('SemiPrivateRoom')

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.upperContainer}>

                {/* <CalendarPicker
                    horizontal={true}
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={new Date(2018, 1, 1)}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={
                        [
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thur',
                            'Fri',
                            'Sat',
                            'Sun'
                        ]}
                    months={[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ]}
                    previousTitle="<"
                    previousTitleStyle={
                        {
                            fontSize: hp('3%'),
                            color: Colors.white
                        }
                    }
                    nextTitle=">"
                    nextTitleStyle={
                        {
                            fontSize: hp('3%'),
                            color: Colors.white
                        }
                    }
                    //todayBackgroundColor="#e6ffe6"
                    todayBackgroundColor="#4184f3"
                    selectedDayColor="#ffffff"
                    selectedDayTextColor="#000000"
                    //selectedDayTextColor="#66f"
                    scaleFactor={375}
                    textStyle={{
                        fontFamily: 'Cochin',
                        color: '#000000',


                    }}
                    onDateChange={onDateChange}


                    headerWrapperStyle={
                        {
                            backgroundColor: '#4184f3',
                            height: hp('7%'),


                        }

                    }
                /> */}
                <DatePicker
                    options={{
                        backgroundColor: '#ffffff',
                        textHeaderColor: '#0489D6',
                        textDefaultColor: '#000000',
                        selectedTextColor: '#fff',
                        mainColor: '#0489D6',
                        textSecondaryColor: '#0489D6',
                        borderColor: '#0489D6',
                    }}
                    //current="2020-01-13"
                    selected={selectedDate}
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}
                    onSelectedChange={(date) => {
                        setSelectedDate(date)
                        // console.log('date aaib gelau', date)
                    }
                    }
                />
                {/* <View style={styles.textStyle}>
                    <Text style={styles.textStyle}>
                        Selected Start Date :
                    </Text>
                    <Text style={styles.textStyle}>
                        {selectedStartDate ? selectedStartDate.toString() : ''}
                    </Text>
                    <Text style={styles.textStyle}>
                        Selected End Date :
                    </Text>
                    <Text style={styles.textStyle}>
                        {selectedEndDate ? selectedEndDate.toString() : ''}
                    </Text>
                </View> */}
            </View>
            <View style={styles.lowerContainer}>
                <Text style={{ padding: wp('4%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>Available Time</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('2%') }}>
                        <Text style={{ padding: wp('4%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>Morning Slot</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={Data1}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                        />
                    </View>
                    <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('1%') }}>
                        <Text style={{ padding: wp('4%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>Evening Slot</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={Data2}
                            renderItem={renderItem}
                            keyExtractor={(Item) => Item.id}
                            extraData={selectedId}
                        />
                    </View>
                    <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('1%') }}>
                        <Text style={{ padding: wp('4%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>Afternoon Slot</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={Data3}
                            renderItem={renderItem}
                            keyExtractor={(Item) => Item.id}
                            extraData={selectedId}
                        />
                    </View>
                    <View style={{ width: wp('100%'), height: hp('20%'), marginTop: hp('1%') }}>
                        <Text style={{ padding: wp('4%'), fontWeight: 'bold', fontSize: hp('2.5%') }}>Night Slot</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={Data4}
                            renderItem={renderItem}
                            keyExtractor={(Item) => Item.id}
                            extraData={selectedId}
                        />
                    </View>
                </ScrollView>
                <CustomButton
                    // onPress={() => props.navigation.goBack('SemiPrivateRooms')}
                    onPress={() => { saveDate(); DoubleFunc() }}
                    //  onPress={()=>{userBookingData()}}
                    title={'Confirm'}
                    bgColor={Colors.circleColor}
                    width={wp('90%')}
                    height={hp('8%')}
                    color={Colors.white}
                    fontSize={hp('2.5%')}
                    alignSelf={'center'}
                    marginTop={hp('1%')}
                    borderRadius={hp('1%')}
                />

            </View>

        </SafeAreaView>
    );
};
export default Calender;

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        // marginVertical: 8,
        marginHorizontal: 12,
        height: hp('10%'),
        width: hp('10%'),
        borderRadius: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp('3%')
    },
    title: {
        fontSize: 32,


    },
    textStyle: {
        marginTop: 10,
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    },
    upperContainer: {
        height: hp('49%'),
        //backgroundColor: 'pink'
    },
    lowerContainer: {
        height: hp('45.5%'),
        backgroundColor: 'white',
        borderTopLeftRadius: hp('5%'),
        borderTopRightRadius: hp('5%'),
        marginTop: hp('2%'),
        borderWidth: 1,
        borderBottomWidth: 0
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
});