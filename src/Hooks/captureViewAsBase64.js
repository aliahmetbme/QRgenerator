import React from 'react';
import { View } from 'react-native';
import ViewShot from 'react-native-view-shot';

const captureViewAsBase64 = async (view) => {
  try {
    return new Promise(async (resolve) => {
      // Verilen view'i bir görüntüye dönüştür
      const base64Data = await viewShotCapture(view);

      resolve(base64Data);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const viewShotCapture = (view) => {
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

export default captureViewAsBase64;
