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
      minWidth: 50,
      minHeight: 40,
    }}
    onPress={onClick}
  >
    <Text style={{
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    }}>{label}</Text>
  </Pressable>;

export default FilterBadge;