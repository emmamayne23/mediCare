import { healthBlogs } from '@/blogs';
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const blogPost = (id: number) => {
    return healthBlogs.find((blog) => blog.id === id)
}

export default function SingleBlogScreen() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const blog = blogPost(parseInt(id as string))

    if (!blog) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                <Text style={styles.errorText}>Blog post not found</Text>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <Image 
                    source={{ uri: blog.image }} 
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <View style={styles.categoryContainer}>
                            <Ionicons name="bookmark-outline" size={14} color="#2563eb" />
                            <Text style={styles.category}>{blog.category}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Ionicons name="calendar-outline" size={14} color="#64748b" />
                            <Text style={styles.dateText}>
                                {new Date().toDateString()}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{blog.title}</Text>

                    <View style={styles.publisherContainer}>
                        <View style={styles.publisherInfo}>
                            <Ionicons name="person-circle-outline" size={20} color="#64748b" />
                            <Text style={styles.publisherName}>{blog.publisherName}</Text>
                        </View>
                        <View style={styles.readTimeContainer}>
                            <Ionicons name="time-outline" size={14} color="#64748b" />
                            <Text style={styles.readTimeText}>
                                {Math.floor(Math.random() * 6)} min read
                            </Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>{blog.description}</Text>

                    <View style={styles.tagsContainer}>
                        <Text style={styles.tagsTitle}>Tags:</Text>
                        <View style={styles.tagsList}>
                            {blog.category.split(' ').map((tag, index) => (
                                <View key={index} style={styles.tagContainer}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.shareButton}
                    onPress={() => {/* Add share functionality */}}
                >
                    <Ionicons name="share-outline" size={20} color="#2563eb" />
                    <Text style={styles.shareButtonText}>Share Article</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8fafc',
    },
    errorText: {
        fontSize: 18,
        color: '#ef4444',
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 16,
    },
    backButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    contentContainer: {
        padding: 20,
    },
    image: {
        width: width,
        height: 250,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eff6ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    category: {
        fontSize: 12,
        color: '#2563eb',
        marginLeft: 4,
        fontWeight: '500',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 16,
        lineHeight: 36,
    },
    publisherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    publisherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    publisherName: {
        fontSize: 16,
        color: '#64748b',
        marginLeft: 8,
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
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 28,
        marginBottom: 24,
    },
    tagsContainer: {
        marginTop: 8,
    },
    tagsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 12,
    },
    tagsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tagContainer: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 14,
        color: '#64748b',
    },
    footer: {
        padding: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eff6ff',
        paddingVertical: 12,
        borderRadius: 8,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2563eb',
        marginLeft: 8,
    },
});