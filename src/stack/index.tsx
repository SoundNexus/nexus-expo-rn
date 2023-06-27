import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginStack } from './auth/login';
import { HomeStack } from './main/home';
import { useAppContext } from '../context/AppContext';
import "../utils/flow/config";

import { SettingsStack } from './main/settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="home">
        {() => <HomeStack  />}
      </Tab.Screen>
      <Tab.Screen name="settings">
        {() => <SettingsStack  />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
