import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Entypo"
import CodeButton from '../Components/Buttons/CodeButton'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const ProfilePage = ({ navigation }) => {
    const [name] = useState(auth().currentUser.displayName)
    const [displayName, setDisplayName] = useState('');

    const user = auth().currentUser;

    const handleUpdateDisplayName = async () => {
        try {
            await user.updateProfile({
                displayName: displayName,
            });
            // Kullanıcı adı başarıyla güncellendi
            console.log('Kullanıcı adı güncellendi:', user.displayName);
            setDisplayName("")
        } catch (error) {
            console.error('Kullanıcı adı güncelleme hatası:', error);
        }
    };

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
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("CodesPage")} style={styles.button}>
                <Text style={{ color: "black", fontWeight: "800" }}>My Codes </Text>
                <Icon name={"arrow-long-right"} size={50} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdateDisplayName} style={styles.button}>
                <Text style={{ color: "black", fontWeight: "800" }}>Set My name </Text>
                <Icon name={"arrow-long-right"} size={50} color="black" />
                <TextInput
                    placeholder="Yeni Kullanıcı Adı"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
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
        marginTop: 20,
        borderRadius: 20,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between"
    }
})