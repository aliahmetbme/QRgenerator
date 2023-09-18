import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Entypo"
import CodeButton from '../Components/Buttons/CodeButton'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const ProfilePage = ({ navigation }) => {

    const logOut = async () => {
        try {
            await auth().signOut()
            await GoogleSignin.signOut();
            console.log("çıkıldı")
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", margin: 10, justifyContent: "space-between" }}>
                <CodeButton name={"shop"} onPress={() => navigation.navigate("QrGeneratePage")} />
                <CodeButton name={"log-out"} onPress={logOut} />
            </View>
            <View style={{ margin: 10, marginVertical: 40, alignSelf: "center", }}>
                <Icon name={"user"} size={100} color="black" />
            </View>
            <Text style={styles.name}>ALİ AHMET ERDOĞDU</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CodesPage")} style={styles.button}>
                <Text style={{ color: "black", fontWeight: "800" }}>My Codes </Text>
                <Icon name={"arrow-long-right"} size={50} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfilePage

const styles = StyleSheet.create({
    name: {
        color: "black",
        alignSelf: "center",
        fontSize: 25,
        fontWeight: "800"
    },
    button: {
        backgroundColor: "#DADADA",
        alignItems: "flex-start",
        padding: 10,
        paddingHorizontal: 20,
        margin: 20,
        marginVertical: 50,
        borderRadius: 20,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
    }
})