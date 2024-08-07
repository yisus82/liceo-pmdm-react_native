import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export type ListItemProps = {
  name: string;
  url: string;
};

const ListItem: React.FC<ListItemProps> = (item) => {
  const id = item.url.split("/").at(-2) || "";

  return (
    <Pressable style={styles.item} onPress={() => router.push(`/${id}`)}>
      <Text style={styles.text}>{item.name.toUpperCase()}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9c2ff",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default ListItem;