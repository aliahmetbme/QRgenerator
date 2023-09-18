import { StyleSheet, View, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import Input from '../Components/Input'
import { Formik } from "formik"
import LoginButton from '../Components/Buttons/LoginButton'
import RegisterMe from '../Components/Buttons/RegisterMe'
import GoogleSignInButton from "../Components/Buttons/GoogleSingInButton"
import RegisterPageInButton from '../Components/Buttons/RegisterPageInButton'
import LottieView from 'lottie-react-native'
import auth from "@react-native-firebase/auth"


const Login = ({navigation}) => {
    const initialValues = {
        email: "",
        password: ""
    }
    function login(values) {
        if (!values.email || !values.password) {
            Alert.alert("Hata","Boş bırakılamaz")
            return
        }

        auth().signInWithEmailAndPassword(values.email, values.password)
        .then(() => {
            console.log("User account signed ing ")

        }).catch(error => {

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
        });

    }

    function goSingUp() {
        navigation.navigate("RegistrationPage")
    } 

    return (
        <SafeAreaView style={{flex:1}}>
            <LottieView source={require("../Assets/wmlhxOJBSY.json")} useNativeLooping autoPlay loop style={{flex:1,margin:20,marginVertical:30}}></LottieView>
            <Formik
                initialValues={initialValues}
                onSubmit={values => login(values)}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View>
                        <Input value={values.email} onChangeText={handleChange("email")} placeholder={"Please Provide your email"}></Input>
                        <Input value={values.password} onChangeText={handleChange("password")} password={true} placeholder={"Please Provide your password"}></Input>
                        <LoginButton title={"Login"} onPress={handleSubmit} />
                    </View>
                )}
            </Formik>
            <RegisterMe />
            <GoogleSignInButton />
            <RegisterPageInButton onPress={goSingUp} />
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})