import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { PlayerSnapshotData } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  teamId: z.string(),
  photo: z.string().url().or(z.literal("")),
});

const PlayerFormScreen = () => {
  const { id } = useLocalSearchParams();
  const db = getFirestore();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      teamId: "",
      photo: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const positionData = [
    { label: "Goalkeeper (GK)", value: "Goalkeeper" },
    { label: "Defender (DF)", value: "Defender" },
    { label: "Midfielder (MF)", value: "Midfielder" },
    { label: "Forward (FK)", value: "Forward" },
  ];
  const [selectedPosition, setSelectedPosition] = useState("Goalkeeper");

  useEffect(() => {
    if (!id) {
      return;
    }

    getDoc(doc(db, "players", `${id}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const snapshotData = { ...snapshot.data() } as PlayerSnapshotData;
          setValue("name", snapshotData.name);
          setSelectedPosition(snapshotData.position);
          setValue("teamId", snapshotData.teamId ? snapshotData.teamId : "");
          setValue("photo", snapshotData.photo ? snapshotData.photo : "");
        }
      });
  }, [id]);


  const onSubmit = async (formData: { name: string, teamId: string; photo: string; }) => {
    if (!positionData.find(position => position.value === selectedPosition)) {
      Alert.alert("Please select a position");
      return;
    }

    const playerData = {
      name: formData.name,
      position: selectedPosition,
      teamId: formData.teamId,
      photo: formData.photo,
    };

    if (id) {
      await setDoc(doc(db, "players", `${id}`), playerData);
    } else {
      await addDoc(collection(db, "players"), playerData);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player</Text>
      <FormInput
        control={control}
        name="name"
        autoCapitalize="words"
        inputMode="text"
        placeholder="Enter name"
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={positionData}
        search
        labelField="label"
        valueField="value"
        placeholder="Select position"
        searchPlaceholder="Search..."
        value={selectedPosition}
        onChange={item => setSelectedPosition(item.value)}
      />
      <FormInput
        control={control}
        name="teamId"
        autoCapitalize="none"
        inputMode="text"
        placeholder="Enter team ID"
      />
      <FormInput
        control={control}
        name="photo"
        autoCapitalize="none"
        inputMode="url"
        placeholder="Enter photo URL"
      />
      <View style={styles.buttonContainer}>
        <Button text="Cancel" onPress={() => router.back()} />
        <Button text="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdown: {
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#ccc",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 50,
  },
});

export default PlayerFormScreen;