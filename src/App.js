import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from './screens/Listing';
import DetailScreen from './screens/Details';
import SearchScreen from './screens/Search';

// import './locales/index';
// import {useTranslation} from 'react-i18next';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const {t} = useTranslation();

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
        <Tab.Screen options={{headerShown: false}} name="主頁" component={HomeStack} />
        <Tab.Screen name="搜尋" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;