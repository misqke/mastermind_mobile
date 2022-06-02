import { View } from "react-native";
import React from "react";

const ColorBall = ({ color }) => {
  return (
    <View
      style={{
        width: "90%",
        height: "90%",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
};

export default ColorBall;
