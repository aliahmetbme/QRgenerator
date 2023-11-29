import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RegisterMe = () => {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} />
    <Text>Remember Me !</Text>
    </View>
  )
}

export default RegisterMe

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center"
    },

    button:{
        width:30,
        height:30,
        margin:10,
        backgroundColor:"#DADADA",
        alignSelf:"flex-start",
        padding:10,
        borderRadius: 60,
        alignItems:"center",
        justifyContent:"center"
    }
})