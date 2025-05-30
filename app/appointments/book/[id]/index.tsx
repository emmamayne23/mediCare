import { API_URL } from "@/constants/constant";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  date: string;
}

interface DoctorDetails {
  id: number;
  name: string;
  specialty: string;
  profileImage: string;
}

export default function BookAppointmentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slotsResponse, doctorResponse] = await Promise.all([
          axios.get(`${API_URL}/api/time-slots/${id}`),
          axios.get(`${API_URL}/api/doctors/${id}`),
        ]);
        setSlots(slotsResponse.data);
        setDoctorDetails(doctorResponse.data);
      } catch (error) {
        console.error("Could not fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  // Get unique dates
  const dates = Object.keys(groupedSlots).sort();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {doctorDetails && (
        <View style={styles.doctorInfo}>
          <Image
            source={{ uri: doctorDetails.profileImage }}
            style={styles.doctorImage}
          />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{doctorDetails.name}</Text>
            <Text style={styles.doctorSpecialty}>
              {doctorDetails.specialty}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.title}>Select Appointment Time</Text>
        <Text style={styles.subtitle}>
          Choose a date and time that works for you
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.datesContainer}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.dateButton,
              selectedDate === date && styles.selectedDateButton,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedDateText,
              ]}
            >
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>
        {selectedDate ? (
          <ScrollView style={styles.timeSlotsContainer}>
            <Text style={styles.timeSlotsTitle}>Available Times</Text>
            <View style={styles.timeSlotsGrid}>
              {groupedSlots[selectedDate].map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={styles.timeSlot}
                  onPress={() =>
                    router.push(`/appointments/confirm/${slot.id}`)
                  }
                >
                  {/* <Ionicons name="time-outline" size={20} color="#2563eb" /> */}
                  <Text style={styles.timeText}>
                    {new Date(
                      `2000-01-01T${slot.startTime}`
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyStateText}>
              Select a date to view available times
            </Text>
          </View>
        )}
      </ScrollView>
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
  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#64748b",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  datesContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    height: 20,
  },
  dateButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    marginRight: 12,
    minWidth: 120,
    alignItems: "center",
    height: 50,
  },
  selectedDateButton: {
    backgroundColor: "#2563eb",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
  },
  selectedDateText: {
    color: "#fff",
  },
  timeSlotsContainer: {
    flex: 2,
  },
  timeSlotsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timeSlotsGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
  },
  timeSlot: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minWidth: 110,
  },
  timeText: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  emptyState: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 12,
    textAlign: "center",
  },
});
