import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RegisterPageInButton = ({onPress}) => {
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", margin: 10, alignSelf: "center" }}>
            <Text style={styles.explanation}>If you have not any account? </Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.signUp}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default RegisterPageInButton

const styles = StyleSheet.create({
    explanation:{
        color:"black",
        fontSize:15
    },
    signUp:{
        color:"black",
        fontSize:18,
        fontWeight:"bold"
    }
})