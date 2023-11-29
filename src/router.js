import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import auth from "@react-native-firebase/auth"

import QrCodeGenerator from "./Pages/QrCodeGenerator"
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import ProfilePage from './Pages/ProfilePage';
import CodesPage from './Components/Codes';

const Stack = createNativeStackNavigator()

export default function App() {
    const [userSession, setUserSession] = useState(null)

    // it listens are there any user in program 
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            setUserSession(user);
        });

        return unsubscribe;
    }, []);

    if (!userSession) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='LoginPage' component={Login}></Stack.Screen>
                    <Stack.Screen name='RegistrationPage' component={Registration}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='QrGeneratePage' component={QrCodeGenerator}></Stack.Screen>
                    <Stack.Screen name='ProfilePage' component={ProfilePage}></Stack.Screen>
                    <Stack.Screen name='CodesPage' component={CodesPage} options={{ headerShown: true, headerTitle: "My QrCodes", headerBackTitle: " ", headerBackTitleVisible: false }}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}