import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from './screens/Listing';
import DetailScreen from './screens/Details';
import SearchScreen from './screens/Search';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: true}} name="Listing" component={ListScreen} />
      <Stack.Screen options={{headerShown: true}} name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{headerShown: false}} name="Home" component={HomeStack} />
        <Tab.Screen options={{
          tabBarLabel: '搜尋',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="account" color={color} size={size} />
          // ),
        }} 
        name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;