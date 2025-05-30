import { healthBlogs } from "@/blogs";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function BlogsScreen() {
  const blogs: HealthBlogs[] = healthBlogs;
  const router = useRouter();

  const renderBlogCard = ({ item }: { item: HealthBlogs }) => (
    <TouchableOpacity 
      style={styles.blogCard} 
      onPress={() => router.push(`/blogs/${item.id}`)}
    >
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.blogImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.blogContent}>
        <View style={styles.blogHeader}>
          <View style={styles.publisherContainer}>
            <Ionicons name="person-circle-outline" size={16} color="#64748b" />
            <Text style={styles.blogPublisher}>{item.publisherName}</Text>
          </View>
          <View style={styles.categoryContainer}>
            <Ionicons name="bookmark-outline" size={14} color="#2563eb" />
            <Text style={styles.blogCategory}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.blogTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.blogFooter}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color="#64748b" />
            <Text style={styles.dateText}>
              {new Date().toDateString()}
            </Text>
          </View>
          <View style={styles.readTimeContainer}>
            <Ionicons name="time-outline" size={14} color="#64748b" />
            <Text style={styles.readTimeText}>{Math.floor(Math.random() * 6)} min read</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        renderItem={renderBlogCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Health Articles</Text>
              <Text style={styles.headerSubtitle}>Stay informed with the latest health insights</Text>
            </View>
            <Text style={styles.articleCount}>
              {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  articleCount: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  blogCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
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
  blogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  publisherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogPublisher: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  blogCategory: {
    fontSize: 12,
    color: '#2563eb',
    marginLeft: 4,
    fontWeight: '500',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    lineHeight: 24,
  },
  blogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
});
