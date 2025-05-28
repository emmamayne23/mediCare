import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/mobile/login`, {
        email,
        password,
      });
      const token = res.data?.token;
        // console.log("token", token)
        // console.log("res", res.data)
      if (token) {
        await SecureStore.setItemAsync("token", token);
        router.canGoBack() && router.back();
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert(
        "Login failed",
        error?.response?.data || "Invalid credentials"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.push("/signup")}>
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 16, paddingVertical: 8 },
  link: { marginTop: 20, color: "#007bff", textAlign: "center" },
});
