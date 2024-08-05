import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{id}</Text>
      <Link href={"/"}>
        <Text>Go back</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
  },
});

export default DetailsScreen;