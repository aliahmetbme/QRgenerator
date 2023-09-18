// import React, { useRef } from 'react';
// import { Alert, Share, View, Text, Button } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import ViewShot from 'react-native-view-shot';
// import CodeButton from '../Components/Buttons/CodeButton';
// const ShareQRCode = ({ title, url }) => {
//     const viewShotRef = useRef();

//     const handleShareQRCode = async () => {
//         try {
//             // Ekran görüntüsü al
//             const uri = await captureQRCode();

//             // QR kodunu paylaşma işlemi
//             const result = await Share.share({
//                 message: 'QR kodu paylaşıyorum!',
//                 url: uri, // Ekran görüntüsünün yerel yolunu kullan
//             });

//             if (result.action === Share.sharedAction) {
//                 if (result.activityType) {
//                     // Belirli bir paylaşım türü ile paylaşıldı
//                     console.log(`Paylaşım türü: ${result.activityType}`);
//                 } else {
//                     // Paylaşıldı
//                     console.log('Paylaşıldı');
//                 }
//             } else if (result.action === Share.dismissedAction) {
//                 // Kapatıldı
//                 console.log('Paylaşım iptal edildi');
//             }
//         } catch (error) {
//             Alert.alert('Hata', error.message);
//         }
//     };

//     const captureQRCode = async () => {
//         return new Promise(async (resolve) => {
//             try {
//                 // Ekran görüntüsü al
//                 viewShotRef.current.capture().then(uri => {
//                     // Görüntüyü yerel bir dosyaya kaydet
//                     const path = uri.replace('file://', '');
//                     resolve(path);
//                 });
//             } catch (error) {
//                 console.log(error);
//                 Alert.alert('Hata', error.message);
//             }
//         });
//     };

//     return (
//         <View>
//             <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }} style={{justifyContent:"center"}}>
//                 <CodeButton name={'share-alternative'} onPress={handleShareQRCode}></CodeButton>
//             </ViewShot>
//         </View>
//     );
// };

// export default ShareQRCode;

import React, { useRef } from 'react';
import { Alert, Share, View, Text, Button, Image, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import CodeButton from '../Components/Buttons/CodeButton';

const ShareQRCode = ({ title, url }) => {
  const viewShotRef = useRef();

  const handleShareQRCode = async () => {
    try {
      // Ekran görüntüsü al
      const uri = await captureQRCode();

      // QR kodunu ve başlığı birleştirip bir resim oluştur
      const combinedImageUri = await combineQRCodeAndTitle(title);

      // QR kodunu ve başlığı içeren resmi paylaşma işlemi
      const result = await Share.share({
        message: 'QR kodu paylaşıyorum!',
        url: combinedImageUri, // Resmin yerel yolunu kullan
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Belirli bir paylaşım türü ile paylaşıldı
          console.log(`Paylaşım türü: ${result.activityType}`);
        } else {
          // Paylaşıldı
          console.log('Paylaşıldı');
        }
      } else if (result.action === Share.dismissedAction) {
        // Kapatıldı
        console.log('Paylaşım iptal edildi');
      }
    } catch (error) {
        console.log(error)
      Alert.alert('Hata', error.message);
    }
  };

  const captureQRCode = async () => {
    return new Promise(async (resolve) => {
      try {
        // Ekran görüntüsü al
        viewShotRef.current.capture().then(uri => {
          // Görüntüyü yerel bir dosyaya kaydet
          const path = uri.replace('file://', '');
          resolve(path);
        });
      } catch (error) {
        console.log(error);
        Alert.alert('Hata', error.message);
      }
    });
  };

  const combineQRCodeAndTitle = async (title) => {
    // QR kodunun ve başlığın birleştirilmiş olduğu bir resim oluşturun
    const qrCodeImage = await viewShotRef.current.capture();
    const titleImage = await createTitleImage(title);

    // QR kodu ve başlığı içeren resmi birleştirin
    const combinedImage = await combineImages(qrCodeImage, titleImage);

    // Birleştirilmiş resmi kaydet ve yolunu döndür
    const path = `${RNFS.DocumentDirectoryPath}/combined.png`;
    await RNFS.writeFile(path, combinedImage, 'base64');
    return `file://${path}`;
  };

  const createTitleImage = async (title) => {
    // Başlığı içeren bir resim oluşturun
    // Örneğin, bir View içinde Text kullanarak bir başlık oluşturabilirsiniz

    const titleView = (
      <View>
        <Text>{title}</Text>
      </View>
    );

    // Başlığı içeren View'i bir görüntüye dönüştürün ve base64 formatında alın
    const titleImageUri = await captureViewAsBase64(titleView);

    return titleImageUri;
  };

  const combineImages = async (qrCodeBase64, title) => {
    try {
      // QR kodunu görüntü olarak oluşturun
      const qrCodeImage = await Image.create(qrCodeBase64, { width: 200, height: 200 });
  
      // Başlık ile QR kodu birleştirin
      const combinedImage = await Image.create([
        { uri: qrCodeImage.uri, width: 200, height: 200 },
        { uri: title.uri, width: 200, height: 50 }, // Başlık yüksekliği ayarlayın
      ]);
  
      // Birleştirilmiş resmi base64 formatında alın
      const combinedImageBase64 = await combinedImage.toDataURL('image/png');
  
      return combinedImageBase64;
    } catch (error) {
      console.error('Resim birleştirme hatası:', error);
      return null;
    }
  };

  const captureViewAsBase64 = async (view) => {
    return new Promise((resolve, reject) => {
        try {
          // Verilen view'i bir görüntüye dönüştür
          ViewShot.captureRef(view, {
            format: 'png', // Görüntü formatı
            quality: 1, // Kalite (0 ile 1 arasında)
          }).then((uri) => {
            resolve(uri);
          });
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
  };

  return (
    <View>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <CodeButton name={'share-alternative'} onPress={handleShareQRCode}></CodeButton>
      </ViewShot>
    </View>
  );
};

export default ShareQRCode;

const styles = StyleSheet.create({
  titleContainer: {
    // Başlık için özelleştirmeleri burada yapabilirsiniz
  },
});
