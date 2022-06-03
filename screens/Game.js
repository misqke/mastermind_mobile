import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import {
  Title,
  BottomBar,
  HomeButton,
  HelpButton,
  GameBoard,
} from "../components";
import React, { useState, useEffect } from "react";
import { COLORS } from "../helpers/constants";
import { generateCode, checkGuess } from "../helpers/functions";

const Game = ({ route, navigation }) => {
  const { numColors, codeLength } = route.params;
  const [code, setCode] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const submitGuess = (guess) => {
    const results = checkGuess(guess, code);
    setGuesses((prev) => [...prev, { guess, results }]);
  };

  // generate and set code at page load
  useEffect(() => {
    setCode(generateCode(numColors, codeLength));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={"light-content"} />
      <Title />
      <HomeButton />
      <HelpButton />
      <GameBoard guesses={guesses} />
      <BottomBar data={{ codeLength, numColors }} submitGuess={submitGuess} />
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
