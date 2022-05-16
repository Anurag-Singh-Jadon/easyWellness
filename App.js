

import React from 'react';
//import Splash from './Source/Screens/Splash';
//import Login from './Source/Screens/Login';
//import SelectNumber from './Source/Screens/SelectNumber';
//import Otp from './Source/Screens/Otp';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './Source/Navigation/DrawerNavigator'
import { MainStackNavigator, ContactStackNavigator } from "./Source/Navigation/StackNavigation";
import { TopContainer } from "./Source/Screens/HospitalDetailScreen"
//import About2 from './Source/Screens/About2';





const App = () => {


  return (
    <NavigationContainer>
      <MainStackNavigator />

    </NavigationContainer>


  );
};



export default App;
