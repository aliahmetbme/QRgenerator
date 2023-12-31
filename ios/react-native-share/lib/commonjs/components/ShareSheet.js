"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _Overlay = _interopRequireDefault(require("./Overlay"));
var _Sheet = _interopRequireDefault(require("./Sheet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ShareSheet = _ref => {
  let {
    style = {},
    overlayStyle = {},
    visible,
    onCancel,
    children
  } = _ref;
  const backButtonHandler = React.useCallback(() => {
    if (visible) {
      onCancel();
      return true;
    }
    return false;
  }, [visible, onCancel]);
  React.useEffect(() => {
    _reactNative.BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      _reactNative.BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [backButtonHandler]);
  return /*#__PURE__*/React.createElement(_Overlay.default, {
    visible: visible
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.actionSheetContainer, overlayStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.TouchableOpacity, {
    style: styles.button,
    onPress: onCancel
  }), /*#__PURE__*/React.createElement(_Sheet.default, {
    visible: visible
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.buttonContainer, style]
  }, children))));
};
const styles = _reactNative.StyleSheet.create({
  actionSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    paddingTop: 10
  },
  buttonContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 5,
    paddingTop: 5
  },
  button: {
    flex: 1
  }
});
var _default = ShareSheet;
exports.default = _default;
//# sourceMappingURL=ShareSheet.js.map