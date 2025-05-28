import { getCurrentUserId } from "@/utils/auth";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


type DecodedToken = {
  name?: string;
  email?: string;
  exp?: number;
};

export function LoginButton() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded?.name) {
            setUserName(decoded.name);
          }
        } catch (err) {
          console.error("Invalid token", err);
        }
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadUserId = async () => {
      const userid = await getCurrentUserId()
      // console.log(userid)
      setUserId(userid)
    }

    loadUserId()
  }, [])

  return (
    <View style={styles.container}>
      {userName ? (
        <TouchableOpacity 
          style={styles.loggedInContainer}
          onPress={() => router.push(`/profile/${userId}`)}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.userName}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.signInButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  loggedInContainer: {
    padding: 4,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#058ef7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    color: '#058ef7',
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#058ef7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  signInText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  }
});
