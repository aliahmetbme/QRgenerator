import React, { useRef } from 'react';
import { Alert, Share, View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import CodeButton from '../Components/Buttons/CodeButton';

const ShareQRCode = ({ title }) => {
  const viewShotRef = useRef();

  const handleShareQRCode = async () => {
    try {
      const uri = await captureQRCode();
      const combinedImageUri = await combineQRCodeAndTitle(title);

      const result = await Share.share({
        message: 'QR kodu paylaşıyorum!',
        url: combinedImageUri,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Paylaşım türü: ${result.activityType}`);
        } else {
          console.log('Paylaşıldı');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Paylaşım iptal edildi');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', error.message);
    }
  };

  const captureQRCode = async () => {
    return new Promise(async (resolve) => {
      try {
        viewShotRef.current.capture().then(uri => {
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
    const qrCodeImage = await viewShotRef.current.capture();
    const titleImage = await createTitleImage(title);

    const combinedImage = await combineImages(qrCodeImage, titleImage);

    const path = `${RNFS.DocumentDirectoryPath}/combined.png`;
    await RNFS.writeFile(path, combinedImage, 'base64');
    return `file://${path}`;
  };

  const createTitleImage = async (title) => {
    const titleView = (
      <View>
        <Text style={styles.titleContainer}>{title}</Text>
      </View>
    );

    const titleImageUri = await captureViewAsBase64(titleView);
    return titleImageUri;
  };

  const combineImages = async (qrCodeBase64, title) => {
    try {
      const qrCodeImage = await Image.create(qrCodeBase64, { width: 200, height: 200 });
  
      const combinedImage = await Image.create([
        { uri: qrCodeImage.uri, width: 200, height: 200 },
        { uri: title.uri, width: 200, height: 50 },
      ]);
  
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
        ViewShot.captureRef(view, {
          format: 'png',
          quality: 1,
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
    color: "pink",
    fontSize: 25
  },
});
