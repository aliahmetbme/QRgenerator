import React from 'react';
import { StyleSheet, Text, View, Alert, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CodeButton from './Buttons/CodeButton';
import ViewShot from 'react-native-view-shot';
import useShare from "../Hooks/useShare"

const QrCodesCard = ({ url, title, onPressDowload, onPressShare, onPressTrash }) => {

   const { ref, shareImage ,saveImageToDisk} = useShare(url, title)

  return (
    <View style={{ backgroundColor: 'gray', margin: 10, padding: 10, borderRadius: 20, flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap" }}>
      <View style={{flexWrap:"wrap", flex:0.7}}>
      <ViewShot
        ref={ref}
        options={
          {
            fileName: `${title}`,
            quality:1,
            format:"png",
          }
        }
        >
        <Text style={{ color: 'black', margin: 10, fontWeight: '900', fontSize: 20 }}>{title}</Text>
        <View style={{ margin: 10 }}>
          <QRCode size={200} value={url}></QRCode>
        </View>
      </ViewShot>
      </View>
      <View style={{flex:0.3, justifyContent:"space-evenly", flexWrap:"wrap"}}>
        <CodeButton onPress={saveImageToDisk} name={'download'}></CodeButton>
        <CodeButton onPress={shareImage} name={'share-alternative'}></CodeButton>
        <CodeButton onPress={onPressTrash} name={'trash'}></CodeButton>
      </View>
    </View>
  );
};

export default QrCodesCard;

const styles = StyleSheet.create({});
