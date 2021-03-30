import { Platform } from "react-native";

const localhost = 'http://localhost:5000/foodvisor-5f5fc/us-central1/'
const cloudhost = 'https://us-central1-foodvisor-5f5fc.cloudfunctions.net/'
export const isAndroid = Platform.OS === 'android'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isMock = process.env.NODE_ENV === 'development'

export const host = isDevelopment || isAndroid ? localhost : cloudhost
