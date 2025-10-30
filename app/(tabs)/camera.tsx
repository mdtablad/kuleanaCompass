import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { useRef, useState, useEffect } from "react";
import { Button, Pressable, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Image } from "expo-image";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as FileSystem from 'expo-file-system/legacy';
//import { getGeminiTextWithImage } from '@/lib/geminiClients';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import "@/app/globals.css";

// Read the API key from Expo config `extra` (injected at build/runtime via app.config.js or app.json)
const API_KEY =
  (Constants.expoConfig?.extra as any)?.geminiApiKey ||
  (Constants.manifest?.extra as any)?.geminiApiKey ||
  null;

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

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
  const [followUp, setFollowUp] = useState('');
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

      // Save base64 for possible follow-ups
      setBase(base64Image);

      const initialPrompt = "What is this picture showing using 3 words limit? (limit three word no more, No need to explain just identify)";
      setPrompt(initialPrompt);
      setLoading(true);
      // Pass the literal prompt (not the state `prompt`) to avoid stale state
      const result = await getGeminiTextWithImage(initialPrompt, base64Image);
      setResponse(result);
      setLoading(false);
    }
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

  const getGeminiTextWithImage = async (
    promptText: string,
    base64Image: string
  ): Promise<string> => {
    if (!API_KEY || !genAI) {
      console.warn('GEMINI_API_KEY not set or Gemini client not initialized. Cannot call Gemini API.');
      return 'Gemini API key missing.';
    }

    try {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const contents = [
        {
          inlineData: {
            mimeType: 'image/jpeg', // Or 'image/png' if that's the format
            data: base64Image,
          },
        },
        { text: promptText },
      ];
      
      const result = await model.generateContent(contents);
      // `result.response` may be a promise-like or object depending on SDK
      const resp = await result.response;
      // `resp.text()` may be a function that returns a string or a Promise<string>
      if (typeof resp?.text === 'function') {
        return await resp.text();
      }

      // Fallback: stringify whatever we got
      return String(resp ?? '');
    } catch (error) {
      console.error('Error in getGeminiTextWithImage:', error);
      return 'Error generating response from Gemini.';
    }
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
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>{response}</Text>

                {/* Follow-up input */}
                <View style={styles.followUpRow}>
                  <TextInput
                    value={followUp}
                    onChangeText={setFollowUp}
                    placeholder="Ask more about the image..."
                    placeholderTextColor="#ddd"
                    style={styles.followUpInput}
                    returnKeyType="send"
                    onSubmitEditing={async () => {
                      if (!followUp) return;
                      setLoading(true);
                      const answer = await getGeminiTextWithImage(followUp, base || '');
                      // Append follow-up answer to existing response
                      setResponse((prev) => prev + '\n\nFollow-up: ' + answer);
                      setFollowUp('');
                      setLoading(false);
                    }}
                  />
                  <Pressable
                    onPress={async () => {
                      if (!followUp) return;
                      setLoading(true);
                      const answer = await getGeminiTextWithImage(followUp, base || '');
                      setResponse((prev) => prev + '\n\nFollow-up: ' + answer);
                      setFollowUp('');
                      setLoading(false);
                    }}
                    style={styles.askButton}
                  >
                    <Text style={styles.askButtonText}>Ask</Text>
                  </Pressable>
                </View>
              </View>
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
  responseContainer: {
    position: 'absolute',
    top: 60,
    width: '80%',
    alignSelf: 'center',
    zIndex: 10,
  },
  responseText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  followUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  followUpInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  askButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  askButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});