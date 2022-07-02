// A file with the dimensions of the device. Allows styling to work of different devices with different screen sizes
import { Dimensions } from "react-native";

const dimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export default dimensions;
