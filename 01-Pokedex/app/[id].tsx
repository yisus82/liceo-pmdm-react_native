import PokemonTypeIcons from "@/assets/icons";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </SafeAreaView>
    );
  }

  if (!pokemonData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Pokemon not found</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </SafeAreaView>
    );
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <SafeAreaView style={styles.container}>
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
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
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
    padding: 50,
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default DetailsScreen;