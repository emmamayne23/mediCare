import { LoginButton } from "@/components/LoginButton";
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
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "MediCare",
          headerRight: () => <LoginButton />,
        }}
      />
      <Stack.Screen
        name="specialties/index"
        options={{ title: "Specialties" }}
      />
      <Stack.Screen name="blogs/index" options={{ title: "Health Articles" }} />
      <Stack.Screen
        name="specialties/[id]/index"
        options={{ title: "Doctors" }}
      />
      <Stack.Screen
        name="doctors/[id]/index"
        options={{ title: "Book an Appointment" }}
      />
      <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
      <Stack.Screen name="(auth)/signup" options={{ title: "Signup" }} />
      <Stack.Screen name="appointments/book/[id]/index" options={{ title: "Book" }} />
      <Stack.Screen name="appointments/confirm/[id]/index" options={{ title: "Confirm" }} />
      <Stack.Screen name="appointments/confirmed/index" options={{ title: "Confirmed" }} />
      <Stack.Screen name="profile/[id]/index" options={{ title: "My Profile" }} />
    </Stack>
  );
}
