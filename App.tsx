import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SplashScreen from 'react-native-splash-screen';
import SignupScreen from "./src/screens/SignupScreen"
import LoginScreen from './src/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [initialRouteName, setInitialRouteName] = useState()
  useEffect(() => {
    const init = async () => {
      const userDetails = await AsyncStorage.getItem("Login")
      if (userDetails) { setInitialRouteName(true) }
      else {
        await AsyncStorage.setItem("Login", JSON.stringify(true))
      }

    }
    init();
  }, [])

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName ? "Tab" : "LogIn"}>
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
