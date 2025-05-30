import { API_URL } from "@/constants/constant";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SingleSpecialtyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [doctors, setDoctors] = useState<SpecialtyDoctors[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [specialty, setSpecialty] = useState<Specialties | null>(null);

  const fetchData = async () => {
    try {
      const [doctorsRes, specialtyRes] = await Promise.all([
        axios.get(`${API_URL}/api/specialties/${id}/doctors`),
        axios.get(`${API_URL}/api/specialties/${id}`)
      ]);
      setDoctors(doctorsRes.data);
      setSpecialty(specialtyRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.specialtyIconContainer}>
            {specialty?.icon_url && (
              <Image 
                source={{ uri: specialty.icon_url }} 
                style={styles.specialtyIcon} 
                resizeMode="cover"
              />
            )}
          </View>
          <View style={styles.specialtyInfo}>
            <Text style={styles.specialtyTitle}>{specialty?.specialty}</Text>
            <Text style={styles.specialtyDescription}>{specialty?.description}</Text>
          </View>
        </View>
      </View>

      {/* Doctors List */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Available Doctors</Text>
            <Text style={styles.sectionSubtitle}>Connect with our specialists</Text>
          </View>
          <Text style={styles.doctorCount}>{doctors.length} doctors</Text>
        </View>

        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={["#2563eb"]}
              tintColor="#2563eb"
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.doctorCard}
              onPress={() => router.push(`/doctors/${item.id}`)}
            >
              <Image 
                source={{ uri: item.img }} 
                style={styles.doctorImage} 
                resizeMode="cover" 
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                <View style={styles.experienceContainer}>
                  <Ionicons name="time-outline" size={16} color="#64748b" />
                  <Text style={styles.experienceText}>{item.yearsExperience} years experience</Text>
                </View>
                <Text style={styles.qualification} numberOfLines={1}>
                  {item.qualifications}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#94a3b8" />
              <Text style={styles.emptyText}>No doctors available in this specialty</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  specialtyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  specialtyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  specialtyInfo: {
    flex: 1,
  },
  specialtyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
  },
  specialtyDescription: {
    fontSize: 16,
    color: "#64748b",
    lineHeight: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  doctorCount: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: "#2563eb",
    marginBottom: 8,
  },
  experienceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  experienceText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#64748b",
  },
  qualification: {
    fontSize: 14,
    color: "#64748b",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginTop: 12,
  },
});

