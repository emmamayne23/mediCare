import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ConfirmScreen() {
    const router = useRouter()
    
    const handleRedirect = () => {
        router.canGoBack() && router.back()
        router.replace("/")
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="check-circle" size={80} color="#10B981" />
                </View>
                
                <Text style={styles.title}>Appointment Confirmed!</Text>
                
                <Text style={styles.message}>
                    Your appointment has been successfully booked. You will receive a confirmation email shortly.
                </Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                        <MaterialIcons name="notifications" size={24} color="#058ef7" />
                        <Text style={styles.detailText}>
                            You will receive a reminder 24 hours before your appointment
                        </Text>
                    </View>
                    
                    <View style={styles.detailRow}>
                        <MaterialIcons name="event" size={24} color="#058ef7" />
                        <Text style={styles.detailText}>
                            You can view your appointment details in your profile
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleRedirect}
                >
                    <Text style={styles.buttonText}>Return to Home</Text>
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
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: '#334155',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 32,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 12,
        flex: 1,
    },
    button: {
        backgroundColor: '#058ef7',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
})