import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import RNFS from "react-native-fs"
import { CameraRoll } from '@react-native-camera-roll/camera-roll'

import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"

import CodeButton from '../Components/Buttons/CodeButton'
import Input from '../Components/Input'
import NoContent from '../Components/NoContent'
import ProfileComponent from '../Components/ProfileComponent'

const QrCodeGenerator = ({navigation}) => {

  const [Qrlink, setQrlink] = useState("")
  const [tempCode, setTempCode] = useState("")
  const [QrName, setQrName] = useState("")
  const qrCodeRef = useRef(null)

  // creating Qr code
  function generateQRcode() {
    { tempCode ? setQrlink(tempCode) : Alert.alert("Uyarı", "Boş değer girilemez") }
    setTempCode("")
  }

  // saving the Qr to gallery
  async function saveQrToDisk() {

    if (!QrName) {
      alert("you must give name your Qr")
      return
    }

    if (qrCodeRef.current) {
      qrCodeRef.current.toDataURL(async (data) => {

        // define the file path
        const filePath = RNFS.CachesDirectoryPath + `/${QrName}.png`;
        try {
          // write the file
          await RNFS.writeFile(filePath, data, 'base64')
            .then((success) => {
              console.log('FILE WRITTEN!');
              // galeride istediğin bir albüme kaydet
              CameraRoll.save(filePath, { album: "QrCodes" });
              Alert.alert("kaydedildi")
            })
            .catch((err) => {
              console.log(err.message);
            });

        } catch (error) {
          console.error('Error saving to camera roll:', error);
        }

      });
    } else {
      Alert.alert("Uyarı", "QR kodu oluşturun ve sonra kaydedin.")
    }

    setQrName("")
    setQrlink("")
  }

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
      Alert.alert("Uyarı","Qr kodu veritabanına kaydedildi.");
    } catch (error) {
      console.error('Veritabanına kaydedilirken hata oluştu:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileComponent onPress={() => navigation.navigate("ProfilePage")}></ProfileComponent>
      {Qrlink ?
        <View style={{ alignSelf: "center", margin: 20 }}>
          <QRCode
            onLoad={saveQrToDisk}
            getRef={qrCodeRef}
            size={200}
            value={Qrlink}></QRCode>
        </View> : <NoContent></NoContent>}
      <Input placeholder={"Please Provide url source"} value={tempCode} onChangeText={setTempCode} />
      <Input placeholder={"Please give name your code"} value={QrName} onChangeText={setQrName} />
      <View style={{flexDirection:"row",flexWrap:"wrap", justifyContent:"space-between"}}>
        <CodeButton name={"plus"} onPress={generateQRcode} />
        <CodeButton name={"download"} onPress={saveQrToDisk} />
        <CodeButton name={"upload-to-cloud"} onPress={saveQrToDatabase} />
      </View>

    </SafeAreaView>
  )
}

export default QrCodeGenerator

const styles = StyleSheet.create({})
