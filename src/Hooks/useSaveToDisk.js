import React, { useRef } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

export default function SaveImageScreen(url, title) {
  const ref = useRef(null);

  const saveImage = async () => {
    try {
      if (ref.current) {
        ref.current.toDataURL(async (data) => {
  
          // define the file path
          const filePath = RNFS.CachesDirectoryPath + `/${title}.png`;
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
       
    } catch (error) {
      console.error('Resim kaydetme hatası:', error);
    }
  };

  return { ref, saveImage };
}
