import React,{ useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DoctorCard from '../Screens/DoctorCard';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Colors from '../Assets/Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Department = (props) => {
    const [expanded, setExpanded] = React.useState(true);
    const [getValue, setGetValue] = useState('');
    const [getHospitalCode,setHospitalCode] = useState([]);
    const [getDepartmentValue , setDepartmentValue] = useState([]);
    const handlePress = () => setExpanded(!expanded);

    const Data1 = [
        {
            t1: `Dr Elina George`, text2: `Cardiac surgeon at Apollo Hospital`, text3: `12 Years`, charges: `₹1499`
        },
        {
            t1: `Dr Vipul Mohan`, text2: `General Practitioner`, text3: `13 Years`, charges: `₹2000`
        },
        {
            t1: `Dr Sameer Gupta`, text2: `Heart Specialist Noida`, text3: `10 Years`, charges: `₹1999`
        },
        {
            t1: `Dr Elina George`, text2: `Cardiac surgeon at Apollo Hospital`, text3: `12 Years`, charges: `₹1499`
        },
        {
            t1: `Dr Vipul Mohan`, text2: `General Practitioner`, text3: `13 Years`, charges: `₹2000`
        },
        {
            t1: `Dr Sameer Gupta`, text2: `Heart Specialist Noida`, text3: `10 Years`, charges: `₹1999`
        },

    ]
    useEffect(() => {
        displayData();
        HospitalDepartment();
           });
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
            // console.log('getHospitalCode==================')
            // console.log(getHospitalCode)
        }
        catch (error) {
            alert(error)
        }
    }
    const HospitalDepartment = () => {
        // console.log('code wise Hospital Department')
         axios.get('http://10.0.2.2:8000/user/findDepartment/' + getHospitalCode, { headers: { "Authorization": `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJwaDg5NTA2MTIzNTIiLCJpYXQiOjE2NTI2NzcxOTAsImV4cCI6MTY1Mjc2MzU5MH0.o8UV_ikmevKxUXAG1UC9Rn0fDIR1mhBtK8zEeGvh81Q'}` } })
             .then(response => {
                // console.log('------------response.data--------')
                //    console.log(response.data)
                   setDepartmentValue(response.data[0].details)
                // setServices(response.data[0].details[0].department)
              
                //  console.log(response.data[0].details[0].department)
             })
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
                <Text style={{ fontSize: hp('2%'), color: Colors.black, }}>{getHospitalCode}</Text>
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
                        <ScrollView >
                        {getDepartmentValue.length!==0 && getDepartmentValue.map((val) => {
                            return (
                        <List.Accordion
                            title={val.department}

                            // onPress={DoubleFunc}
                            >
                            {/* <View style={{ flex: 1, padding: 24 }}>
                                {isLoading ? (
                                    <ActivityIndicator />
                                ) : (
                                    <FlatList
                                        data={data}
                                        keyExtractor={({ id }, index) => id}
                                        renderItem={({ item }) => (
                                            <Text style={{ fontSize: 25 }} key={item.id}>
                                                {item.title}, {item.releaseYear}
                                            </Text>
                                        )}
                                    />
                                )}
                            </View> */}
                        </List.Accordion>
                         )
                        })} 
                        </ScrollView>
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