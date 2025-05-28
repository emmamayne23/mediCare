import axios from 'axios'
import * as Google from 'expo-auth-session/providers/google'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { Alert, Button } from 'react-native'

// Complete any open auth sessions (required for Google login to work properly)
WebBrowser.maybeCompleteAuthSession()

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!

export function GoogleSignInButton() {
  const router = useRouter()

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type === 'success') {
        try {
          const accessToken = response.authentication?.accessToken

          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
          })

          const { email, name, picture } = userInfo.data

          const backendRes = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/api/mobile/oauth`,
            { email, name, image: picture }
          )

          const token = backendRes.data?.token

          if (token) {
            await SecureStore.setItemAsync('token', token)
            router.replace('/')
          } else {
            Alert.alert('Login Failed', 'Invalid token from server')
          }
        } catch (err: any) {
          console.error(err)
          Alert.alert('Login Error', err?.response?.data || 'Something went wrong')
        }
      }
    }

    handleGoogleLogin()
  }, [response])

  return (
    <Button
      title="Sign in with Google"
      onPress={() => promptAsync()}
      disabled={!request}
    />
  )
}
