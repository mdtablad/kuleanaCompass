export default {
  expo: {
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    extra: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
    plugins: [
      "expo-font",
      "expo-router",
      "expo-web-browser"
    ],
  },
};