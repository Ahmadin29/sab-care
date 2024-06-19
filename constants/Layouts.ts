import { Dimensions } from "react-native";

const window = Dimensions.get("window");

const width = window.width;
const height = window.height;

export default {
  height: height,
  width: width,
  isSmallDevice: width <= 375,
  isWideDevice: width > 600,
};
