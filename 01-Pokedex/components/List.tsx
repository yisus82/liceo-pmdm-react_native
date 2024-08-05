import { FlatList } from "react-native";
import ListItem, { ListItemProps } from "./ListItem";

type ListProps = {
  items: ListItemProps[];
};

const List: React.FC<ListProps> = ({ items }) =>
  <FlatList
    data={items}
    renderItem={({ item }) => <ListItem {...item} />}
    keyExtractor={(item) => item.url}
  />;

export default List;