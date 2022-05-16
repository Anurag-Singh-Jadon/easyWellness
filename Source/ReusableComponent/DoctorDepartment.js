import React from 'react'
import { Text, TouchableOpacity, ImageBackground } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
const DoctorDepartment = (props) => {

    return (
        <TouchableOpacity>
            <ImageBackground source={props.source}
                style={{ width: wp('24%'), height: wp('24%'), borderRadius: hp('1.6%'), marginTop: hp('2%'), marginRight: wp('1%'), alignItems: "center", justifyContent: 'center', marginHorizontal: wp('3.5%') }}
            >
                <FontAwesome5Icon name={props.name} size={25} style={{ color: "#ffffff" }} />
                <Text style={{ color: "#ffffff", fontSize: hp('1.5%'),marginTop:hp('1%') }}>{props.t1}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}


export default DoctorDepartment;
//tooth  Dentist