import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { healthBlogs } from "@/blogs";

export default function BlogsScreen() {
  const blogs: HealthBlogs[] = healthBlogs;

  const router = useRouter();
  return (
    <ScrollView>
      <Text>BlogsScreen</Text>

      <View style={styles.blogsSection}>
        {/* <TouchableOpacity
          onPress={() => router.push("/blogs")}
          style={styles.viewAllButton}
        >
          <Text style={styles.viewAllText}>View All articles</Text>
        </TouchableOpacity> */}
        {blogs.map((item) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blogsSection: {
    padding: 20,
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
  },
  blogImage: {
    width: "100%",
    height: 200,
  },
  blogContent: {
    padding: 16,
  },
  blogPublisher: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  blogCategory: {
    fontSize: 12,
    color: "#058ef7",
    marginBottom: 8,
  },
  blogTitle: {
    fontSize: 18,
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
