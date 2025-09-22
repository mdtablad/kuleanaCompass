import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import TranslateScreen from './screens/TranslateScreen';
import CompassScreen from './screens/CompassScreen';

import CustomTabBar from './customTabBar';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Camera" component={CameraScreen} options={{ tabBarStyle: { display: 'none' }, headerShown: false }} />
            <Tab.Screen name="Map" component={MapScreen} options={{ tabBarStyle: { display: 'none' }, headerShown: true  }} />
            <Tab.Screen name="Translate" component={TranslateScreen} options={{ tabBarStyle: { display: 'none' }, headerShown: true  }} />
            <Tab.Screen name="Compass" component={CompassScreen} options={{ tabBarStyle: { display: 'none' }, headerShown: false  }} />
        </Tab.Navigator>
    );
}

export default Tabs;