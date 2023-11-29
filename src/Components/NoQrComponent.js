import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const NoContent = () => {
  return (
    <SafeAreaView style={{flex:0.8}}>
      <LottieView source={require("../Assets/a0BGVPYXlx.json")} autoPlay loop style={{flex:1}}></LottieView>
    </SafeAreaView>
  )
}

export default NoContent

const styles = StyleSheet.create({})