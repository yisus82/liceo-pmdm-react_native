import { Stack } from "expo-router";

const RootLayout = () =>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="[id]" options={{ headerShown: false }} />
  </Stack>;

export default RootLayout;