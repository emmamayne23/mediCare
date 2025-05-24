import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function SingleSpecialtyScreen() {
    const params = useLocalSearchParams()
    const { id } = params
  return (
    <View>
      <Text>Single Specialty Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})