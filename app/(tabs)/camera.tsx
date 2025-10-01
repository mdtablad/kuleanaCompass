import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { useRef, useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as FileSystem from 'expo-file-system/legacy';
import { getGeminiTextWithImage } from '@/lib/geminiClients';
import "@/app/globals.css";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [base, setBase] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [shouldProcessImage, setShouldProcessImage] = useState(false);



  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    //console.log(photo)
    if (photo?.uri) {
      setUri(photo.uri);

      const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: 'base64',
      });

      setPrompt("What is this picture showing? (limit one word, No need to explain just identify)");
      setLoading(true);
      const result = await getGeminiTextWithImage(prompt, base64Image);
      setResponse(result);
      setLoading(false);
    };
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = (uri: string) => {
    return (
      <View>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={{ width: 1000, aspectRatio: 1 }}
        />
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={ref}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />
        <View style={styles.shutterContainer}>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.shutterBtnInner,
                    {
                      backgroundColor: "white",
                    },
                  ]}
                />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing} style={styles.facingToggle}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? (
        <>
          {renderPicture(uri)}
          {loading ? (
            <ActivityIndicator color="white" style={{ marginTop: 20 }} />
          ) : (
            
              <Text className='color-white mt-20 text-[20px] font-roboto-bold z-10 absolute top-0 text-center w-[60vw]'>
                {response}
              </Text>
            
          )}
          <Pressable onPress={() => setUri(null)} 
            className='z-10 absolute top-0 left-0 mt-20 ml-4'  
          >
            {/* <Text
              className="color-white mt-20 text-[20px] font-roboto-bold"
            ></Text> */}
            <Ionicons name="arrow-back-circle" color="white" size={28} />
          </Pressable>
        </>
      ) : renderCamera()}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: StyleSheet.absoluteFillObject,
  camera: StyleSheet.absoluteFillObject,
  shutterContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    bottom: 0,
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
    facingToggle: {
    position: "absolute",
    bottom: 25,
    right: 0,
    marginRight: 50
  },
});