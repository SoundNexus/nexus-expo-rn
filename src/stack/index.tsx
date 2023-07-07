import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginStack } from './auth/login';
import { HomeStack } from './main/home';
import { useAppContext } from '../context/AppContext';
import "../utils/flow/config";

import { SettingsStack } from './main/settings';
import { PreviewStack } from './main/preview';
import { ProfileStack } from './main/profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Stack.Navigator 
    initialRouteName='home.main'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="home.main">
      {() => <HomeStack />}
    </Stack.Screen>
    <Stack.Screen name="home.preview">
      {(props) => <PreviewStack {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
)

const ProfileNavigator = () => (
  <Stack.Navigator 
    initialRouteName='profile.main'
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="profile.main">
      {() => <ProfileStack />}
    </Stack.Screen>
    <Stack.Screen name="profile.settings">
      {() => <SettingsStack />}
    </Stack.Screen>
  </Stack.Navigator>
)

export const MainStack = () => {
  const { isAuthorized } = useAppContext();
  
  // NOTE: Should be !isAuthorized but for testing purposes
  if (!isAuthorized) {
    return (
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="login">
          {() => <LoginStack />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen 
        name='home'
        component={HomeNavigator}
      />
      <Tab.Screen 
        name='profile' 
        component={ProfileNavigator} 
      />
    </Tab.Navigator>
  );
};
