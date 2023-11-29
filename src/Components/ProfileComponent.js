import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Icon from "react-native-vector-icons/Entypo"
import auth from '@react-native-firebase/auth'
const ProfileComponent = ({onPress}) => {
    const [name] = useState(auth().currentUser.displayName)

    return (
        <SafeAreaView style={{justifyContent:"space-between",flexDirection:"row",margin:10}}>
            <View style={{flex:0.8}}>
                <Text style={{fontSize:30,fontWeight:"bold",color:"black"}}>Welcome {name}</Text>
                <Text style={{fontSize:18,color:"black"}}>Let's create your Qr codes</Text>
            </View>
            <TouchableOpacity style={{flex:0.2}} onPress={onPress}>
                <Icon name={"user"} size={60} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileComponent

const styles = StyleSheet.create({})