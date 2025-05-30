import { API_URL } from "@/constants/constant";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import HomeCard from "@/components/HomeCard";

import { Ionicons } from "@expo/vector-icons";
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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/doctors`)
        const data = response.data
        setDoctors(data)
      } catch (error) {
        console.error("Could not fetch doctors", error)
      }
    }

    fetchDoctors()
  }, [])

  const heroImages = [
    { 
      id: 1, 
      uri: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
      title: "Quality Healthcare",
      subtitle: "Book appointments with top specialists"
    },
    { 
      id: 2, 
      uri: 'https://img.freepik.com/free-photo/medical-stethoscope-with-blue-background_23-2147652363.jpg',
      title: "Expert Doctors",
      subtitle: "Get treated by experienced professionals"
    },
    { 
      id: 3, 
      uri: 'https://img.freepik.com/free-photo/medicine-healthcare-concept-team-doctors-nurses_53876-133244.jpg',
      title: "24/7 Support",
      subtitle: "We're here to help you anytime"
    },
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
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveSlide(newIndex);
          }}
          renderItem={({ item }) => (
            <View style={styles.heroImageContainer}>
              <Image source={{ uri: item.uri }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroText}>{item.title}</Text>
                <Text style={styles.heroSubText}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.heroDots}>
          {heroImages.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot,
                index === activeSlide && styles.activeDot
              ]} 
            />
          ))}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>What are you looking for?</Text>
        <Text style={styles.subtitle}>Find your perfect doctor</Text>
      </View>

      {/* Services Cards */}
      <View style={styles.cards}>
        <View style={styles.cardRow}>
          <HomeCard
            icon={<FontAwesome6 name="user-doctor" size={40} color="white" />}
            title="Doctors"
            subtitle="Book Appointment"
          />

          <HomeCard
            icon={
              <MaterialIcons name="medical-services" size={40} color="white" />
            }
            title="Departments"
            subtitle="Search Top Specialties"
          />
        </View>

        <View style={styles.cardRow}>
          <HomeCard
            icon={<Feather name="phone-call" size={40} color="white" />}
            title="eConsultation"
            subtitle="Get Tele consult with us"
          />

          <HomeCard
            icon={<FontAwesome5 name="microscope" size={40} color="white" />}
            title="Diagnostics"
            subtitle="Test & health checkup"
          />
        </View>
      </View>

      {/* Doctors Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recently Visited Doctors</Text>
            <Text style={styles.sectionSubtitle}>Connect with our specialists</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push("/doctors")}
          >
            <Text style={styles.viewAllLink}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorsContainer}
        >
          {doctors.map((doctor) => (
            <TouchableOpacity 
              key={doctor.id} 
              style={styles.doctorCard} 
              onPress={() => router.push(`/doctors/${doctor.id}`)}
            >
              <Image 
                source={{ uri: doctor.image }} 
                style={styles.doctorImage} 
                resizeMode="cover"
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorRating}>
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text style={styles.ratingText}>{doctor.rating || 4.5}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Specialties Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Consult Specialized Doctors</Text>
            <Text style={styles.sectionSubtitle}>Find doctors by specialty</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push("/specialties")}
          >
            <Text style={styles.viewAllLink}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialtiesContainer}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity 
              key={specialty.id} 
              style={styles.specialtyCard} 
              onPress={() => router.push(`/specialties/${specialty.id}`)}
            >
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
          <View>
            <Text style={styles.sectionTitle}>Health Articles</Text>
            <Text style={styles.sectionSubtitle}>Stay informed with our latest updates</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push("/blogs")}
          >
            <Text style={styles.viewAllLink}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.blogContainer}>
          {blogs.slice(0, 4).map((item) => (
            <TouchableOpacity key={item.id} style={styles.blogCard} onPress={() => router.push(`/blogs/${item.id}`)}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.blogImage} />
              )}
              <View style={styles.blogContent}>
                <View style={styles.blogMeta}>
                  <Text style={styles.blogPublisher}>{item.publisherName}</Text>
                  <Text style={styles.blogCategory}>{item.category}</Text>
                </View>
                <Text style={styles.blogTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.blogDescription} numberOfLines={2}>{item.description}</Text>
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
    height: 220,
    width: 380,
    position: 'relative',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  heroImageContainer: {
    width: 350,
    height: 220,
    marginLeft: 10
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
  },
  heroDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  header: {
    padding: 20,
    paddingTop: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  cards: {
    padding: 5,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  sectionContainer: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllLink: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  doctorsContainer: {
    paddingRight: 20,
  },
  doctorCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  doctorImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  doctorInfo: {
    padding: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  doctorRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748b',
  },
  specialtiesContainer: {
    paddingRight: 20,
  },
  specialtyCard: {
    width: 120,
    alignItems: 'center',
    marginRight: 16,
  },
  specialtyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  specialtyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  specialtyText: {
    fontSize: 14,
    color: '#1e293b',
    textAlign: 'center',
  },
  blogContainer: {
    gap: 16,
  },
  blogCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  blogImage: {
    width: '100%',
    height: 200,
  },
  blogContent: {
    padding: 16,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  blogPublisher: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  blogCategory: {
    fontSize: 14,
    color: '#64748b',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  blogDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});