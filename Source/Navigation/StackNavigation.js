import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../Screens/Login';
import SelectNumber from '../Screens/SelectNumber';
import Otp from '../Screens/Otp';
import Splash from '../Screens/Splash';
// import BTabNavigation from '../Navigation/materialBottomTab';
import MyTabs from '../Navigation/mMbottomTab';
import BookingSlot from '../Screens/BookingSlot'
import SetData from '../Screens/SetData';
import contact from '../Screens/HospitalBeds/Favourites'
import DrawerNavigator from './DrawerNavigator';
// import Promotion from '../ReusableComponent/Promotion';
import BedReact from '../ReusableComponent/BedReact';
import Location from '../Screens/Location';
import HospitalDetailScreen from '../Screens/HospitalDetailScreen';
import SemiPrivateRoom from '../Screens/HospitalBeds/SemiPrivateRooms';
import GeneralBeds from '../Screens/HospitalBeds/GeneralBeds';
import BookBed from '../Screens/BookBed';
import HospitalForm from '../Screens/HospitalBeds/HospitalForm';
import BookingHistory from '../Screens/BookingHistory'
import Consultation from '../Screens/Consultation';
import LabTest from '../Screens/LabTest';
import Medicines from '../Screens/Medicines';
import Home from '../Screens/Home';
import Files from '../Screens/Files';
import Profile from '../Screens/Profile';
import AddFamilyMember from '../Screens/Drawer/AddFamilyMember';
import ConsultDoctors from '../Screens/Drawer/ConsultDoctor';
import Invoices from '../Screens/Drawer/Invoices';
import HelporSupport from '../Screens/Drawer/HelporSupport'
import AbouteHospi from '../Screens/Drawer/AbouteHospi';
import TermsAndCondtions from '../Screens/Drawer/TermsAndCondition';
import PrivacyPolicy from '../Screens/Drawer/PrivacyPolicy';
import PaymentAndHealthCash from '../Screens/Drawer/PaymentAndHealthCash';
import Settings from '../Screens/Drawer/Settings';
import About from '../Screens/About';
import Department from '../Screens/Department';
import EditProfile from '../Screens/EditProfile';
import BookingHistoryTwo from '../Screens/BookingHistoryTwo';

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
  // headerStyle: {
  //   backgroundColor: "#9AC4F8",
  // },
  // headerTintColor: "white",
  // headerBackTitle: "Back",
};
const MainStackNavigator = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SelectNumber" component={SelectNumber} options={{ headerShown: false }} />
      <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen name="BookingHistory" component={BookingHistory} options={{ headerShown: false }} />
      <Stack.Screen name="Files" component={Files} />
      <Stack.Screen name="BookBed" component={BookBed} options={{ headerShown: false }} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="BookingSlot" component={BookingSlot} options={{ headerShown: false }} />
      <Stack.Screen name="SetData" component={SetData} options={{ headerShown: false }} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BedReact" component={BedReact} options={{ headerShown: false }} />
      <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
      <Stack.Screen name="HospitalDetailScreen" component={HospitalDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SemiPrivateRoom" component={SemiPrivateRoom} options={{ headerShown: false }} />
      <Stack.Screen name="GeneralBeds" component={GeneralBeds} options={{ headerShown: false }} />
      <Stack.Screen name="HospitalForm" component={HospitalForm} options={{ headerShown: false }} />
      <Stack.Screen name="Consultation" component={Consultation} />
      <Stack.Screen name="LabTest" component={LabTest} />
      <Stack.Screen name="Medicines" component={Medicines} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="AddFamilyMember" component={AddFamilyMember} />
      <Stack.Screen name="ConsultDoctors" component={ConsultDoctors} />
      <Stack.Screen name="Invoices" component={Invoices} />
      <Stack.Screen name="HelporSupport" component={HelporSupport} />
      <Stack.Screen name="AbouteHospi" component={AbouteHospi} />
      <Stack.Screen name="TermsAndCondtions" component={TermsAndCondtions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="PaymentAndHealthCash" component={PaymentAndHealthCash} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
      <Stack.Screen name="Department" component={Department} options={{ headerShown: false }}/>
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
      <Stack.Screen name="BookingHistoryTwo" component={BookingHistoryTwo} options={{ headerShown: false }}/>
    </Stack.Navigator>

  );
}
const ContactStackNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Contact" component={contact} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />  */}
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };