
import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import HomeCard from "@/components/HomeCard";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { healthBlogs } from "@/blogs";

const { width } = Dimensions.get('window');

export default function Index() {
  const blogs: HealthBlogs[] = healthBlogs;
  const router = useRouter();
  const [specialties, setSpecialties] = useState<Specialties[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/specialties`)
        const data = response.data
        setSpecialties(data)
      } catch (error: any) {
        console.error("Could not fetch specilaties", error)
      }
    }

    fetchSpecialties()
  }, [])

  // Hero images (replace with your actual images)
  const heroImages = [
    { id: 1, uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg' },
    { id: 2, uri: 'https://img.freepik.com/free-photo/medical-stethoscope-with-blue-background_23-2147652363.jpg' },
    { id: 3, uri: 'https://img.freepik.com/free-photo/medicine-healthcare-concept-team-doctors-nurses_53876-133244.jpg' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <FlatList
          data={heroImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.heroImageContainer}>
              <Image source={{ uri: item.uri }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroText}>Quality Healthcare</Text>
                <Text style={styles.heroSubText}>Book appointments with top specialists</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.heroDots}>
          {heroImages.map((_, index) => (
            <View key={index} style={styles.dot} />
          ))}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Find your perfect doctor</Text>
      </View>

      {/* Services Cards */}
      <View style={styles.cards}>
        <View style={styles.cardRow}>
          <HomeCard
            icon={<FontAwesome6 name="user-doctor" size={34} color="white" />}
            title="Doctors"
            subtitle="Find a Doctor"
          />

          <HomeCard
            icon={
              <MaterialIcons name="medical-services" size={34} color="white" />
            }
            title="Departments"
            subtitle="Search Top Departments"
          />
        </View>

        <View style={styles.cardRow}>
          <HomeCard
            icon={<Feather name="phone-call" size={34} color="white" />}
            title="eConsultation"
            subtitle="Get Tele consult with us"
          />

          <HomeCard
            icon={<FontAwesome5 name="microscope" size={34} color="white" />}
            title="Diagnostics"
            subtitle="Test and health checkup"
          />
        </View>
      </View>

      {/* Specialties Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Consult Specialized Doctors</Text>
          <TouchableOpacity onPress={() => router.push("/specialties")}>
            <Text style={styles.viewAllLink}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialtiesContainer}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity key={specialty.id} style={styles.specialtyCard} onPress={() => router.push(`/specialties/${specialty.id}`)}>
              <View style={styles.specialtyIconContainer}>
                <Image 
                  source={{ uri: specialty.icon_url }} 
                  style={styles.specialtyIcon} 
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.specialtyText}>{specialty.specialty}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Blogs Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Articles</Text>
          <TouchableOpacity onPress={() => router.push("/blogs")}>
            <Text style={styles.viewAllLink}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.blogContainer}>
          {blogs.slice(0, 4).map((item) => (
            <TouchableOpacity key={item.id} style={styles.blogCard}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.blogImage} />
              )}
              <View style={styles.blogContent}>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogPublisher}>{item.publisherName}</Text>
                  <Text style={styles.blogCategory}>{item.category}</Text>
                </View>
                <Text style={styles.blogTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  heroContainer: {
    height: 200,
    position: 'relative',
  },
  heroImageContainer: {
    width: width,
    height: 200,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  heroText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heroSubText: {
    color: 'white',
    fontSize: 14,
  },
  heroDots: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 5,
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  cards: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 5,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 5,
  },
  sectionContainer: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewAllLink: {
    color: '#058ef7',
    fontSize: 14,
    fontWeight: '500',
  },
  specialtiesContainer: {
    paddingBottom: 10,
  },
  specialtyCard: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  specialtyIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#e0f2fe',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  specialtyIcon: {
    width: 40,
    height: 40,
  },
  specialtyText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#334155',
    fontWeight: '500',
  },
  blogContainer: {
    marginTop: 10,
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: "row",
    height: 120,
  },
  blogImage: {
    width: "35%",
    height: "100%",
  },
  blogContent: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  blogMeta: {
    marginBottom: 8,
  },
  blogPublisher: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 4,
  },
  blogCategory: {
    fontSize: 11,
    color: "#058ef7",
    fontWeight: '500',
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
});