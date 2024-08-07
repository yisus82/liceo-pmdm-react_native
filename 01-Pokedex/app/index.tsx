import Button from "@/components/Button";
import List from "@/components/List";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const [pokemon, setPokemon] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);

  const isFirstPage = useMemo(() => previous === null, [previous]);
  const isLastPage = useMemo(() => next === null, [next]);

  const fetchPage = (url: string | null) => {
    if (!url) {
      return;
    }

    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPokemon(data.results);
        setNext(data.next);
        setPrevious(data.previous);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchPage("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"), []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (pokemon.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>No Pokemon found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <List items={pokemon} />
      <View style={styles.buttonContainer}>
        <Button
          text="Previous"
          leftIcon="navigate-before"
          disabled={isFirstPage}
          onPress={() => fetchPage(previous)}
        />
        <Button
          text="Next"
          rightIcon="navigate-next"
          disabled={isLastPage}
          onPress={() => fetchPage(next)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loading: {
    fontSize: 32,
    textAlign: "center",
  },
  error: {
    fontSize: 32,
    textAlign: "center",
    color: "red",
  },
});

export default HomeScreen;