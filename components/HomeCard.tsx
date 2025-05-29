import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeCard({ icon, title, subtitle }: HomeCard ) {
  return (
    <TouchableOpacity style={styles.card}>
        <View style={styles.iconContainer}>
            {icon}
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#058ef7',
        borderRadius: 16,
        padding: 14,
        margin: 8,
        width: '44%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 14,
        marginRight: 16,
        flex: 2,
        marginBottom: 5
    },
    textContainer: {
        flex: 2,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        fontWeight: '400',
    }
})