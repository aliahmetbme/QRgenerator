import React, { useRef } from 'react';
import { Alert, Image, SafeAreaView, Button, Text } from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';

const source = "https://bczl.meb.k12.tr/meb_iys_dosyalar/34/06/969693/resimler/2021_04/02102222_2118fbf0-51e6-477f-b6f7-175761b15217.jpg";

export default function ShareQr(url, title) {
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
      console.log(err);
    }
    };

    return {ref, shareImage}
}
