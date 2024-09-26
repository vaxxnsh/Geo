import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabHome from './TabHome'
import Live from './Live'
import Attendance from './Attendance'
import Map from './Maps'


const TabStack = createBottomTabNavigator()

export default function Landing() {
  return (
    
        <TabStack.Navigator>
            <TabStack.Screen name='Home' component={TabHome}/>
            <TabStack.Screen name='Live' component={Map}/>
            <TabStack.Screen name='Attendance' component={Attendance}/>
        </TabStack.Navigator>

  )
}
