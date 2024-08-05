import { FlatList, StyleSheet, Text } from "react-native";
import ListItem, { ListItemProps } from "./ListItem";

type ListProps = {
  items: ListItemProps[];
};

const List: React.FC<ListProps> = ({ items }) =>
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem {...item} />}
    keyExtractor={(item) => item.url}
    ListEmptyComponent={<Text style={styles.text}>No items</Text>}
  />;

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    textAlign: "center",
  },
});

export default List;