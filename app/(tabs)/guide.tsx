import { Text, Button, Alert, Image, TouchableOpacity, View, ScrollView, ImageBackground, Linking } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

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
    
    <SafeAreaProvider className="flex-col">
      <SafeAreaView>
        <Text className="text-[10vw] ">Hello There</Text>
      </SafeAreaView>
      
    </SafeAreaProvider>
    
    
  );
}
