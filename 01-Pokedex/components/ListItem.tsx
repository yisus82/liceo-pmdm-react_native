import { StyleSheet, Text, View } from "react-native";

export type ListItemProps = {
  name: string;
  url: string;
};

const ListItem: React.FC<ListItemProps> = (item) =>
  <View style={styles.item}>
    <Text style={styles.text}>{item.name.toUpperCase()}</Text>
  </View>;

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