import { Stack } from "expo-router";

const TeamsLayout = () =>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>;

export default TeamsLayout;
