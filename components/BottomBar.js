import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS } from "../helpers/constants";
import ColorBall from "./ColorBall";

const ColorButton = ({ color, press }) => {
  return (
    <TouchableOpacity
      style={[styles.colorBtn, { backgroundColor: color }]}
      onPress={() => press(color)}
    ></TouchableOpacity>
  );
};

const GuessBlock = ({ color, index, currentIndex, press, codeLength }) => {
  const size = (Dimensions.get("screen").width - 150) / codeLength;
  return (
    <Pressable
      style={[
        styles.guessBlock,
        {
          borderColor: index === currentIndex ? "gold" : "white",
          width: size,
          height: size,
        },
      ]}
      onPress={() => press(index)}
    >
      <ColorBall color={color} />
    </Pressable>
  );
};

export const CurrentGuess = ({
  currentIndex,
  guess,
  press,
  codeLength,
  submit,
}) => {
  return (
    <View style={styles.guessBar}>
      <View style={styles.guessContainer}>
        {guess.map((guess, i) => (
          <GuessBlock
            color={guess}
            index={i}
            currentIndex={currentIndex}
            key={`currentguess${i}${guess}`}
            press={press}
            codeLength={codeLength}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.submitBtn,
          {
            borderColor: currentIndex === null ? "black" : "#7cc",
            backgroundColor: currentIndex === null ? "#7cc" : "black",
          },
        ]}
        onPress={() => submit()}
      >
        <Text style={{ color: currentIndex === null ? "black" : "#7cc" }}>
          Submit
        </Text>
      </TouchableOpacity>
      <View style={styles.label}>
        <Text style={styles.labelText}>Current Guess</Text>
      </View>
    </View>
  );
};

const BottomBar = ({ data, submitGuess }) => {
  const [guess, setGuess] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blankGuess, setBlankGuess] = useState([]);

  const handleSubmitGuess = () => {
    const unGuessed = guess.findIndex((color) => color === "transparent");
    if (unGuessed !== -1) {
      setCurrentIndex(unGuessed);
      return;
    }
    submitGuess(guess);
    setGuess(blankGuess);
    setCurrentIndex(0);
  };

  const handleColorBtnPress = (color) => {
    if (currentIndex === null) return;
    let updatedGuess = [...guess];
    updatedGuess[currentIndex] = color;
    setGuess(updatedGuess);
    if (currentIndex < guess.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(null);
    }
  };

  useEffect(() => {
    const startingGuess = [];
    for (let i = 0; i < data.codeLength; i++) {
      startingGuess.push("transparent");
    }
    setGuess(startingGuess);
    setBlankGuess(startingGuess);
  }, [data.codeLength]);

  return (
    <View style={styles.bar}>
      <CurrentGuess
        currentIndex={currentIndex}
        guess={guess}
        press={setCurrentIndex}
        codeLength={data.codeLength}
        submit={handleSubmitGuess}
      />
      <View style={styles.btnContainer}>
        {COLORS.slice(0, data.numColors).map((color, i) => (
          <ColorButton
            key={`colorBtn${i}${color}`}
            color={color}
            currentIndex={currentIndex}
            press={handleColorBtnPress}
          />
        ))}
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bar: {
    width: "100%",
    padding: 10,
    height: "30%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorBtn: {
    width: 45,
    height: 45,
    borderRadius: "50%",
  },
  guessBar: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    position: "relative",
    borderRadius: 5,
    backgroundColor: "#000",
  },
  guessContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginRight: 8,
  },
  guessBlock: {
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 5,
    // flex: 1,
  },
  submitBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    top: -7,
    left: 10,
    backgroundColor: "#000",
    paddingHorizontal: 2,
  },
  labelText: {
    color: "white",
    fontSize: 14,
    lineHeight: 14,
  },
});
