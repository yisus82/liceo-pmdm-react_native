import { Stack } from "expo-router";

const PlayersLayout = () =>
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>;

export default PlayersLayout;
