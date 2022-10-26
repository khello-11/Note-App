import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({ onFinish }: any) => {
  const [name, setname] = useState("");

  const handelSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter Your Name to Continue </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Name "
          value={name}
          onChangeText={text => setname(text)}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconname="arrowright" onPress={handelSubmit} />
        ) : null}
      </View>
    </>
  );
};

export default Intro;

const width: number = Dimensions.get("window").width - 50;
console.log(width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    color: colors.PRIMARY,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    width,
    height: 50,
    marginBottom: 15,
  },
  inputTitle: {
    alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
  },
});
