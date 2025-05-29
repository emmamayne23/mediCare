import { API_URL } from "@/constants/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function DoctorsScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/doctors`);
      const data = response.data;
      setDoctors(data);
    } catch (error: any) {
      console.error("Error fetching doctors", error);
      setError("Failed to load doctors. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDoctors();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#058ef7" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Doctors Available</Text>
        <Text style={styles.subtitle}>Find and connect with our specialists</Text>
      </View>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <View>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors available at the moment</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
    textAlign: "center",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#058ef7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  listContainer: {
    padding: 20,
  },
  doctorCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
