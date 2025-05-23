import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import HomeCard from "@/components/HomeCard";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { healthBlogs } from "@/blogs";

export default function Index() {
  const blogs: HealthBlogs[] = healthBlogs;

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Find your perfect doctor</Text>
      </View>

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
            subtitle="Tests and health checkup"
          />
        </View>
      </View>

      <View style={styles.blogsSection}>
        <TouchableOpacity
          onPress={() => router.push("/blogs")}
          style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>View All articles</Text>
        </TouchableOpacity>
        <View style={styles.blogContainer}>
          {blogs.slice(0,4).map((item) => (
            <TouchableOpacity key={item.id} style={styles.blogCard}>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.blogImage} />
              )}
              <View style={styles.blogContent}>
                <Text style={styles.blogPublisher}>{item.publisherName}</Text>
                <Text style={styles.blogCategory}>{item.category}</Text>
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
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#058ef7",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  blogsSection: {
    padding: 20,
  },
  blogContainer: {
    display: "flex",
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: "flex",
    flexDirection: "row",
  },
  blogImage: {
    width: "35%",
    height: "auto",
  },
  blogContent: {
    padding: 16,

  },
  blogPublisher: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  blogCategory: {
    fontSize: 12,
    color: "#058ef7",
    marginBottom: 6,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  viewAllButton: {
    marginBottom: 16,
  },
  viewAllText: {
    color: "#058ef7",
    fontSize: 16,
    fontWeight: "500",
  },
});
