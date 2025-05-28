import * as SecureStore from "expo-secure-store"
import { jwtDecode } from "jwt-decode"

type DecodedToken = {
    sub?: string,
    name?: string,
    email?: string,
    exp?: number,
}

export const getCurrentUserId = async (): Promise<string | null> => {
    try {
        const token = await SecureStore.getItemAsync("token")
        if(token) {
            const decoded: DecodedToken = jwtDecode(token)
            return decoded.sub || null
        }
        return null
    } catch (error: any) {
        console.error("Error getting user ID: ", error)
        return null
    }
}