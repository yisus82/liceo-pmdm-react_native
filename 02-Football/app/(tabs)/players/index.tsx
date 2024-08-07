import { StyleSheet, Text, View } from "react-native";

const PlayersScreen = () =>
  <View style={styles.container}>
    <Text style={styles.title}>Players Screen</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PlayersScreen;
