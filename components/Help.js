import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { CurrentGuess } from "./BottomBar";
import { BoardRow } from "./GameBoard";
import ColorBall from "./ColorBall";
import React, { useRef, useEffect } from "react";

const Help = ({ show }) => {
  const height = Dimensions.get("screen").height - 75;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    !show ? slideIn() : slideOut();
  }, [show]);

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.contentBox}>
        <Text style={styles.text}>
          At game start a random code will be generated from the available
          colors. There is no limit to the number of times any given color may
          appear in the code.
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {["blue", "lime", "yellow", "red"].map((color, i) => (
            <View
              key={`exampleCode${i}${color}`}
              style={{ width: 50, height: 50, margin: 3 }}
            >
              <ColorBall color={color} />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.text}>
          Use the buttons at the bottom of your screen to fill out the "Current
          Guess" box and then push submit.
        </Text>
        <CurrentGuess
          currentIndex={null}
          guess={["yellow", "blue", "blue", "red"]}
          press={() => {
            return;
          }}
          codeLength={4}
          submit={() => {
            return;
          }}
        />
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.text}>
          The game board will display your new guess with clues to use going
          forward.
        </Text>
        <Text style={styles.text}>
          Each black circle{" "}
          <View style={[styles.circle, { backgroundColor: "black" }]}></View>{" "}
          represents a correct piece of the code.
        </Text>
        <Text style={styles.text}>
          Each white circle{" "}
          <View style={[styles.circle, { backgroundColor: "white" }]}></View>{" "}
          represents a color in your guess that is in the code, but in the wrong
          spot.
        </Text>
        <Text style={styles.text}>
          Each empty circle{" "}
          <View style={[styles.circle, { backgroundColor: "#5aa" }]}></View>{" "}
          represets a color in your guess that is not in the code.
        </Text>
        <BoardRow
          guess={{
            guess: ["yellow", "blue", "blue", "red"],
            results: ["black", "white", "white", false],
          }}
          size={50}
          currentGuess={2}
        />
        <Text style={styles.text}>
          Note: The order of the clues does not correlate to the order of the
          guess. A black circle tells you a piece of your guess is correct, but
          its up to you to deduce which one.
        </Text>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.text}>
          Crack the code in 8 guesses or less to win.
        </Text>
        <Text style={[styles.text, { textAlign: "center", fontSize: 18 }]}>
          GOOD LUCK!
        </Text>
      </View>
    </Animated.ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "91%",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    padding: 16,
  },
  text: {
    color: "white",
    marginVertical: 10,
    fontSize: 16,
  },
  contentBox: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: "50%",
  },
});
