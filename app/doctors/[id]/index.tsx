import { API_URL } from '@/constants/constant'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function DoctorDetailsPage() {
    const { id } = useLocalSearchParams()

    const router = useRouter()
    
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
                <ActivityIndicator size="large" color="#2563eb" />
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
            <View style={styles.header}>
                <Image source={{ uri: doctorDetails.profileImage }} style={styles.image} />
                <View style={styles.headerContent}>
                    <Text style={styles.name}>{doctorDetails.name}</Text>
                    <Text style={styles.specialty}>{doctorDetails.specialty}</Text>
                </View>
            </View>

            <View style={styles.content}>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="person-outline" size={24} color="#2563eb" />
                        <Text style={styles.sectionTitle}>Bio</Text>
                    </View>
                    <Text style={styles.infoText}>{doctorDetails.bio}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="school-outline" size={24} color="#2563eb" />
                        <Text style={styles.sectionTitle}>Qualifications</Text>
                    </View>
                    <Text style={styles.infoText}>{doctorDetails.qualifications}</Text>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="time-outline" size={24} color="#2563eb" />
                        <Text style={styles.sectionTitle}>Experience</Text>
                    </View>
                    <Text style={styles.infoText}>{doctorDetails.experience} years</Text>
                </View>

                
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => router.push(`/appointments/book/${id}`)}
            >
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
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
    header: {
        backgroundColor: '#fff',
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 18,
        color: '#64748b',
        fontWeight: '500',
    },
    content: {
        padding: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1e293b',
        marginLeft: 12,
    },
    infoText: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    errorText: {
        fontSize: 18,
        color: '#ef4444',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#2563eb',
        margin: 20,
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#2563eb',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
})