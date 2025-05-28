import { LogoutButton } from "@/components/LogoutButton";
import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [userAppointments, setUserAppointments] = useState<AllAppointments[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/profile/${id}`);
        const data = response.data;
        setUserProfile(data);
      } catch (error: any) {
        console.error("Could not fetch the user profile", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  useEffect(() => {
    const fetchAppts = async () => {
      try {
        setAppointmentsLoading(true);
        const response = await axios.get(
          `${API_URL}/api/profile/user-appointments/${id}`
        );
        const data = response.data;
        // console.log("Appointments data:", data);
        setUserAppointments(data);
      } catch (error: any) {
        console.error("Can't fetch appointments", error);
        setError("Failed to load appointments");
      } finally {
        setAppointmentsLoading(false);
      }
    };
    fetchAppts();
  }, [id]);

  if (loading) {
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
      <View style={styles.profileSection}>
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
        <Text style={styles.name}>{userProfile?.name}</Text>
        <Text style={styles.email}>{userProfile?.email}</Text>
        <LogoutButton />
      </View>

      <View style={styles.appointmentsSection}>
        <Text style={styles.sectionTitle}>My Appointments</Text>
        
        {appointmentsLoading ? (
          <ActivityIndicator size="small" color="#058ef7" />
        ) : userAppointments.length === 0 ? (
          <Text style={styles.noAppointmentsText}>No appointments found</Text>
        ) : (
          <FlatList 
            data={userAppointments} 
            keyExtractor={(item) => item.appointmentId} 
            renderItem={({ item }) => (
              <View style={styles.appointmentCard}>
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
                  <Text style={styles.dateTime}>
                    {new Date(item.appointmentDate).toLocaleDateString()} at {item.appointmentTime}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'confirmed' ? '#10B981' : '#F59E0B' }
                  ]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              </View>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#058ef7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  appointmentsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  noAppointmentsText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 20,
  },
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#058ef7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorImageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: '#64748b',
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 14,
    color: '#475569',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
