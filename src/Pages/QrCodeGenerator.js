import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import ViewShot from 'react-native-view-shot'

import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import useShare from "../Hooks/useShare"

import CodeButton from '../Components/Buttons/CodeButton'
import Input from '../Components/Input'
import NoContent from '../Components/NoContent'
import ProfileComponent from '../Components/ProfileComponent'


const QrCodeGenerator = ({ navigation }) => {

  const [Qrlink, setQrlink] = useState("")
  const [tempCode, setTempCode] = useState("")
  const [QrName, setQrName] = useState("")

  const {ref, saveImageToDisk} = useShare() 

  // Create Qr code
  function generateQRcode() {
    { tempCode ? setQrlink(tempCode) : Alert.alert("Uyarı", "Boş değer girilemez") }
  }

  // Save Qr to your Database
  async function saveQrToDatabase() {
    if (!Qrlink) {
      Alert.alert("Önce Qr qoce oluşturmalısınız")
      return
    }
    if (!QrName) {
      Alert.alert("Uyarı", "Qr kodunuza bir isim vermelisiniz.");
      return;
    }

    const qrcodeInfo = { name: QrName, url: Qrlink };
    try {
      const databaseRef = database().ref(`/${auth().currentUser.uid}`);
      await databaseRef.push(qrcodeInfo);
      Alert.alert("Uyarı", "Qr kodu veritabanına kaydedildi.");
    } catch (error) {
      console.error('Veritabanına kaydedilirken hata oluştu:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileComponent onPress={() => navigation.navigate("ProfilePage")}></ProfileComponent>
      {Qrlink ?
        <ViewShot ref={ref} style={{ alignItems:"center",justifyContent: "center", margin: 10, marginHorizontal:5 }}>
          <QRCode
            size={300}
            value={Qrlink}></QRCode>
            <Text style={{
              color:"black",
              padding:30,
              fontWeight:"bold",
              fontSize:20
            }}>{QrName}</Text>
        </ViewShot> : <NoContent></NoContent>}
      <Input placeholder={"Please Provide url source"} value={tempCode} onChangeText={setTempCode} />
      
      <Input placeholder={"Please give name your code"} value={QrName} onChangeText={setQrName} />

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent:"space-between" }}>
        <CodeButton name={"plus"} onPress={generateQRcode} />
        <CodeButton name={"download"} onPress={saveImageToDisk} />
        <CodeButton name={"upload-to-cloud"} onPress={saveQrToDatabase} />
        <CodeButton name={"cycle"} onPress={() => {
          setQrlink("")
          setTempCode("")
          setQrName("")
        }} />
      </View>

    </SafeAreaView>
  )
}

export default QrCodeGenerator

const styles = StyleSheet.create({})
