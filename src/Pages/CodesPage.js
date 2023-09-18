import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import QrCodesCard from '../Components/QrCodesCard'

import database from "@react-native-firebase/database"
import auth from "@react-native-firebase/auth"

const CodesPage = () => {
  const [qrcodesData, setQrCodeData] = useState([])

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