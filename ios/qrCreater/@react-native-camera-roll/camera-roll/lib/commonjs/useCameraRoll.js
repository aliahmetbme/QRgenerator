"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCameraRoll = useCameraRoll;

var _react = require("react");

var _CameraRoll = require("./CameraRoll");

const initialState = {
  edges: [],
  page_info: {
    end_cursor: '',
    has_next_page: false,
    start_cursor: ''
  }
};
const defaultConfig = {
  first: 20,
  groupTypes: 'All'
};

function useCameraRoll() {
  const [photos, setPhotos] = (0, _react.useState)(initialState);
  const getPhotos = (0, _react.useRef)(async function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;

    try {
      const result = await _CameraRoll.CameraRoll.getPhotos(config);
      setPhotos(result);
    } catch (error) {
      if (__DEV__) console.log('[useCameraRoll] Error getting photos: ', error);
    }
  }).current;
  const save = (0, _react.useRef)(async function () {
    try {
      await _CameraRoll.CameraRoll.save(...arguments);
    } catch (error) {
      if (__DEV__) console.log('[useCameraRoll] Error saving to camera roll: ', error);
    }
  }).current;
  return [photos, getPhotos, save];
}
//# sourceMappingURL=useCameraRoll.js.map