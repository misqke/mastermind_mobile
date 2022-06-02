import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Title } from "../components";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [codeLength, setCodeLength] = useState(4);
  const [numColors, setNumColors] = useState(6);
  const navigation = useNavigation();

  const handleCodeLengthChange = (num) => {
    if (num === -1) {
      if (codeLength > 4) {
        setCodeLength((prev) => prev + num);
      }
    }
    if (num === 1) {
      if (codeLength < 6) {
        setCodeLength((prev) => prev + num);
      }
    }
  };

  const handleNumColorsChange = (num) => {
    if (num === -1) {
      if (numColors > 5) {
        setNumColors((prev) => prev + num);
      }
    }
    if (num === 1) {
      if (numColors < 7) {
        setNumColors((prev) => prev + num);
      }
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <Title />
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>Code Length</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.valueBtn,
                { borderColor: codeLength === 4 ? "#666" : "white" },
              ]}
              onPress={() => handleCodeLengthChange(-1)}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: codeLength === 4 ? "#666" : "white" },
                ]}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.value}>{codeLength}</Text>
            <TouchableOpacity
              style={[
                styles.valueBtn,
                { borderColor: codeLength === 6 ? "#666" : "white" },
              ]}
              onPress={() => handleCodeLengthChange(1)}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: codeLength === 6 ? "#666" : "white" },
                ]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.formLabel}>Colors</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[
                styles.valueBtn,
                { borderColor: numColors === 5 ? "#666" : "white" },
              ]}
              onPress={() => handleNumColorsChange(-1)}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: numColors === 5 ? "#666" : "white" },
                ]}
              >
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.value}>{numColors}</Text>
            <TouchableOpacity
              style={[
                styles.valueBtn,
                { borderColor: numColors === 7 ? "#666" : "white" },
              ]}
              onPress={() => handleNumColorsChange(1)}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: numColors === 7 ? "#666" : "white" },
                ]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => navigation.navigate("Game", { numColors, codeLength })}
        >
          <Text style={styles.btnText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  formControl: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 300,
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    position: "relative",
  },
  formLabel: {
    color: "white",
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 20,
    position: "absolute",
    top: -10,
    backgroundColor: "#000",
    paddingHorizontal: 5,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
  },
  value: {
    fontSize: 30,
    color: "white",
  },
  valueBtn: {
    borderRadius: "50%",
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  btnText: {
    color: "white",
    fontSize: 30,
    lineHeight: 30,
  },
  playBtn: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
  },
});
