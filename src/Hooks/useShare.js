import React, { useRef } from 'react';
import { Alert, Image, SafeAreaView, Button, Text } from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';

export default function ShareQr(title) {
  const ref = useRef(null);

  const shareImage = async () => {
    try {
      if (ref.current) {
        const uri = await captureRef(ref, {
          format: "png",
          quality: 0.7
        });

        // Şimdi uri'yi paylaşmak için kullanabilirsiniz.
        // Örnek olarak:
        Share.open({
          title: 'Share Image',
          url: uri,
          type: 'image/png',
        });
      } else {
        Alert.alert('Hata', 'Resim yakalama işlemi başarısız oldu.');
      }
    } catch (err) {
      //console.log(err);
    }
  };



  async function saveQrToDisk() {
    if (ref.current) {
      ref.current.capture().then(async (data) => {
        // Define the file path
        const filePath = RNFS.CachesDirectoryPath + `/${title}.png`;
        try {
          // Write the file
          await RNFS.writeFile(filePath, data, 'base64');
          // Save to the camera roll in the specified album
          await CameraRoll.save(filePath, {type, album: 'QrCodes' });
          Alert.alert('Kaydedildi');
        } catch (error) {
          console.error('Error saving to camera roll:', error);
        }
      });
    } else {
      Alert.alert('Uyarı', 'QR kodu oluşturun ve sonra kaydedin.');
    }
  }


  return { ref, shareImage, saveQrToDisk }
}
