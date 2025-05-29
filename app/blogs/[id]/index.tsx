import { healthBlogs } from '@/blogs'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const blogPost = (id: number) => {
    return healthBlogs.find((blog) => blog.id === id)
}

export default function SingleBlogScreen() {
    const { id } = useLocalSearchParams()
    const blog = blogPost(parseInt(id as string))

    if (!blog) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Blog not found</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Image 
                source={{ uri: blog.image }} 
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.contentContainer}>
                <Text style={styles.category}>{blog?.category}</Text>
                <Text style={styles.title}>{blog?.title}</Text>
                <View style={styles.publisherContainer}>
                    <Text style={styles.publisherName}>By {blog?.publisherName}</Text>
                </View>
                <Text style={styles.description}>{blog?.description}</Text>
            </View>
        </ScrollView>
    )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 20,
    },
    image: {
        width: width,
        height: 250,
    },
    category: {
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        lineHeight: 32,
    },
    publisherContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
    },
    publisherName: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    }
})