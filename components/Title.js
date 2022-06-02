import { Text } from "react-native";
import React from "react";

const Title = () => {
  return (
    <>
      <Text
        style={{
          color: "#ccc",
          fontSize: 36,
          fontWeight: "600",
          position: "absolute",
          top: 35,
        }}
      >
        MASTERMIND
      </Text>
    </>
  );
};

export default Title;
