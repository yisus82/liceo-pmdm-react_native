import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
};

const TabBarIcon = (props: TabBarIconProps) => <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;

const TabLayout = () =>
  <Tabs>
    <Tabs.Screen
      name="teams"
      options={{
        title: "Teams",
        tabBarIcon: ({ color }) => <TabBarIcon name="shield" color={color} />,
        headerRight: () =>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="plus-circle"
                size={25}
                color="black"
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>,
      }}
    />
    <Tabs.Screen
      name="players"
      options={{
        title: "Players",
        tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        headerRight: () =>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="plus-circle"
                size={25}
                color="black"
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>,
      }}
    />
  </Tabs>;

export default TabLayout;