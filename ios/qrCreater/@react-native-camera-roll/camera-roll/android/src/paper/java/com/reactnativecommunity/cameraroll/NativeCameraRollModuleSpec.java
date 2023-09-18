
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleJavaSpec.js
 *
 * @nolint
 */

package com.reactnativecommunity.cameraroll;

import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactModuleWithSpec;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

public abstract class NativeCameraRollModuleSpec extends ReactContextBaseJavaModule implements ReactModuleWithSpec, TurboModule {
  public NativeCameraRollModuleSpec(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  @DoNotStrip
  public abstract void saveToCameraRoll(String uri, ReadableMap options, Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getPhotos(ReadableMap params, Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getAlbums(ReadableMap params, Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void deletePhotos(ReadableArray photoUris, Promise promise);

  @ReactMethod
  @DoNotStrip
  public abstract void getPhotoByInternalID(String internalID, ReadableMap options, Promise promise);
}
