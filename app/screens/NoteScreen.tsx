import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect, FC } from "react";
import colors from "../misc/colors";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from "../components/NoteInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notes from "../components/Notes";
import { useNotes } from "../context/NoteProvider";
import NotFound from "../components/NotFound";

const reverseData = (data: any) => {
  return data.sort((a: any, b: any) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen: FC = ({ user, navigation }: any) => {
  const [greet, setGreet] = useState("Evening");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { notes, setNotes, FindNotes } = useNotes();
  const [resultNoteFound, setResultNoteFound] = useState<boolean>(false);

  const FindGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
  };

  useEffect(() => {
    FindGreet();
  }, []);

  const reverseNotes = reverseData(notes);
  const handleSubmit = async (title: any, desc: any) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    return await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const OpenNote = (note: any) => {
    navigation.navigate("NoteDetails", { note });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNoteFound(false);
      return await FindNotes();
    }
    const filteredNotes = notes.filter((note: any) => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNoteFound(true);
    }
  };
  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNoteFound(false);
    await FindNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNoteFound ? (
            <NotFound />
          ) : (
            <FlatList
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              keyExtractor={(item: any) => item.id.toString()}
              data={reverseNotes}
              renderItem={({ item }: any) => (
                <Notes onPress={() => OpenNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
          <RoundIconBtn
            onPress={() => setModalVisible(true)}
            antIconName="plus"
            style={styles.IconBtn}
          />
        </View>
      </TouchableWithoutFeedback>

      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    top: 50,
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    // opacity: 0.5,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  IconBtn: {
    position: "absolute",
    right: 50,
    top: 600,
    zIndex: 1,
  },
});
