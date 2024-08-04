import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () =>
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;