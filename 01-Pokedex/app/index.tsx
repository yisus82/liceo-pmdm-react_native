import List from "@/components/List";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      .then((response) => response.json())
      .then((data) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <List items={pokemon} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={isFirstPage ? { ...styles.button, ...styles.disabledButton } : styles.button}
          disabled={isFirstPage}
          onPress={() => fetchPage(previous)}
        >
          <MaterialIcons name="navigate-before" size={24} color="black" />
          <Text>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isLastPage ? { ...styles.button, ...styles.disabledButton } : styles.button}
          disabled={isLastPage}
          onPress={() => fetchPage(next)}
        >
          <Text>Next</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" />
        </TouchableOpacity>
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f9c2ff",
    width: 100,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loading: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default HomeScreen;