import AsyncStorage from "@react-native-async-storage/async-storage";


const useStoreData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error while logging In")
    }
};

const useGetData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};
