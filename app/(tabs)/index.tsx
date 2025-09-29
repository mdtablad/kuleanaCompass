import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFonts } from "@expo-google-fonts/roboto/useFonts";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useRouter } from "expo-router";
import "@/app/globals.css";

export default function Index() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState({
    latitude: 21.4667,
    longitude: -157.9833,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });


  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          setLocation(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
          
        }
      );
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="w-[100vw] h-[100vh]">
      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%", zIndex: 20 }}
        region={location}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You"
          description="Your current location"
        />
      </MapView>
    </View>
  );
}