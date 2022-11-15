import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notes from "./Notes";
import { useNotes } from "../context/NoteProvider";
import NoteInputModal from "./NoteInputModal";
import React, { useState } from "react";

const NoteDetails = (props: any) => {
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes } = useNotes();
  const [showModel, setShowModel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const formatDate = (ms: string) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    return `${day}.${month}.${year} - ${hrs}:${min}:${sec}   `;
  };

  // Function to delete the note use inside displayDeleteAlert func.
  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNotes = notes.filter((n: string) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  // Alert Function
  const displayDeleteAlert = () => {
    Alert.alert("Are You Sure!", "This action will delete your note permanently", [
      {
        text: "Delete",
        onPress: deleteNote,
      },
      {
        text: "No Thanks",
        onPress: () => console.log("no "),
      },
    ]);
  };

  const handleUpdate = async (title: string, desc: string, time: string) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    console.log(notes);
    const newNotes = notes.filter((n: string) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpDated = true;
        n.time = time;
        setNote(n);
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => {
    setShowModel(false);
  };
  const OpenEditModel = () => {
    setIsEdit(true);
    setShowModel(true);
  };

  return (
    <ScrollView style={styles.conatiner}>
      <Text style={styles.time}>
        {note.isUpDated ? `Updated At ${formatDate(note.time)}` : `Created At ${formatDate(note.time)}`}
      </Text>

      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.desc}>{note.desc}</Text>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{
            backgroundColor: colors.ERROR,
            marginBottom: 10,
          }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName="edit" onPress={OpenEditModel} />
        <NoteInputModal
          onClose={handleOnClose}
          onSubmit={handleUpdate}
          visible={showModel}
          isEdit={isEdit}
          note={note}
        />
      </View>
    </ScrollView>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.5,
  },

  time: {
    textAlign: "center",
    fontSize: 17,
    opacity: 0.5,
    margin: 10,
    color: colors.ERROR,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    top: 500,
  },
});
