import { Image, Pressable } from "react-native";
import { house, help } from "../constants/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        position: "absolute",
        top: 40,
        left: 10,
      }}
      onPress={() => navigation.navigate("Home")}
    >
      <Image style={{ width: 30, height: 30 }} source={house} />
    </Pressable>
  );
};

export const HelpButton = () => {
  return (
    <Pressable
      style={{
        position: "absolute",
        top: 40,
        right: 10,
      }}
    >
      <Image style={{ width: 30, height: 30 }} source={help} />
    </Pressable>
  );
};
