import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { PlayerSnapshotData } from "@/types/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  teamId: z.string(),
  photo: z.string().url().or(z.literal("")),
});

const PlayerFormScreen = () => {
  const { id } = useLocalSearchParams();
  const db = getFirestore();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      position: "",
      teamId: "",
      photo: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    getDoc(doc(db, "players", `${id}`))
      .then(snapshot => {
        if (snapshot.exists()) {
          const snapshotData = { ...snapshot.data() } as PlayerSnapshotData;
          setValue("name", snapshotData.name);
          setValue("position", snapshotData.position);
          setValue("teamId", snapshotData.teamId ? snapshotData.teamId : "");
          setValue("photo", snapshotData.photo ? snapshotData.photo : "");
        }
      });
  }, [id]);


  const onSubmit = async (formData: { name: string, position: string; teamId: string; photo: string; }) => {
    const playerData = {
      name: formData.name,
      position: formData.position,
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
      <FormInput
        control={control}
        name="position"
        autoCapitalize="words"
        inputMode="text"
        placeholder="Enter city"
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
  buttonContainer: {
    flexDirection: "row",
    gap: 50,
  },
});

export default PlayerFormScreen;