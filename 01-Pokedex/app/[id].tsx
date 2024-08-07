import PokemonTypeIcons from "@/assets/icons";
import Button from "@/components/Button";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

type PokemonType = {
  slot: number,
  type: {
    name: string,
    url: string,
  },
};

type Pokemon = {
  cries: {
    latest: string,
  },
  height: number,
  id: number,
  name: string,
  sprites: {
    other: {
      "official-artwork": {
        front_default: string,
      },
    },
  },
  types: PokemonType[],
  weight: number,
};

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    const fecthURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(fecthURL)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(() => setPokemonData(undefined))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    return audioSound
      ? () => {
        audioSound.unloadAsync();
      }
      : undefined;
  }, [audioSound]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const goHome = () => {
    if (audioSound) {
      audioSound.unloadAsync();
    }
    router.push("/");
  };

  if (!pokemonData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Pokemon not found</Text>
        <Button
          leftIcon="home"
          text="Home"
          onPress={goHome}
        />
      </SafeAreaView>
    );
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const playAudio = async () => {
    if (!pokemonData.cries.latest) {
      return;
    }

    if (audioSound) {
      await audioSound.unloadAsync();
    }

    const audioURL = pokemonData.cries.latest;
    if (Platform.OS === "ios") {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      if (audioURL.endsWith(".ogg")) {
        const { sound } = await Audio.Sound.createAsync(require("@/assets/audio/error.mp3"), { shouldPlay: true, volume: 1 });
        setAudioSound(sound);
        await sound.playAsync();
        Alert.alert("Error", "iOS does not support .ogg files");
        return;
      }
    }
    const { sound } = await Audio.Sound.createAsync({ uri: audioURL }, { shouldPlay: true, volume: 1 });
    setAudioSound(sound);
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Image
            source={{ uri: pokemonData.sprites.other["official-artwork"].front_default }}
            style={styles.image}
          />
          <Text style={[styles.largeText, styles.boldText]}>{capitalize(pokemonData.name)}</Text>
          <View style={styles.dataContainer}>
            <Text style={[styles.text, styles.boldText]}>Height:</Text>
            <Text style={styles.text}>{pokemonData.height / 10} m.</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={[styles.text, styles.boldText]}>Weight:</Text>
            <Text style={styles.text}>{pokemonData.weight / 10} kg.</Text>
          </View>
          <View style={styles.typesContainer}>
            {pokemonData.types.map(({ type }) => (
              <Image
                key={type.name}
                source={PokemonTypeIcons[type.name]}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            leftIcon="play-arrow"
            text="Play"
            onPress={playAudio}
          />
          <Button
            leftIcon="home"
            text="Home"
            onPress={goHome}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  loading: {
    fontSize: 32,
  },
  error: {
    fontSize: 32,
    color: "red",
  },
  card: {
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#f9c2ff",
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  largeText: {
    fontSize: 36,
  },
  boldText: {
    fontWeight: "bold",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontSize: 24,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 50,
  },
});

export default DetailsScreen;