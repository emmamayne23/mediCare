import { API_URL } from '@/constants/constant'
import axios from 'axios'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

export default function SpecialtiesScreen() {
    const [specialties, setSpecialties] = useState<Specialties[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const fetchSpecilaties = async () => {
          try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/specialties`)
            const data = response.data
            setSpecialties(data)
          } catch (error: any) {
            console.error("Could not fetch specilaties", error)
          } finally{
            setLoading(false)
          }
        }
    
        fetchSpecilaties()
      }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Medical Specialties</Text>
        <Text style={styles.subtitle}>Choose a specialty to find the right doctor</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#058ef7" />
        </View>
      ) : (
        <View style={styles.specialtiesContainer}>
          <FlatList 
            data={specialties}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.specialtyCard}
                onPress={() => router.push(`/specialties/${item.id}`)}
              >
                <View style={styles.iconContainer}>
                  <Image 
                    source={{ uri: item.icon_url }} 
                    style={styles.specialtyIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.specialtyName}>{item.specialty}</Text>
                <Text style={styles.specialtyDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  specialtiesContainer: {
    marginBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  specialtyCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#e0f2fe',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  specialtyIcon: {
    width: 32,
    height: 32,
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 4,
  },
  specialtyDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
})