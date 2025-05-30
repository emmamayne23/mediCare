import { LogoutButton } from "@/components/LogoutButton";
import { API_URL } from "@/constants/constant";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [userAppointments, setUserAppointments] = useState<AllAppointments[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profileRes, appointmentsRes] = await Promise.all([
        axios.get(`${API_URL}/api/profile/${id}`),
        axios.get(`${API_URL}/api/profile/user-appointments/${id}`)
      ]);
      setUserProfile(profileRes.data);
      setUserAppointments(appointmentsRes.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
      setAppointmentsLoading(false);
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

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchData}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          {userProfile?.profileImage ? (
            <Image 
              source={{ uri: userProfile.profileImage }} 
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>
                {userProfile?.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userProfile?.name}</Text>
            <Text style={styles.email}>{userProfile?.email}</Text>
          </View>
        </View>
        <LogoutButton />
      </View>

      {/* Appointments Section */}
      <View style={styles.appointmentsSection}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>My Appointments</Text>
            <Text style={styles.sectionSubtitle}>View and manage your appointments</Text>
          </View>
          <Text style={styles.appointmentCount}>
            {userAppointments.length} {userAppointments.length === 1 ? 'appointment' : 'appointments'}
          </Text>
        </View>
        
        {appointmentsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#2563eb" />
          </View>
        ) : userAppointments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>No appointments yet</Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => router.replace('/doctors')}
            >
              <Text style={styles.bookButtonText}>Book an Appointment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList 
            data={userAppointments} 
            keyExtractor={(item) => item.appointmentId}
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
                style={styles.appointmentCard}
                onPress={() => router.replace({
                  pathname: "/appointments/book/[id]",
                  params: { id: item.appointmentId }
                })}
              >
                <View style={styles.doctorInfo}>
                  {item.doctorProfileImage ? (
                    <Image 
                      source={{ uri: item.doctorProfileImage }} 
                      style={styles.doctorImage}
                    />
                  ) : (
                    <View style={styles.doctorImagePlaceholder}>
                      <Text style={styles.doctorImageText}>
                        {item.doctorName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <View style={styles.doctorDetails}>
                    <Text style={styles.doctorName}>{item.doctorName}</Text>
                    <Text style={styles.specialty}>{item.specialty}</Text>
                  </View>
                </View>
                <View style={styles.appointmentDetails}>
                  <View style={styles.dateTimeContainer}>
                    <Ionicons name="calendar-outline" size={16} color="#64748b" />
                    <Text style={styles.dateTime}>
                      {new Date(item.appointmentDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.dateTimeContainer}>
                    <Ionicons name="time-outline" size={16} color="#64748b" />
                    <Text style={styles.dateTime}>{item.appointmentTime}</Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'confirmed' ? '#dcfce7' : '#fef3c7' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: item.status === 'confirmed' ? '#059669' : '#d97706' }
                    ]}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  profileSection: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileImageText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  appointmentsSection: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  appointmentCount: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  doctorImagePlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorImageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#64748b',
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
