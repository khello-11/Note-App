import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Intro from "./app/screens/Intro";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteScreen from "./app/screens/NoteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import NoteDetails from "./app/components/NoteDetails";
import NoteProvider from "./app/context/NoteProvider";

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setuser] = useState<any>({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState<boolean>(false);

  const findUser = async () => {
    const name: any = await AsyncStorage.getItem("user");

    if (name === null) return setIsAppFirstTimeOpen(true);

    setuser(JSON.parse(name));
    setIsAppFirstTimeOpen(false);
  };
  useEffect(() => {
    findUser();
  }, []);
  const RenderNoteScreen = (props: any) => {
    return <NoteScreen {...props} user={user} />;
  };

  // Intro einen prop hizufügen mit findUserFunctoin
  // um automatisch zu andere seite wechslen
  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator>
          <Stack.Screen component={RenderNoteScreen} name="NoteScreen" />
          <Stack.Screen component={NoteDetails} name="NoteDetails" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
