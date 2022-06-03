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
      style={[styles.colorBtn, { backgroundColor: color.code }]}
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

const CurrentGuess = ({ currentIndex, guess, press, codeLength, submit }) => {
  return (
    <View style={styles.guessBar}>
      <View style={styles.guessContainer}>
        {guess.map((guess, i) => (
          <GuessBlock
            color={guess.code}
            index={i}
            currentIndex={currentIndex}
            key={`${i + guess.code}`}
            press={press}
            codeLength={codeLength}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitBtn} onPress={submit}>
        <Text>Submit</Text>
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

  const handleSubmitGuess = (guess) => {
    submitGuess(guess);
    setGuess(blankGuess);
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
      startingGuess.push({ name: "transparent", code: "transparent" });
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
        {COLORS.slice(0, data.numColors).map((color) => (
          <ColorButton
            key={color.name}
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 20,
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
    backgroundColor: "white",
    width: 50,
    height: 50,
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
