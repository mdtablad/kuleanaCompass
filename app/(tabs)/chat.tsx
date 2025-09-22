import React, { useState } from 'react';
import { Text, TextInput, Button, View, Image, ActivityIndicator, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from '@expo-google-fonts/roboto/useFonts';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { getGeminiTextWithImage } from '@/lib/geminiClients'; // Update function name

export default function Index() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].base64 || null);
    }
  };

  const handleAskGemini = async () => {
    setLoading(true);
    const result = await getGeminiTextWithImage(prompt, image);
    setResponse(result);
    setLoading(false);
  };

  if (!fontsLoaded) {
    return <Text style={{ color: 'white' }}>Loading fonts...</Text>;
  }

  

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-[#f9f9f9] p-20">
        
        {loading ? (
          <ActivityIndicator color="white" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView>
            <Text className='color-black mt-20 font-roboto-regular'>
              {response}
            </Text>
          </ScrollView>
        )}
        {image && (
            <Image
              source={{ uri: `data:image/jpeg;base64,${image}` }}
              style={{ width: 200, height: 200, marginVertical: 10 }}
            />
          )}
       
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View 
              className='flex flex-row justify-center top-8'
            >
              <TouchableOpacity onPress={pickImage}> 
                <Image source={require('@/assets/images/more.png')} tintColor={ '#27476E'} className='size-8 mt-7 mr-5 '/>
              </TouchableOpacity>

              <TextInput
                placeholder="Type your prompt here"
                placeholderTextColor="#888"
                value={prompt}
                onChangeText={setPrompt}
                className='bg-[#E9ECEF] p-4 font-roboto-regular border-0 color-black rounded-[25px] text-[0.75rem] items-center w-[75%] h-12 mt-5'
              />
              <TouchableOpacity 
                onPress={handleAskGemini} 
                disabled={loading || !prompt.trim()} 
              > 
                <Image source={require('@/assets/images/send.png')} tintColor={ '#27476E'} className=' size-24 ml-5 pb-2' resizeMode="contain"/>
              </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    
      </SafeAreaView>
    </SafeAreaProvider>
  );
}