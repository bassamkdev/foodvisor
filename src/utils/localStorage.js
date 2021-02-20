import AsyncStorage from '@react-native-async-storage/async-storage'

async function storeData(key, value, userId) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(`@${key}-${userId}`, jsonValue)
  } catch (e) {
    console.log('storing data', e)
  }
}

async function getData(key, userId, set) {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}-${userId}`)
    if (jsonValue !== null) {
      set(JSON.parse(jsonValue))
    }
  } catch (e) {
    console.log('reading data', e)
  }
}

export {getData, storeData}
