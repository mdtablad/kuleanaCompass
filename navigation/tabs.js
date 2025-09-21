import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CameraScreen from './screens/CameraScreen';
import MapScreen from './screens/MapScreen';
import TranslateScreen from './screens/TranslateScreen';
import CompassScreen from './screens/CompassScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Camera" component={CameraScreen}/>
            <Tab.Screen name="Map" component={MapScreen}/>
            <Tab.Screen name="Translate" component={TranslateScreen}/>
            <Tab.Screen name="Compass" component={CompassScreen}/>
        </Tab.Navigator>
    );
}

export default Tabs;