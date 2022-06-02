import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Title, BottomBar, HomeButton, HelpButton } from "../components";
import React, { useState } from "react";
import { COLORS } from "../constants/colors";

const Game = ({ route, navigation }) => {
  const { codeLength, numColors } = route.params;
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={"light-content"} />
      <Title />
      <HomeButton />
      <HelpButton />
      <BottomBar data={{ codeLength, numColors }} />
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
