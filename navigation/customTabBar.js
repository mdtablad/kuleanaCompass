    import { BottomTabBar } from '@react-navigation/bottom-tabs';
    import React from 'react';
    import { View, Text } from 'react-native'; // Import necessary components

    function CustomTabBar() {
      return (
        <View>
          {/* Your non-clickable element */}
          <View >
            <Text>This is a non-clickable element!</Text>
          </View>
          {/* The default BottomTabBar */}
          <BottomTabBar/>
        </View>
      );
    }

    export default CustomTabBar;