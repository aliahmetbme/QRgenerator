import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginButton = ({onPress,title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default LoginButton

const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:10,
        paddingHorizontal:20,
        borderRadius:20,
        backgroundColor:"#DADADA",
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"black",
        fontWeight:"800",
        fontSize:20
    }
})