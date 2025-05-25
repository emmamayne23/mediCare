import { API_URL } from '@/constants/constant'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function DoctorDetailsPage() {
    const { id } = useLocalSearchParams()
    const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/doctors/${id}`)
                const data = response.data
                setDoctorDetails(data)
            } catch (error: any) {
                console.error("could not fetch the details", error)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchDetails()
        }
    }, [id])

    if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#058ef7" />
      </View>
    )
  }

  if (!doctorDetails) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Doctor not found</Text>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: doctorDetails.profileImage }} style={styles.image} />
      <Text style={styles.name}>{doctorDetails.name}</Text>
      <Text style={styles.specialty}>{doctorDetails.specialty}</Text>
      <Text style={styles.sectionTitle}>Qualifications</Text>
      <Text style={styles.infoText}>{doctorDetails.qualifications}</Text>
      <Text style={styles.sectionTitle}>Experience</Text>
      <Text style={styles.infoText}>{doctorDetails.experience} years</Text>
      <Text style={styles.sectionTitle}>Bio</Text>
      <Text style={styles.infoText}>{doctorDetails.bio}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  specialty: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#0f172a',
  },
  infoText: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
})