import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#058ef7",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "MediCare" }} />
      <Stack.Screen name="specialties/index" options={{ title: "Specialties" }} />
      <Stack.Screen name="blogs/index" options={{ title: "Health Articles" }} />
    </Stack>
  );
}
