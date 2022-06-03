import { View, Text, StyleSheet, ScrollView } from "react-native";
import ColorBall from "./ColorBall";
import React from "react";

const BoardRow = ({ guess }) => {
  return <View style={styles.row}></View>;
};

const GameBoard = ({ guesses }) => {
  return (
    <View style={styles.board}>
      <ScrollView>
        {guesses.map((guess, i) => (
          <BoardRow key={`${guess.name}${i}`} guess={guess} />
        ))}
      </ScrollView>
    </View>
  );
};

export default GameBoard;

const styles = StyleSheet.create({
  board: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(200, 200, 200)",
  },
});
