import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import ColorBall from "./ColorBall";
import React, { useState, useEffect, useRef } from "react";

const ResultMarker = ({ color, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: color,
        marginVertical: 1.5,
        marginHorizontal: 1.5,
      }}
    ></View>
  );
};

export const BoardRow = ({ guess, size, currentGuess }) => {
  return (
    <View style={styles.row}>
      {guess.guess.map((color, i) => (
        <View
          style={[{ width: size, height: size }, styles.rowBlock]}
          key={`row${currentGuess}spot${i}guess${color}`}
        >
          <ColorBall color={color} />
        </View>
      ))}
      <View style={[styles.resultsBlock, { width: size * 0.8 }]}>
        {guess.results.map((result, i) => (
          <ResultMarker
            key={i}
            color={result === false ? "transparent" : result}
            size={
              size / guess.results.length -
              (guess.results.length === 6 ? 0.5 : 1)
            }
          />
        ))}
      </View>
    </View>
  );
};

const GameBoard = ({ guesses, codeLength, currentGuess }) => {
  const [size, setSize] = useState(1);
  const boardRef = useRef(null);

  useEffect(() => {
    setSize((Dimensions.get("screen").width - 125) / codeLength);
  }, [guesses]);

  useEffect(() => {
    const gameBoard = boardRef.current;
    if (gameBoard === null) return;
    if (currentGuess === 0) {
      gameBoard.scrollTo({ x: 0, y: 0, animated: true });
    } else if (currentGuess > 4) {
      gameBoard.scrollTo({ x: 0, y: currentGuess * 100, animated: true });
    }
  }, [currentGuess]);

  return (
    <ScrollView ref={boardRef} style={styles.board}>
      {guesses.map((guess, i) => (
        <BoardRow
          key={`${guess.guess.name}${i}`}
          guess={guess}
          size={size}
          currentGuess={currentGuess}
        />
      ))}
    </ScrollView>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  board: {
    backgroundColor: "#5aa",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    flex: 1,
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#5aa",
  },
  rowBlock: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  resultsBlock: {
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: 2,
  },
});
