import { TurboModule } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
declare type CameraRollAuthorizationStatus = 'granted' | 'limited' | 'denied' | 'unavailable' | 'blocked' | 'not-determined';
export interface Spec extends TurboModule {
    checkPermission(content: string): Promise<CameraRollAuthorizationStatus>;
    requestReadWritePermission(): Promise<CameraRollAuthorizationStatus>;
    requestAddOnlyPermission(): Promise<CameraRollAuthorizationStatus>;
    refreshPhotoSelection(): Promise<boolean>;
    addListener(eventName: string): void;
    removeListeners(count: Int32): void;
}
declare const _default: Spec;
export default _default;
