import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

export function LogoutButton() {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token')
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <Button 
        title="Logout" 
        onPress={handleLogout}
        color="#ef4444"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  }
});
