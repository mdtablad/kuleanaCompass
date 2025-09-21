import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const baseWidth = 390; // Reference design width

export default function CameraScreen([navigation]) {
  return (
    <View style={styles.canvas}>
        <Text style={styles.mainLabel}>Camera</Text>
    </View>
  );
}

const scale = (v) => (width / baseWidth) * v;

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },

  mainLabel: {
    color: 'white',
  }
});