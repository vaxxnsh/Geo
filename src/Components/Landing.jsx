import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Attendance from './Attendance'
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../Pages/Home'
import TabHomeNew from './TabHomeNew'


const TabStack = createBottomTabNavigator()

export default function Landing() {
  return (
              <TabStack.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
        
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Live') {
                    iconName = focused ? 'map' : 'map-outline';  // Icon for "Live"
                  } else if (route.name === 'Attendance') {
                    iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';  // Icon for "Attendance"
                  }
        
                  // Return the icon component with the chosen iconName
                  return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200EE',  // Active icon color
                tabBarInactiveTintColor: 'gray',   // Inactive icon color
              })}
            >
            <TabStack.Screen name='Home' component={TabHomeNew} options={{ headerShown: false }}/>
            <TabStack.Screen name='Live' component={Home} options={{ headerShown: false }}/>
            <TabStack.Screen name='Attendance' component={Attendance} options={{ headerShown: false }} />
        </TabStack.Navigator>

  )
}
