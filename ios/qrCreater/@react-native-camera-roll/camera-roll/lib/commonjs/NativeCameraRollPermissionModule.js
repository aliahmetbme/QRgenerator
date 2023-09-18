"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

// we call get here since on Android this module does not exist and it would throw
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
var _default = _reactNative.TurboModuleRegistry.get('RNCCameraRollPermission');

exports.default = _default;
//# sourceMappingURL=NativeCameraRollPermissionModule.js.map