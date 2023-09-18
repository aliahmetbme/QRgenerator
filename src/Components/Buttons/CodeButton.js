import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/Entypo"
const CodeButton = ({onPress, name}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={name} size={35} color="black"/>
    </TouchableOpacity>
  )
}

export default CodeButton

const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
        padding:10,
        paddingHorizontal:20,
        backgroundColor:"#DADADA",
        margin:10,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        color:"black",
        fontSize:18,
    }
})