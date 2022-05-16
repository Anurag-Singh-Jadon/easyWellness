import { LogBox, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Platform, PermissionsAndroid, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../Assets/Constants/Colors';
//import { Calendar } from 'react-native-calendario';
// import { Checkbox } from 'react-native-paper';
import CustomButton from '../../ReusableComponent/Button';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';
// import Colors from '../../Assets/Constants/Colors';
//import { globalStyles } from './screens/styles/globals';
import { baseurl } from '../../Config/baseurl';
import axios from 'axios';
const userHospitalFormReg = 'https://ehospifinallyapp.herokuapp.com/hospitalForm'

const HospitalForm = (props) => {
    const [patientName, setPatientName] = useState('');
    const [addFamilyMember, setAddFamilyMember] = useState('');
    const [selectedGender, setSelectedGender] = useState("");
    const [fName, setFName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [mincome, setMincome] = useState('');
    const [occupation, setOccupation] = useState('');
    const [altContactNo, setAltContactNo] = useState('');
    const [dName, setDName] = useState('');
    const [uploadP, setUploadP] = useState('');
    const [uploadId, setUploadId] = useState('');
    const [minsurance, setMinsurance] = useState('');
    const [policyNo, setPolicyNo] = useState('');
    const [empName, setEmpName] = useState('');
    const [empId, setEmpId] = useState('');
    const [getHospitalCode, setHospitalCode] = useState('');
    const [getValue, setGetValue] = useState('');
    const [date, setDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    // CheckBox
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [singleFile, setSingleFile] = useState('');
    const [filePath, setFilePath] = useState({});
    const selectOneFile = async () => {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            setSingleFile(res);
            console.log(res)
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Back to Hospital Form');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };


    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`', 'componentWillReceiveProps']);
    }, [])
      const GetBookBedData = () => {
        AsyncStorage.getItem('Ward').then(
            (value) =>

                setWard(value),

        );
        AsyncStorage.getItem('Hname').then(
            (hname) =>

                setGetValue(hname),
                    );
        AsyncStorage.getItem('Hcode').then(
            (code) =>

                setHospitalCode(code),
        );
    }
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                setFilePath(response);
            });
        }
    };
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
        });
    };

    const validForm = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        const reg = /^[6-9]{1}[0-9]{9}$/;
        const rule = /^[a-zA-Z ]{2,40}$/;
        const DOB_REGEX = /^((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01]))-((20[012]\d|19\d\d)|(1\d|2[0123]))$/;

        if (rule.test(patientName) == '') {
            alert('Enter the Patient Name')
        }

        else if (rule.test(addFamilyMember) == '') {
            alert('Enter Family Member Name');
        }
        else if (DOB_REGEX.test(date) == '') {
            alert('Select Your Date of Birth');
        }

        else if (selectedGender == '') {
            alert('Select Your Gender');
        }

        else if (rule.test(fName) == '') {
            alert('Enter Your Fathers/Husband Name');
        }

        else if (address == '') {
            alert('Enter Your Address');
        }

        else if (reg.test(mobileNumber) == '') {
            alert('Enter Your Correct Mobile No.');
        }

        else if (emailRegex.test(email) == '') {
            alert('Enter Your Email');
        }

        else if (nationality == '') {
            alert('Select Your Nationality');
        }

        else if (religion == '') {
            alert('Select Your Religion');
        }

        else if (mincome == '') {
            alert('Enter Your Monthly Income');
        }

        else if (rule.test(occupation) == '') {
            alert('Enter your Occupation');
        }

        else if (reg.test(altContactNo) == '') {
            alert('Enter correct Alt.Contact No.');
        }

        else if (rule.test(dName) == '') {
            alert('Enter Doctor Name');
        }

        else if (minsurance == '') {
            alert('Enter Medical Insurance');
        }

        else if (policyNo == '') {
            alert('Enter Your PolicyNo.');
        }

        else if (rule.test(empName) == '') {
            alert('Enter Employer Name');
        }

        else if (empId == '') {
            alert('Enter Employer Id');
        }
        else if (toggleCheckBox == false) {
            alert('Click on Checkbox to Confirm then Submit');
        }

        else {
            alert('Form Submitted Successfully')
            // props.navigation.navigate('SemiPrivateRoom')
        }

    };
    const userProfileData = () => {

        const userData = {
            patientName: (patientName),
            familyMember: (addFamilyMember),
            dob: (date),
            gender: (selectedGender),
            fatherHusbandName: (fName),
            address: (address),
            phone: (mobileNumber),
            email: (email),
            nationality: (nationality),
            religion: (religion),
            monthlyIncome: (mincome),
            occupation: (occupation),
            altPhone: (altContactNo),
            doctorName: (dName),
            policyNumber: (policyNo),
            employerName: (empName),
            employerId: (empId)
        }
        console.log(userData);
        console.log('Api called');
        axios.post(userHospitalFormReg, userData)
            .then((response) => {
                console.log('data is coming');
                console.log(response.data);
                props.navigation.navigate('SemiPrivateRoom')
                if (response.data.status === "Registered sucessfully") {
                    alert("profile data submitted  successful")
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

    const schema = yup.object().shape({
        patientName: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Patient Name is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Name should be in this format"
            ),
        familyMemberName: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Family Member Name is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Name should be in this format"
            ),
        fatherName: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Father/Husband Name is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Name should be in this format"
            ),
        occupation: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Occupation is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Occupation should be in this format"
            ),
        doctorName: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Doctor Name is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Name should be in this format"
            ),
        EmployerName: yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Employer Name is required')
            .matches(
                "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$",
                "Name should be in this format"
            ),
        email: yup.string().email('Please enter valid email').required('Email id is required'),
        mobileno: yup.string()
            .min(10, ({ min }) => `Mobile No. must contain ${min} digit`).required('Mobile No. is required'),
        altContactno: yup.string()
            .min(10, ({ min }) => `Mobile No. must contain ${min} digit`).required('Alt. Mobile No. is required'),
        monthlyIncome: yup.string()
            .min(5, ({ min }) => `Monthly Income is required`).required('Monthly Income is required'),

        address: yup.string()
            .min(10, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Address is required'),
        policyNo: yup.string()
            .min(10, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Policy No. is required'),
        employerId: yup.string()
            .min(10, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Employer Id is required')
    });
    return (
        <SafeAreaView>
            <Formik
                initialValues={{ patientName: '', familyMemberName: '', fatherName: '', email: '', altContactno: '', mobileno: '', EmployerName: '', monthlyIncome: '', occupation: '', doctorName: '', address: '', policyNo: '', employerId: '', }}
                validateOnMount={true}
                onSubmit={values => console.log(values)}
                validationSchema={schema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, setFieldValue }) => (
                    < View style={styles.container}>
                             <View style={{ height: hp('7%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.header}>Hospital Form</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={{ fontSize: hp('2.5%'), fontWeight: "normal", marginLeft: wp('1.5%') }}>Patient Details</Text>
                            <KeyboardAvoidingView
                                behavior="height"
                                enabled
                                style={{ width: wp('100%'), height: hp('84%'), }}
                            >
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View style={{ height: hp('84%') }}>
                                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                                            <View style={styles.pname}>
                                                <View>
                                                    <TextInput style={styles.inputTxt1}
                                                        placeholder='Patient Name'
                                                        // value={patientName}
                                                        // onChangeText={text => setPatientName(text)}
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange('patientName')}
                                                        onBlur={handleBlur('patientName')}
                                                        value={values.patientName}
                                                    />
                                                    {errors.patientName &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.patientName}</Text>
                                                    }
                                                </View>
                                                <View>
                                                    <TextInput style={styles.inputTxt2}
                                                        placeholder='Add Family Member'
                                                        // value={addFamilyMember}
                                                        // onChangeText={text => setAddFamilyMember(text)}
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange('familyMemberName')}
                                                        onBlur={handleBlur('familyMemberName')}
                                                        value={values.familyMemberName}
                                                    />
                                                    {errors.familyMemberName &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.familyMemberName}</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.dob}>
                                                <View>
                                                    <DatePicker
                                                        style={styles.inputTxt3}
                                                        date={date} // Initial date from state
                                                        mode="date" // The enum of date,
                                                        placeholder="MM-DD-YYYY"
                                                        iconComponent={
                                                            <FontAwesome5 name='calendar-alt' color='#a9a9a9' size={hp('3%')} />
                                                        }
                                                        format="MM-DD-YYYY"
                                                        minDate="01-01-1900"
                                                        maxDate="01-19-2050"
                                                        // display='spinner'
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
                                                        // display='scroll'
                                                        onDateChange={(date) => {
                                                            setDate(date);
                                                        }}
                                                        androidMode={'spinner'}
                                                    />
                                                    {date == '' ?
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>Select your Date of Birth</Text>
                                                        : null}
                                                </View>
                                                <View>
                                                    <Picker
                                                        style={styles.inputTxt4}
                                                        selectedValue={selectedGender}
                                                        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
                                                    >
                                                        <Picker.Item label="Gender" value="Gender" style={{ fontSize: hp('1.8%') }} />
                                                        <Picker.Item label="Male" value="Male" style={{ fontSize: hp('1.8%'), }} />
                                                        <Picker.Item label="Female" value="Female" style={{ fontSize: hp('1.8%'), }} />
                                                        <Picker.Item label="Other" value="Other" style={{ fontSize: hp('1.8%'), }} />
                                                    </Picker>
                                                    {selectedGender == '' ?
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>Select Gender</Text>
                                                        : null}
                                                </View>
                                            </View>
                                            <View style={styles.fname}>
                                                <TextInput style={styles.inputTxt5}
                                                    placeholder='Father/Husband Name'
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange('fatherName')}
                                                    onBlur={handleBlur('fatherName')}
                                                    value={values.fatherName}
                                                />
                                                {errors.fatherName &&
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.fatherName}</Text>
                                                }
                                                <TextInput style={styles.inputTxt5}
                                                    placeholder='Address'
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange('address')}
                                                    onBlur={handleBlur('address')}
                                                    value={values.address}
                                                />
                                                {errors.address &&
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.address}</Text>
                                                }
                                            </View>
                                            <View style={styles.contact}>
                                                <View>
                                                    <TextInput style={styles.inputTxt6}
                                                        placeholder='Mobile No.'
                                                        keyboardType='numeric'
                                                        maxLength={10}
                                                        // value={mobileNumber}
                                                        // onChangeText={text => setMobileNumber(text)}
                                                        // keyboardType='number-pad'
                                                        value={values.mobileno}
                                                        onChangeText={handleChange('mobileno')}
                                                        onBlur={handleBlur('mobileno')}
                                                    />
                                                    {errors.mobileno &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.mobileno}</Text>
                                                    }
                                                </View>
                                                <View>
                                                    <TextInput style={styles.inputTxt7}
                                                        placeholder='Email'

                                                        // value={email}
                                                        // onChangeText={(email) => setEmail(email)}
                                                        keyboardType='email-address'
                                                        onChangeText={handleChange('email')}
                                                        onBlur={handleBlur('email')}
                                                        value={values.email}
                                                    />
                                                    {errors.email &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.email}</Text>
                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.india}>
                                                <View
                                                    style={{
                                                        borderRadius: hp('12%')
                                                    }}>
                                                    <Picker
                                                        style={styles.inputTxt8}
                                                        selectedValue={nationality}
                                                        onValueChange={(itemValue, itemIndex) => setNationality(itemValue)}
                                                    >
                                                        <Picker.Item label="Nationality" value="nationality" style={{ fontSize: hp('1.8%') }} />
                                                        <Picker.Item label="Indian" value="indian" style={{ fontSize: hp('1.8%') }} />
                                                        <Picker.Item label="Other" value="Other" style={{ fontSize: hp('1.8%') }} />
                                                    </Picker>
                                                    {nationality == '' ?
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>Select your Nationality</Text>
                                                        : null}
                                                </View>
                                                <View>
                                                    <Picker
                                                        style={styles.inputTxt9}
                                                        selectedValue={religion}
                                                        onValueChange={(itemValue, itemIndex) => setReligion(itemValue)}
                                                    >
                                                        <Picker.Item label="Religion" value="religion" style={{ fontSize: hp('1.8%') }} />
                                                        <Picker.Item label="Hindu" value="hindu" style={{ fontSize: hp('1.8%') }} />
                                                        <Picker.Item label="Other" value="Other" style={{ fontSize: hp('1.8%') }} />
                                                    </Picker>
                                                    {religion == '' ?
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>Select your Religion</Text>
                                                        : null}
                                                </View>
                                            </View>
                                            <View style={styles.income}>
                                                <View>
                                                    <TextInput style={styles.inputTxt10}
                                                        placeholder='Monthly Income'
                                                        // value={mincome}
                                                        // onChangeText={text => setMincome(text)}
                                                        value={values.monthlyIncome}
                                                        onChangeText={handleChange('monthlyIncome')}
                                                        onBlur={handleBlur('monthlyIncome')}
                                                    />
                                                    {errors.monthlyIncome &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.monthlyIncome}</Text>
                                                    }
                                                </View>
                                                <View>
                                                    <TextInput style={styles.inputTxt11}
                                                        placeholder='Occupation'
                                                        // value={occupation}
                                                        // onChangeText={text => setOccupation(text)}
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange('occupation')}
                                                        onBlur={handleBlur('occupation')}
                                                        value={values.occupation}
                                                    />
                                                    {errors.occupation &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.occupation}</Text>
                                                    }
                                                </View>

                                            </View>
                                            <View style={styles.alt}>
                                                <TextInput style={styles.inputTxt12}
                                                    placeholder='Alt. Contact No.'
                                                    keyboardType='numeric'
                                                    maxLength={10}
                                                    // value={altContactNo}
                                                    // onChangeText={text => setAltContactNo(text)}
                                                    value={values.altContactno}
                                                    onChangeText={handleChange('altContactno')}
                                                    onBlur={handleBlur('altContactno')}
                                                />
                                                {errors.altContactno &&
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.altContactno}</Text>
                                                }
                                                <TextInput style={styles.inputTxt12}
                                                    placeholder='Doctor Name'
                                                    // value={dName}
                                                    // onChangeText={text => setDName(text)}
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange('doctorName')}
                                                    onBlur={handleBlur('doctorName')}
                                                    value={values.doctorName}
                                                />
                                                {errors.doctorName &&
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.doctorName}</Text>
                                                }

                                            </View>
                                            <View style={styles.upload}>
                                                <View style={{ width: wp('47%'), height: hp('7%'), backgroundColor: '#d3d3d3', flexDirection: 'row', alignItems: 'center', marginTop: wp('2%'), borderRadius: hp('2%') }}>
                                                    <TextInput style={styles.inputTxt13}
                                                        placeholder='Upload Prescription'
                                                        value={uploadP}
                                                        onChangeText={text => setUploadP(text)}
                                                    />
                                                    <TouchableOpacity onPress={selectOneFile}>
                                                        <FontAwesome5 name='plus-circle' color='#2581d4' size={hp('3%')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ width: wp('42%'), height: hp('7%'), backgroundColor: '#d3d3d3', flexDirection: 'row', alignItems: 'center', marginTop: wp('2%'), borderRadius: hp('2%'), marginRight: wp('2.5%') }}>
                                                    <TextInput style={styles.inputTxt14}
                                                        placeholder='Upload ID Proof'
                                                        value={uploadId}
                                                        onChangeText={text => setUploadId(text)}
                                                    />
                                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                        <FontAwesome5 name='plus-circle' color='#2581d4' size={hp('3%')} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            <Text style={{ fontSize: hp('2.5%'), fontWeight: "normal", marginTop: wp('1%'), marginLeft: wp('2%') }}>Insurance Claim </Text>

                                            <View style={styles.policy}>
                                                <View style={{ width: wp('92%'), height: hp('7%'), backgroundColor: '#d3d3d3', flexDirection: 'row', borderRadius: hp('2%'), }}>
                                                    <TextInput style={styles.inputTxt20}
                                                        placeholder='Medical Insurance'
                                                        value={minsurance}
                                                        onChangeText={text => setMinsurance(text)}
                                                    />
                                                    <TouchableOpacity style={{ width: wp('12%'), height: hp('7%'), justifyContent: 'center', alignItems: 'flex-end', paddingRight: wp('1%') }} onPress={selectOneFile}>
                                                        <FontAwesome5 name='plus-circle' color='#2581d4' size={hp('3%')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <TextInput style={styles.inputTxt15}
                                                    placeholder='Policy No.'
                                                    autoCapitalize="none"
                                                    onChangeText={handleChange('policyNo')}
                                                    onBlur={handleBlur('policyNo')}
                                                    value={values.policyNo}
                                                />
                                                {errors.policyNo &&
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.policyNo}</Text>
                                                }

                                            </View>

                                            <View style={styles.employer}>
                                                <View>
                                                    <TextInput style={styles.inputTxt16}
                                                        placeholder='Employer Name'
                                                        // value={empName}
                                                        // onChangeText={text => setEmpName(text)}
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange('EmployerName')}
                                                        onBlur={handleBlur('EmployerName')}
                                                        value={values.EmployerName}
                                                    />
                                                    {errors.EmployerName &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.EmployerName}</Text>
                                                    }
                                                </View>
                                                <View>
                                                    <TextInput style={styles.inputTxt17}
                                                        placeholder='Employer ID'
                                                        // value={empId}
                                                        // onChangeText={text => setEmpId(text)}
                                                        autoCapitalize="none"
                                                        onChangeText={handleChange('employerId')}
                                                        onBlur={handleBlur('employerId')}
                                                        value={values.employerId}
                                                    />
                                                    {errors.employerId &&
                                                        <Text style={{ fontSize: hp('1.5%'), color: 'red', marginLeft: hp('1%') }}>{errors.employerId}</Text>
                                                    }
                                                </View>
                                            </View>
                                            <SafeAreaView style={styles.termsCondition}>

                                                <CheckBox
                                                    disabled={false}
                                                    value={toggleCheckBox}
                                                    tintColors={{ true: '#2581d4', false: '' }}
                                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}

                                                />

                                                <Text style={{ fontSize: hp('1.8%') }}>Read the </Text>
                                                <TouchableOpacity>
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'blue', textDecorationLine: 'underline', }}>Terms </Text>
                                                </TouchableOpacity>
                                                <Text> <Text>{'&'}</Text> </Text>
                                                <TouchableOpacity>
                                                    <Text style={{ fontSize: hp('1.5%'), color: 'blue', textDecorationLine: 'underline', }}> Conditions </Text>
                                                </TouchableOpacity>
                                            </SafeAreaView>

                                            <TouchableOpacity style={styles.btn}
                                                //  onPress={userProfileData}
                                                // onPress={()=>{validForm();userProfileData()}}
                                                // onPress = {() =>  props.navigation.navigate('SemiPrivateRoom')}
                                                 //onPress={()=>}
                                                onPress={() => {
                                                    if (!isValid) {
                                                        handleSubmit();
                                                        alert('Validiate your form')
                                                    }
                                                    else if (!toggleCheckBox) {
                                                        alert('Tick the checkbox')
                                                    }
                                                    else {
                                                        handleSubmit();
                                                        props.navigation.navigate('SemiPrivateRoom')
                                                        alert('Form submitted')
                                                    }
                                                }}
                                            >
                                                <Text style={{ color: 'white', fontSize: hp('2.5%') }}>Submit</Text>
                                            </TouchableOpacity>

                                        </ScrollView>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                        </View>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        ><View style={styles.centeredView}>

                                <View style={styles.modalView}>
                                    <TouchableOpacity style={{ width: wp('90%'), height: hp('7%'), alignSelf: 'center', alignItems: 'flex-end', justifyContent: 'center', paddingRight: wp('2%') }} onPress={() => setModalVisible(!modalVisible)}>
                                        <FontAwesome5 name='times' size={hp('2.5%')} color={Colors.black} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-start', width: wp('92%'), height: hp('7%'), paddingLeft: wp('2%'), alignItems: 'center', marginTop: hp('1%') }} onPress={() => captureImage('photo')}>
                                        <FontAwesome5 name='camera' color='blue' size={hp('3%')} />
                                        <Text style={{ marginLeft: wp('2%') }}>Camera</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-start', width: wp('92%'), height: hp('7%'), paddingLeft: wp('2%'), alignItems: 'center', marginTop: hp('1%') }} onPress={() => chooseFile('photo')}>
                                        <FontAwesome5 name='photo-video' color='blue' size={hp('3%')} />
                                        <Text style={{ marginLeft: wp('2%') }}>Photo and Video Library</Text>
                                    </TouchableOpacity>
                                    {/* <CustomButton
                                onPress={() => props.navigation.navigate('DrawerNavigator')}
                                title={'DONE'}
                                bgColor={Colors.blue}
                                width={wp('75%')}
                                height={hp('7%')}
                                color={Colors.white}
                                fontSize={hp('2.5%')}
                                alignSelf={'center'}
                                padding={hp('8%')}
                                borderRadius={hp('2%')}
                                marginTop={hp('3%')}
                            />
                            <TouchableOpacity style={{ marginTop: hp('1%') }}>
                                <Text style={{ alignSelf: 'center', color: Colors.blue, }}> <Text style={{ fontWeight: 'bold' }}></Text> Edit Your Appointment</Text>
                            </TouchableOpacity> */}
                                    {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                                </View>
                            </View>
                        </Modal>



                    </View>
                )}
            </Formik>
          
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        // padding: wp('2%'),
        // backgroundColor: 'cyan'
    },

    header: {
        alignItems: 'center',
        fontSize: hp('3.5%'),
        fontWeight: 'bold',
        color: '#000000',
    },

    inputContainer: {
        width: wp('100%'),
        height: hp('93%'),
        padding: hp('1%'),

        //  backgroundColor: 'yellow',

    },
    pname: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),
        // margin: 5,
        padding: wp('1%'),
    },
    inputTxt1: {
        width: wp('42%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        // marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt2: {
        width: wp('42%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    dob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),
        borderRadius: wp('2%'),
        padding: wp('1%'),
    },
    inputTxt3: {
        width: wp('39%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt4: {
        width: wp('39%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: hp('2%'),

        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('2%'),

    },
    fname: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt5: {
        width: wp('92%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },

    contact: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt6: {
        width: wp('35%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt7: {
        width: wp('50%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    india: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt8: {
        width: wp('50%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt9: {
        width: wp('35%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: hp('2%'),
        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),

    },

    income: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt10: {
        width: wp('50%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt11: {
        width: wp('35%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    alt: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt12: {
        width: wp('92%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    upload: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt13: {
        width: wp('40%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: hp('2%'),
        // marginTop: wp('3%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt14: {
        width: wp('34%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: hp('2%'),
        //marginTop: wp('3%'),
        marginRight: wp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    policy: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),

        padding: wp('1%'),
    },
    inputTxt15: {
        width: wp('92%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),

        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    employer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('97%'),
        // margin: 5,
        padding: wp('1%'),
    },
    inputTxt16: {
        width: wp('44%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        // marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt17: {
        width: wp('44%'),
        height: hp('7%'),
        backgroundColor: '#d3d3d3',
        borderRadius: wp('2%'),
        marginTop: wp('2%'),
        marginRight: wp('2.8%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('4%'),
    },
    inputTxt20: {
        width: wp('80%'),
        height: hp('7%'),
        //backgroundColor: 'pink',
        // borderTopLeftRadius: hp('2%'),
        // borderBottomLeftRadius: hp('2%'),
        borderRadius: wp('1%'),
        paddingLeft: wp('4%')
    },
    termsCondition: {
        width: wp('100%'),
        flexDirection: 'row',
        fontSize: hp('2.5%'),
        paddingLeft: wp('4%'),
        marginTop: wp('0.2%'),
        alignItems: 'center',
        //backgroundColor: 'green'

    },
    btn: {
        width: wp('90%'),

        backgroundColor: '#2581d4',
        borderRadius: wp('2.4%'),
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('6.5%'),
        // backgroundColor: 'green'
        alignSelf: 'center'
    },
    txt: {
        fontWeight: 'bold',
        fontSize: hp('2.7%')
    },
    centeredView: {
        width: wp('100%'),
        bottom: 0,
        position: 'absolute'


    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,


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
        fontSize: hp('2%'),
        fontWeight: "bold"
    },
    modalText2: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 20,

    }

});


export default HospitalForm;