import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  leftIcon?: typeof MaterialIcons.defaultProps.name,
  text: string,
  rightIcon?: typeof MaterialIcons.defaultProps.name,
  disabled?: boolean,
  onPress: () => void,
};

const Button: React.FC<ButtonProps> = ({ leftIcon = "", text = "", rightIcon = "", disabled = false, onPress }) => (
  <TouchableOpacity style={disabled ? { ...styles.button, ...styles.disabledButton } : styles.button} onPress={onPress} disabled={disabled}>
    {leftIcon && <MaterialIcons name={leftIcon} size={24} color="black" />}
    <Text style={styles.text}>{text}</Text>
    {rightIcon && <MaterialIcons name={rightIcon} size={24} color="black" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#f9c2ff",
    width: 100,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    marginHorizontal: 10,
  },
});

export default Button;