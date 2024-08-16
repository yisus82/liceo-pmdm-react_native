import { Pressable, Text } from "react-native";

type FilterBadgeProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, active, onClick }) =>
  <Pressable
    style={{
      backgroundColor: active ? "blue" : "gray",
      borderRadius: 10,
      padding: 10,
    }}
    onPress={onClick}
  >
    <Text style={{
      color: "white",
      fontWeight: "bold",
    }}>{label}</Text>
  </Pressable>;

export default FilterBadge;