import { Text, Button, Alert, Image, TouchableOpacity, View, ScrollView, ImageBackground, Linking } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MapView from 'react-native-maps';
import { Link, useRouter } from "expo-router";
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import "@/app/globals.css"


export default function Index() {
  const router = useRouter(); // Get the router instance
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  return (
    
    <View className="w-[100vw] h-[100vh]">
      <MapView 
        style={{
          width: '100%',
          height: '100%',
          zIndex: 20
        }} 
        initialRegion={{
                  latitude: 21.4667,
                  longitude: -157.9833,
                  latitudeDelta: 0.58,
                  longitudeDelta: 0.58,
        }}/>
    </View>
    
  );
}
