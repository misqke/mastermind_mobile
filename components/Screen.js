import { SafeAreaView } from "react-native";
import React from "react";

const Screen = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        padding: 16,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Screen;
