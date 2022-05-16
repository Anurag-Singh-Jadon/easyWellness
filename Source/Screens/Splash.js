import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Text, ActivityIndicator, Animated } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../Assets/Constants/Colors';


// const FadeInView = (props) => {
//     const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

//     useEffect(() => {
//       Animated.timing(
//         fadeAnim,
//         {
//           toValue: 1,
//           duration: 5000,
//           useNativeDriver: true
//         },

//       ).start();


//     }, [fadeAnim])


//     useEffect(() => {
//     setTimeout(() => {
//                 props.navigation.replace('Login')
//     }, 2000);
// }, [fadeAnim])
//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }

// You can then use your `FadeInView` in place of a `View` in your components:
// export default () => {
//   return (

//       <FadeInView style={{width: 250, height: 200, }}>

//       <View style={styles.container}>
//                <View style={{ width: wp('100%'), height: hp('92%'), alignItems: 'center', justifyContent: 'center', }}>

//                    <Image source={require('../Assets/Images/eHospi.png')}
//                        style={{ justifyContent: 'space-between', width: wp('55%'), height: hp('30%'), }} />
//                </View>
//                <View style={{ width: wp('100%'), height: hp('8%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                    <Image source={require('../Assets/Images/india.png')}
//                        style={{ width: wp('6%'), height: hp('3%'), }} />
//                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), marginLeft: wp('1%'), }}>Made in India</Text>
//                </View>


//           </View>
//       </FadeInView>

//   )
// }

const Splash = ({ navigation }) => {
    //State for ActivityIndicator Animation
    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);

            navigation.replace('Login')

        }, 2000);

    }, []);


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={{ width: wp('100%'), height: hp('88%'), alignItems: 'center', justifyContent: 'center', }}>

                    <Image source={require('../Assets/Images/eHospi.png')}
                        style={{ justifyContent: 'space-between', width: wp('55%'), height: hp('30%'), }} />
                </View>
                <View style={{ width: wp('100%'), height: hp('8%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    <Image source={require('../Assets/Images/india.png')}
                        style={{ width: wp('5%'), height: wp('5%') }} />
                    <Text style={{ fontWeight: 'bold', fontSize: hp('2%'), marginLeft: wp('1%'), }}>Made in India</Text>
                </View>


            </View>


        </SafeAreaView >
    )
}

export default Splash;
const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%')
    },
    midContainer: {
        alignSelf: 'center',
        flexDirection: 'row'
    },
    logo: {
        height: hp('12%'),
        width: hp('12%')
    },
    logoCntnr: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    yellowTxt: {
        fontSize: hp('4%'),
        fontWeight: 'bold',
        color: Colors.lightYellow,
    },
    blackTxt: {
        fontSize: hp('4%'),
        fontWeight: 'bold',
        color: Colors.black
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})




