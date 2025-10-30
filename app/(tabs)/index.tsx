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
        <Marker
          coordinate={{
            latitude: 21.2766,
            longitude: -157.8270,
          }}
          title="Waikīkī Beach"
          description="Tourism hub with beach alerts and surf conditions"
        />
        <Marker
          coordinate={{
            latitude: 21.2622,
            longitude: -157.8057,
          }}
          title="Diamond Head Crater"
          description="Hiking trail with environmental updates"
        />
        <Marker
          coordinate={{
            latitude: 21.2910,
            longitude: -157.8437,
          }}
          title="Ala Moana Center"
          description="Shopping center with local business highlights"
        />
        <Marker
          coordinate={{
            latitude: 21.3229,
            longitude: -157.8671,
          }}
          title="Bishop Museum"
          description="Cultural events and educational exhibits"
        />
        <Marker
          coordinate={{
            latitude: 21.2690,
            longitude: -157.6938,
          }}
          title="Hanauma Bay"
          description="Marine life alerts and conservation tips"
        />
        <Marker
          coordinate={{
            latitude: 21.3656,
            longitude: -157.9509,
          }}
          title="Pearl Harbor"
          description="Historical site with tourism impact notices"
        />
        <Marker
          coordinate={{
            latitude: 21.3069,
            longitude: -157.8583,
          }}
          title="Iolani Palace"
          description="Cultural heritage updates"
        />
        <Marker
          coordinate={{
            latitude: 21.6419,
            longitude: -158.0650,
          }}
          title="Waimea Bay"
          description="Surf conditions and local food trucks"
        />
        <Marker
          coordinate={{
            latitude: 21.3910,
            longitude: -157.7156,
          }}
          title="Lanikai Beach"
          description="Sunrise alerts and reef protection info"
        />
        <Marker
          coordinate={{
            latitude: 21.3926,
            longitude: -157.7440,
          }}
          title="Kailua Town"
          description="Local business promotions and traffic updates"
        />
        <Marker
          coordinate={{
            latitude: 21.3133,
            longitude: -157.6553,
          }}
          title="Makapuʻu Lighthouse"
          description="Hiking safety and whale sighting alerts"
        />
        <Marker
          coordinate={{
            latitude: 21.3380,
            longitude: -158.1230,
          }}
          title="Ko Olina Lagoons"
          description="Resort area with water quality updates"
        />
        <Marker
          coordinate={{
            latitude: 21.3156,
            longitude: -158.0869,
          }}
          title="Kapolei Commons"
          description="Local shopping and dining suggestions"
        />
        <Marker
          coordinate={{
            latitude: 21.3861,
            longitude: -158.0097,
          }}
          title="Waipahu Cultural Garden"
          description="Cultural events and community updates"
        />
        <Marker
          coordinate={{
            latitude: 21.3128,
            longitude: -158.0072,
          }}
          title="Ewa Beach Park"
          description="Coastal erosion alerts and local eateries"
        />
        <Marker
          coordinate={{
            latitude: 21.4833,
            longitude: -158.2200,
          }}
          title="Mākaha Beach"
          description="Surf safety and nearby vendors"
        />
        <Marker
          coordinate={{
            latitude: 21.5022,
            longitude: -158.0242,
          }}
          title="Wahiawā Botanical Garden"
          description="Flora updates and educational tours"
        />
        <Marker
          coordinate={{
            latitude: 21.2746,
            longitude: -157.8227,
          }}
          title="Honolulu Zoo"
          description="Animal care alerts and family activities"
        />
        <Marker
          coordinate={{
            latitude: 21.5214,
            longitude: -157.8375,
          }}
          title="Kualoa Ranch"
          description="Eco-tourism and local farm highlights"
        />
        <Marker
          coordinate={{
            latitude: 21.3115,
            longitude: -157.8642,
          }}
          title="Chinatown Honolulu"
          description="Cultural festivals and small business features"
        />
        <Marker
          coordinate={{
            latitude: 21.4382,
            longitude: -157.9949,
          }}
          title="Mililani Town Center"
          description="Community hub with local shops and weekend events"
        />
        <Marker
          coordinate={{
            latitude: 21.3660,
            longitude: -157.9300,
          }}
          title="Aloha Stadium"
          description="Event alerts and swap meet schedules"
        />
        <Marker
          coordinate={{
            latitude: 21.3350,
            longitude: -157.8900,
          }}
          title="Salt at Kakaʻako"
          description="Trendy district with local eateries and art"
        />
        <Marker
          coordinate={{
            latitude: 21.3469,
            longitude: -157.9001,
          }}
          title="Kakaʻako Waterfront Park"
          description="Oceanfront park with tide and surf updates"
        />
        <Marker
          coordinate={{
            latitude: 21.3700,
            longitude: -157.9300,
          }}
          title="USS Missouri Memorial"
          description="Historic site with guided tour info"
        />
        <Marker
          coordinate={{
            latitude: 21.3880,
            longitude: -157.9730,
          }}
          title="Waikele Premium Outlets"
          description="Shopping alerts and local vendor highlights"
        />
        <Marker
          coordinate={{
            latitude: 21.3970,
            longitude: -157.9730,
          }}
          title="Leeward Community College"
          description="Campus events and student-led initiatives"
        />
        <Marker
          coordinate={{
            latitude: 21.4830,
            longitude: -158.0350,
          }}
          title="Dole Plantation"
          description="Agricultural updates and pineapple maze info"
        />
        <Marker
          coordinate={{
            latitude: 21.4990,
            longitude: -158.0200,
          }}
          title="Wahiawā Reservoir"
          description="Fishing conditions and water level alerts"
        />
        <Marker
          coordinate={{
            latitude: 21.4700,
            longitude: -158.0000,
          }}
          title="Schofield Barracks"
          description="Military base updates and community events"
        />
        <Marker
          coordinate={{
            latitude: 21.3350,
            longitude: -157.9200,
          }}
          title="Moanalua Gardens"
          description="Cultural site with local flora and picnic areas"
        />
        <Marker
          coordinate={{
            latitude: 21.3000,
            longitude: -157.8500,
          }}
          title="Thomas Square"
          description="Public art installations and civic events"
        />
        <Marker
          coordinate={{
            latitude: 21.2950,
            longitude: -157.8500,
          }}
          title="Honolulu Museum of Art"
          description="Exhibit alerts and cultural programming"
        />
        <Marker
          coordinate={{ latitude: 21.5739, longitude: -158.2390 }}
          title="Kaʻena Point"
          description="Protected seabird nesting area and native plant restoration"
        />
        <Marker
          coordinate={{ latitude: 21.3350, longitude: -157.7114 }}
          title="Hanauma Bay"
          description="Marine life conservation district with coral reef education"
        />
        <Marker
          coordinate={{ latitude: 21.3667, longitude: -157.7119 }}
          title="Maunalua Bay"
          description="Watershed restoration and invasive algae removal"
        />
        <Marker
          coordinate={{ latitude: 21.5946, longitude: -158.1036 }}
          title="Mokulēʻia Beach"
          description="Monk seal sightings and dune preservation"
        />
        <Marker
          coordinate={{ latitude: 21.4992, longitude: -158.0217 }}
          title="Waiʻanae Kai Forest Reserve"
          description="Native forest protection and watershed management"
        />
        <Marker
          coordinate={{ latitude: 21.3296, longitude: -157.8470 }}
          title="Ala Wai Canal"
          description="Stormwater runoff monitoring and pollution mitigation"
        />
        <Marker
          coordinate={{ latitude: 21.3050, longitude: -157.8583 }}
          title="Magic Island"
          description="Beach cleanups and coastal erosion awareness"
        />
        <Marker
          coordinate={{ latitude: 21.2766, longitude: -157.8275 }}
          title="Kapiʻolani Park"
          description="Urban green space with native tree planting"
        />
        <Marker
          coordinate={{ latitude: 21.2760, longitude: -157.8325 }}
          title="Waikīkī Beach"
          description="Sand replenishment and reef-safe sunscreen education"
        />
        <Marker
          coordinate={{ latitude: 21.3380, longitude: -157.7110 }}
          title="Koko Crater Botanical Garden"
          description="Dryland native plant conservation"
        />
        <Marker
          coordinate={{ latitude: 21.4995, longitude: -157.8375 }}
          title="Nuʻuanu Reservoir"
          description="Freshwater ecosystem and invasive species control"
        />
        <Marker
          coordinate={{ latitude: 21.3656, longitude: -157.7964 }}
          title="Makapuʻu Point"
          description="Whale watching and coastal trail preservation"
        />
        <Marker
          coordinate={{ latitude: 21.5865, longitude: -158.1032 }}
          title="James Campbell National Wildlife Refuge"
          description="Wetland bird habitat and endangered species protection"
        />
        <Marker
          coordinate={{ latitude: 21.4833, longitude: -157.9625 }}
          title="Palehua Forest"
          description="Rare native forest and climate resilience research"
        />
        <Marker
          coordinate={{ latitude: 21.3870, longitude: -157.9330 }}
          title="Pearl Harbor National Wildlife Refuge"
          description="Endangered waterbird habitat and mangrove removal"
        />
        <Marker
          coordinate={{ latitude: 21.3650, longitude: -157.7100 }}
          title="Sandy Beach"
          description="Wave energy education and shoreline safety"
        />
        <Marker
          coordinate={{ latitude: 21.4990, longitude: -157.8370 }}
          title="Lyon Arboretum"
          description="Native plant propagation and watershed research"
        />
        <Marker
          coordinate={{ latitude: 21.3150, longitude: -157.8580 }}
          title="Ala Moana Beach Park"
          description="Green infrastructure and stormwater filtration"
        />
        <Marker
          coordinate={{ latitude: 21.4760, longitude: -157.9600 }}
          title="Puʻu ʻUalakaʻa State Wayside"
          description="Scenic overlook with erosion control and native reforestation"
        />
        <Marker
          coordinate={{ latitude: 21.3330, longitude: -157.7110 }}
          title="Halona Blowhole"
          description="Tidepool ecology and marine safety education"
        />
      </MapView>
    </View>
  );
}