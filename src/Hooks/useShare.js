import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { captureRef } from "react-native-view-shot";
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import Share from 'react-native-share';

export default function useShare() {
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
      if (err == "User did not share"){
        console.log("paylaşmadı")
      }
    }
  };



  async function saveImageToDisk() {
    try {
      if (ref.current) {
        const res = await ref.current.capture();

        await CameraRoll.save(res, {
          type:"photo",
          album:"QrCodes" 
        });
    
        console.log("Kaydedildi");
        Alert.alert("Tebrikler ","Kaydedildi")
      } else {
        Alert.alert("Hata","Kaydedilecek bir qr bulunamadı")
      }
    } catch (err) {
       console.log(err);
    }
  }

  return { ref, shareImage, saveImageToDisk }
}
