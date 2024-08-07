import { StyleSheet, Text, View } from "react-native";

const TeamsScreen = () =>
  <View style={styles.container}>
    <Text style={styles.title}>Teams Screen</Text>
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

export default TeamsScreen;
