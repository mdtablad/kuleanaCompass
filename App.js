import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';

const { width } = Dimensions.get('window');
const baseWidth = 390; // Reference design width
const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default function KuleanaScreen() {
  return (
    <View style={styles.canvas}>
      
    
      <StatusBar barStyle="dark-content"/>
      
      {/* ==================================== */}
      {/* Nav Island (bar) */}
      <View style={styles.navIsland}>
        {/* Islands */}
        <View style={styles.rightMiniIsland} />
        <View style={styles.leftMiniIsland} />
        <View style={styles.centerIsland} />

        {/* Points */}
        <Text style={styles.pointsLabel}>0</Text>

        {/* Button Icons*/}
        <Image
          source={require('./assets/imgs/Ellipse_16_1.png')}
          style={styles.cameraIconBackground}
        />
        <Image
          source={require('./assets/imgs/Ellipse_16_3.png')}
          style={styles.mapIconBackground}
        />

        {/* Map Icon */}
        <View style={styles.mapIcon}>
          <View style={styles.mapIconPart1} />
          <View style={styles.mapIconPart2} />
          <View style={styles.mapIconPart3}>
            <Image
              source={require('./assets/imgs/Boolean_operation_24_27.png')}
              style={styles.mapIconPart4}
            />
          </View>
        </View>

        {/* Camera Icon */}
        <View style={styles.cameraIcon}>
          <Image
            source={require('./assets/imgs/Vector_24_36.png')}
            style={styles.cameraIconPart1}
          />
        </View>

        {/* Points Icon */}
        <Image
          source={require('./assets/imgs/Vector_39_12.png')}
          style={styles.pointsIcon}
        />

        {/* Translate Icon */}
        <View style={styles.translateIcon}>
          <Image
            source={require('./assets/imgs/Vector_39_24.png')}
            style={styles.translateIconPart1}
          />
          <View style={styles.translateIconPart2}>
            <Image
              source={require('./assets/imgs/Vector_39_18.png')}
              style={styles.translateIconPart3}
            />
          </View>
        </View>

        {/* Compass Icon */}
        <View style={styles.compassIcon}>
          <Image
            source={require('./assets/imgs/Ellipse_43_37.png')}
            style={styles.compassIconPart2}
          />
          {/* The group-41_44 and vector-41_45 are display: none in HTML, so not rendered */}
          <Image
            source={require('./assets/imgs/Vector_41_50.png')}
            style={styles.compassIconPart3}
          />
        </View>
      </View>
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
  navIsland: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(38, 147, 186, 1)',
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
  },
  
  /* -- Labels -- */
  pointsLabel: {
    position: 'absolute',
    left: scale(200),
    top: scale(649),
    width: scale(65),
    height: scale(36),
    fontSize: scale(22),
    fontFamily: 'Inter',
    fontWeight: '600',
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  /* -- Islands -- */
  rightMiniIsland: {
    position: 'absolute',
    left: scale(202),
    top: scale(705),
    width: scale(136),
    height: scale(65),
    borderRadius: scale(100),
    backgroundColor: 'rgba(196, 196, 196, 0.8)',
  },
  leftMiniIsland: {
    position: 'absolute',
    left: scale(53),
    top: scale(705),
    width: scale(132),
    height: scale(65),
    borderRadius: scale(100),
    backgroundColor: 'rgba(196, 196, 196, 0.8)',
  },
  centerIsland: {
    position: 'absolute',
    left: scale(111),
    top: scale(697),
    width: scale(165),
    height: scale(82),
    borderRadius: scale(100),
    backgroundColor: 'rgba(196, 196, 196, 0.9)',
  },

  /* -- Main Icon Backgrounds -- */
  cameraIconBackground: {
    position: 'absolute',
    left: scale(117),
    top: scale(702),
    width: scale(71),
    height: scale(71),
    resizeMode: 'stretch',
  },
  mapIconBackground: {
    position: 'absolute',
    left: scale(199),
    top: scale(702),
    width: scale(73),
    height: scale(71),
    resizeMode: 'stretch',
  },
  
  /* -- Map Icon -- */
  mapIcon: {
    position: 'absolute',
    left: '51.03%',
    top: '82.58%',
    width: '18.2%',
    height: '9.72%',
  },
  mapIconPart1: {
    position: 'absolute',
    left: '0%',
    top: '6.1%',
    width: '100%',
    height: '86.58%',
    borderRadius: scale(100),
    backgroundColor: 'rgba(118, 198, 238, 0.5)',
  },
  mapIconPart2: {
    position: 'absolute',
    left: '0%',
    top: '6.1%',
    width: '100%',
    height: '86.58%',
  },
  mapIconPart3: {
    position: 'absolute',
    left: scale(14.63),
    top: scale(19.21),
    width: scale(41.73),
    height: scale(41.72),
  },
  mapIconPart4: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },

  /* -- Camera Icon -- */
  cameraIcon: {
    position: 'absolute',
    left: '30%',
    top: '82.58%',
    width: '18.21%',
    height: '9.72%',
    overflow: 'hidden',
  },
  cameraIconPart1: {
    position: 'absolute',
    left: '-2.07%',
    top: '4.43%',
    width: '104.14%',
    height: '90.17%',
    resizeMode: 'stretch',
  },

  /* -- Points Icon -- */
  pointsIcon: {
    position: 'absolute',
    left: '43.59%',
    top: '77.37%',
    width: '5.9%',
    height: '3.79%',
    resizeMode: 'stretch',
  },

  /* -- Translate Icon -- */
  translateIcon: {
    position: 'absolute',
    left: '17.18%',
    top: '84.83%',
    width: '11.28%',
    height: '5.22%',
    overflow: 'hidden',
  },
  translateIconPart1: {
    position: 'absolute',
    left: '12.5%',
    top: '8.33%',
    width: '75%',
    height: '83.34%',
    resizeMode: 'stretch',
  },
  translateIconPart2: {
    position: 'absolute',
    left: '20.45%',
    top: '9.09%',
    width: '54.55%',
    height: '54.55%',
    overflow: 'hidden',
  },
  translateIconPart3: {
    position: 'absolute',
    left: '12.5%',
    top: '16.67%',
    width: '85%',
    height: '79.16%',
    resizeMode: 'stretch',
  },

  /* -- Compass Icon -- */
  compassIcon: {
    position: 'absolute',
    left: '68.46%',
    top: '83.18%',
    width: '18.21%',
    height: '8.41%',
  },
  compassIconPart2: {
    position: 'absolute',
    left: scale(16),
    top: scale(18),
    width: scale(39),
    height: scale(36),
    resizeMode: 'stretch',
  },
  compassIconPart3: {
    position: 'absolute',
    left: '20.83%',
    top: '20.83%',
    width: '58.34%',
    height: '58.34%',
    resizeMode: 'stretch',
  },
});
