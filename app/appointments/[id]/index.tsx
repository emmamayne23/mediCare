import { API_URL } from "@/constants/constant";
import { getCurrentUserId } from "@/utils/auth";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SingleAppoinmentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [appointmentDetail, setAppointmentDetail] =
    useState<SingleAppointment | null>(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadUserId = async () => {
      const userid = await getCurrentUserId();
      // console.log(userid)
      setUserId(userid);
    };

    loadUserId();
  }, []);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/appointments/${id}`);
        const data = response.data;
        setAppointmentDetail(data);
      } catch (error: any) {
        console.error("Error fetching this appointment", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [id]);

  const handleReview = async () => {
    try {
      if (!userId) {
        throw new Error("User Id required");
      }
      if (!appointmentDetail) {
        throw new Error("Appointment details required");
      }
      if (rating === 0) {
        Alert.alert("Error", "Please select a rating");
        return;
      }
      if (!review.trim()) {
        Alert.alert("Error", "Please enter a review");
        return;
      }

      setSubmitting(true);
      await axios.post(`${API_URL}/api/reviews`, {
        patientId: userId,
        doctorId: appointmentDetail.doctorId,
        rating: rating,
        comment: review,
      });

      Alert.alert(
        "Success",
        "Thank you for your review!",
        [
          {
            text: "OK",
            onPress: () => {
              setReview("");
              setRating(0);
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data || "Could not submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!appointmentDetail) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>Appointment details not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "#22c55e";
      case "completed":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={32}
              color={star <= rating ? "#f59e0b" : "#cbd5e1"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.header}>
            <MaterialIcons name="event-note" size={32} color="#2563eb" />
            <Text style={styles.title}>Appointment Details</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.doctorInfo}>
              <Image
                style={styles.doctorImage}
                source={{ uri: appointmentDetail.doctorProfileImage }}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>
                  {appointmentDetail.doctorName}
                </Text>
                <Text style={styles.specialty}>
                  {appointmentDetail.specialty}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.appointmentInfo}>
              <View style={styles.infoRow}>
                <MaterialIcons name="event" size={24} color="#2563eb" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoText}>
                    {new Date(
                      appointmentDetail.appointmentDate
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="access-time" size={24} color="#2563eb" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoText}>
                    {appointmentDetail.appointmentTime}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="info-outline" size={24} color="#2563eb" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          getStatusColor(appointmentDetail.status) + "20",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(appointmentDetail.status) },
                      ]}
                    >
                      {appointmentDetail.status}
                    </Text>
                  </View>
                </View>
              </View>

              {appointmentDetail.reason && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="note" size={24} color="#2563eb" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Reason</Text>
                    <Text style={styles.infoText}>
                      {appointmentDetail.reason}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {appointmentDetail.status === "completed" && (
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Leave a Review</Text>
              <Text style={styles.reviewSubtitle}>How was your experience?</Text>
              
              {renderStars()}

              <TextInput
                style={styles.reviewInput}
                placeholder="Share your experience (optional)"
                value={review}
                onChangeText={setReview}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity 
                style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
                onPress={handleReview}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Review</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  errorText: {
    fontSize: 18,
    color: "#ef4444",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  doctorInfo: {
    flexDirection: "row",
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: "#64748b",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 20,
  },
  appointmentInfo: {
    gap: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  reviewCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  reviewSubtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starButton: {
    padding: 4,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    minHeight: 100,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
