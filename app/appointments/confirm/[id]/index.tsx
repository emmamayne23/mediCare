import { API_URL } from '@/constants/constant'
import { getCurrentUserId } from '@/utils/auth'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

export default function ConfirmAppoinmentScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [details, setDetails] = useState<Timebook>()
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(true)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/time-slots/book/${id}`)
        const data = response.data
        setDetails(data)
      } catch (error: any) {
        Alert.alert("Error", "Could not fetch appointment details")
        console.error("Error fetching appointment details", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  useEffect(() => {
    const loadUserId = async () => {
      const userid = await getCurrentUserId()
      // console.log(userid)
      setUserId(userid)
    }

    loadUserId()
  }, [])

  const handleConfirmation = async () => {
    try {
      if (!userId) {
        throw new Error("User Id required")
      }
      if (!details) {
        throw new Error("Appointment details required")
      }
      setConfirming(true)
      
      await axios.post(`${API_URL}/api/appointments`, {
        patientId: userId,
        doctorId: details?.doctorId,
        slotId: details?.id,
        reason: reason,
        status: "confirmed",
      })

      await axios.put(`${API_URL}/api/time-slots/${details.id}`, {
        isBooked: true
      })

      Alert.alert(
        "Success", 
        "Appointment confirmed successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              router.canGoBack() && router.back();
              router.replace("/appointments/confirmed")
            }
          }
        ]
      )
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data || "Could not confirm appointment"
      )
    } finally {
      setConfirming(false)
    }
  }
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    )
  }

  if (!details) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text style={styles.errorText}>Appointment details not found</Text>
      </View>
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="check-circle-outline" size={32} color="#2563eb" />
          <Text style={styles.title}>Confirm Your Appointment</Text>
          <Text style={styles.subtitle}>Please review the details below</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.doctorInfo}>
            <Image 
              source={{ uri: details?.doctorImage || "" }} 
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{details?.doctorName}</Text>
              <Text style={styles.doctorQualifications}>{details?.doctorQualifications}</Text>
            </View>
          </View>

          <View style={styles.appointmentInfo}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Appointment Details</Text>
              <View style={styles.infoRow}>
                <MaterialIcons name="event" size={24} color="#2563eb" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoText}>
                    {new Date(details?.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="access-time" size={24} color="#2563eb" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoText}>
                    {new Date(`2000-01-01T${details?.startTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })} - {new Date(`2000-01-01T${details?.endTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </Text>
                </View>
              </View>
              <View>
                <TextInput
                  style={styles.reasonInput}
                  placeholder='add a reason? (optional)'
                  value={reason}
                  onChangeText={setReason}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.confirmButton, confirming && styles.confirmButtonDisabled]} 
            onPress={handleConfirmation}
            disabled={confirming}
          >
            {confirming ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
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
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginTop: 12,
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  doctorInfo: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  doctorQualifications: {
    fontSize: 14,
    color: '#64748b',
  },
  appointmentInfo: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
  },
  infoSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  reasonInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15
  },
  confirmButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  confirmButtonDisabled: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});