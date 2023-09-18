import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import QrCodesCard from '../Components/QrCodesCard'

import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"
import QRCode from 'react-native-qrcode-svg'

const CodesPage = () => {
  const [qrcodesData, setQrCodeData] = useState([])
  const [URL, setUrl] = useState("")

  const qrCodeRef = useRef(null)
  const qrCode = (<QRCode
    value={URL}
    getRef={qrCodeRef} />)



  useEffect((() => {
    database().ref(`/${auth().currentUser.uid}`).on("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        const dataArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        setQrCodeData(dataArray);
      } else {
        setQrCodeData([]);
      } 
    })
  }), [])

  // it deletes data from database
  function deleteDataFromDB(itemKey) {
    database().ref(`/${auth().currentUser.uid}/${itemKey}`).remove();
  }

  function renderData({ item }) {
    console.log(item, "item")
    console.log(item.url)
    return (
      <QrCodesCard onPressTrash={() => deleteDataFromDB(item.key)} url={item.url} title={item.name}></QrCodesCard>
    )
  }

  return (
    <SafeAreaView>
      <FlatList
        data={qrcodesData}
        renderItem={renderData}></FlatList>
    </SafeAreaView>
  )
}

export default CodesPage

const styles = StyleSheet.create({})