import React from 'react';
import { StyleSheet, Text, View, Alert, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CodeButton from './Buttons/CodeButton';


const QrCodesCard = ({ url, title, onPressDowload, onPressShare, onPressTrash }) => {
  return (
    <View style={{ backgroundColor: 'gray', margin: 10, padding: 10, borderRadius: 20 }}>
      <Text style={{ color: 'black', margin: 10, fontWeight: '900', fontSize: 20 }}>{title}</Text>
      <View style={{ margin: 10 }}>
        <QRCode value={url}></QRCode>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <CodeButton onPress = {onPressDowload} name={'download'}></CodeButton>
        <CodeButton onPress = {onPressShare} name={'share-alternative'}></CodeButton>
        <CodeButton onPress = {onPressTrash} name={'trash'}></CodeButton>
      </View>
    </View>
  );
};

export default QrCodesCard;

const styles = StyleSheet.create({});
