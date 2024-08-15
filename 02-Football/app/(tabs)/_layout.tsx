import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
};

const TabBarIcon = (props: TabBarIconProps) => <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;

const TabLayout = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const getUserEmail = async () => {
      setLoadingUser(true);
      const email = await AsyncStorage.getItem("userEmail");
      setUserEmail(email);
      setLoadingUser(false);
    };

    getUserEmail();
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (!userEmail) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Please login to view this page</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </View>
    );
  }

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Logout", onPress: async () => {
          await AsyncStorage.removeItem("userEmail");
          router.dismissAll();
          router.push("/");
        }
      },
    ]);
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="teams"
        options={{
          title: "Teams",
          tabBarIcon: ({ color }) => <TabBarIcon name="shield" color={color} />,
          headerLeft: () =>
            <Pressable onPress={logout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color="black"
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>,
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
          headerLeft: () =>
            <Pressable onPress={logout}>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color="black"
                  style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>,
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
    </Tabs>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    fontSize: 20,
  },
  error: {
    fontSize: 20,
    color: "red",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

export default TabLayout;