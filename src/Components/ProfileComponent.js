import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Entypo"
const ProfileComponent = ({onPress}) => {
    return (
        <SafeAreaView style={{justifyContent:"space-between",flexDirection:"row",margin:10}}>
            <View>
                <Text style={{fontSize:25,fontWeight:"bold",color:"black"}}>Welcome Ali Ahmet</Text>
                <Text style={{fontSize:15,color:"black"}}>Let's create your Qr codes</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Icon name={"user"} size={50} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileComponent

const styles = StyleSheet.create({})