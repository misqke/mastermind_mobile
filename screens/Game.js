import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import {
  Title,
  BottomBar,
  HomeButton,
  HelpButton,
  GameBoard,
  GameOver,
  Help,
} from "../components";
import React, { useState, useEffect } from "react";
import {
  generateCode,
  checkGuess,
  generateStartingGuesses,
  checkWin,
} from "../helpers/functions";

const Game = ({ route, navigation }) => {
  const { numColors, codeLength } = route.params;
  const [help, setHelp] = useState(false);
  const [code, setCode] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(null);
  const [currentGuess, setCurrentGuess] = useState(0);

  const handleHelpPress = () => {
    setHelp((prev) => !prev);
  };

  const startNewGame = () => {
    setCode(generateCode(numColors, codeLength));
    setGuesses(generateStartingGuesses(codeLength));
    setCurrentGuess(0);
    setGameOver(null);
  };

  const submitGuess = (guess) => {
    const results = checkGuess(guess, code);
    let newGuesses = [...guesses];
    newGuesses[currentGuess] = { guess, results };
    setGuesses(newGuesses);
    let win = checkWin(results);
    if (win) {
      setGameOver(true);
    } else if (currentGuess === 7) {
      setGameOver(false);
    } else {
      setCurrentGuess((prev) => prev + 1);
    }
  };

  // generate and set code at page load
  useEffect(() => {
    setCode(generateCode(numColors, codeLength));
    setGuesses(generateStartingGuesses(codeLength));
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle={"light-content"} />
      <Title />
      <HomeButton />
      <HelpButton press={handleHelpPress} />
      <Help show={help} />
      <GameBoard
        guesses={guesses}
        codeLength={codeLength}
        currentGuess={currentGuess}
      />
      <GameOver
        code={code}
        guessesUsed={currentGuess + 1}
        win={gameOver}
        press={startNewGame}
      />
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
