import { API_URL } from '@/constants/constant'
import { getCurrentUserId } from '@/utils/auth'
import { MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ConfirmAppoinmentScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [details, setDetails] = useState<Timebook>()

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(`${API_URL}/api/time-slots/book/${id}`)
      const data = response.data
      setDetails(data)
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
      const response = await axios.post(`${API_URL}/api/appointments`, {
        patientId: userId,
        doctorId: details?.doctorId,
        slotId: details?.id,
        status: "confirmed",
      })

      const updateslot = await axios.put(`${API_URL}/api/time-slots/${details.id}`, {
        isBooked: true
      })
      console.log("Appointment booked successfully: ", response.data)
      console.log("Status changed", updateslot.data)
      router.canGoBack() && router.back();
      router.replace("/appointments/confirmed")
    } catch (error: any) {
      console.error("Could not confirm appointment", error)
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Appointment</Text>
      
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
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={24} color="#058ef7" />
            <Text style={styles.infoText}>{details?.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={24} color="#058ef7" />
            <Text style={styles.infoText}>{details?.startTime.slice(0, 5)} - {details?.endTime.slice(0, 5)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmation}>
          <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#058ef7',
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
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 12,
  },
  confirmButton: {
    backgroundColor: '#058ef7',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})