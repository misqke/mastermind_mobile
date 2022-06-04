import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import ColorBall from "./ColorBall";
import React, { useRef, useEffect } from "react";

const GameOver = ({ code, guessesUsed, win, press }) => {
  const size = Dimensions.get("screen").width / (code.length + 1.5);
  const height = Math.ceil(Dimensions.get("screen").height / 3);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (win === null) {
      slideOut();
    } else {
      slideIn();
    }
  }, [win]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <Text style={styles.text}>
        {win ? `You win in ${guessesUsed} guesses!` : "You Lose!"}
      </Text>
      <View style={styles.row}>
        {code.map((color, i) => (
          <View
            key={`gameOverCode${i}${color}`}
            style={{ width: size, height: size }}
          >
            <ColorBall color={color} />
          </View>
        ))}
      </View>
      <Pressable style={styles.btn} onPress={() => press()}>
        <Text style={styles.btnText}>Play Again</Text>
      </Pressable>
    </Animated.View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    zIndex: 10,
    borderRadius: 8,
    backgroundColor: "#000",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-evenly",
  },
  shut: {
    bottom: "-30%",
  },
  open: {
    bottom: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "70%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#699",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#699",
  },
});
