import React, { useRef } from 'react';
import { Alert, Image, SafeAreaView, Button, Text } from 'react-native';
import ViewShot, { captureRef } from "react-native-view-shot";
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import { err } from 'react-native-svg/lib/typescript/xml';

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



  async function saveImageToDisk() {
    try {
      if (ref.current) {
        const res = await ref.current.capture();
        //  await  captureRef (ref, {
        //   fileName: `${title}`,
        //   quality:1,
        //   format:"png",
        // })
        await CameraRoll.save(res, {
          type:"photo",
          album:"QrCodes" 
        });
    
        console.log("Kaydedildi");
      }
    } catch (err) {ß
      console.log(err);
    }
  }


  return { ref, shareImage, saveImageToDisk }
}
