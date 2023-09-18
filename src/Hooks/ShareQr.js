// import { Alert, Share } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import RNFS from 'react-native-fs';
// import React from 'react';

// export async function ShareQr(title, url) {
//   const qrCodeRef = React.createRef();

//   try {
//     // QR kodunu oluştur
//     const qrCode = <QRCode getRef={(ref) => (qrCodeRef.current = ref)} value={url} size={200} />;

//     // QR kodunu bir SVG stringine dönüştür
//     const svgString = qrCode.toDataURL();

//     // Görüntüyü yerel bir dosyaya kaydet
//     const path = `${RNFS.DocumentDirectoryPath}/qrcode.png`;
//     await RNFS.writeFile(path, svgString, 'base64');

//     // QR kodunu paylaşma işlemi
//     const result = await Share.share({
//       message: 'QR kodu paylaşıyorum!',
//       url: `file://${path}`, // Görüntü dosyasının yerel yolunu kullan
//     });

//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // Belirli bir paylaşım türü ile paylaşıldı
//         console.log(`Paylaşım türü: ${result.activityType}`);
//       } else {
//         // Paylaşıldı
//         console.log('Paylaşıldı');
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // Kapatıldı
//       console.log('Paylaşım iptal edildi');
//     }
//   } catch (error) {
//     Alert.alert('Hata', error.message);
//   }
// }
import React from 'react';
import { Alert, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';

export default async function ShareQr(title, url) {
  try {
    let viewShotRef = React.createRef();

    // QR kodunu oluştur
    const qrCode = <QRCode value={url} size={200} />;

    // Görüntüyü kaydedin ve paylaşma işlemi
    const onCapture = async (uri) => {
      try {
        // Görüntüyü yerel bir dosyaya kaydedin
        const path = `${RNFS.DocumentDirectoryPath}/qrcode.png`;
        await RNFS.copyFile(uri, path);

        // QR kodunu paylaşma işlemi
        const result = await Share.share({
          message: 'QR kodu paylaşıyorum!',
          url: `file://${path}`, // Görüntü dosyasının yerel yolunu kullan
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
        Alert.alert('Hata', error.message);
      }
    };

    return (
      <ViewShot
        ref={viewShotRef}
        onCapture={(uri) => onCapture(uri)}
        options={{ format: 'png', quality: 1 }}
      >
        {qrCode}
      </ViewShot>
    );
  } catch (error) {
    Alert.alert('Hata', error.message);
  }
}
