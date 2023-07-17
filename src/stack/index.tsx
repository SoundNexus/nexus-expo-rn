import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LoginStack } from './auth/login';
import { HomeStack } from './main/home';
import { useAppContext } from '../context/AppContext';
import "../utils/flow/config";

import { SettingsStack } from './main/settings';
import { PreviewStack } from './main/preview';
import { ProfileStack } from './main/profile';
import { CameraStack } from './main/camera';
import { HeaderLogo } from '../components/header/header';
import { CreateStack } from './main/create';
import { ScanResultStack } from './main/scan-result';
import { BuyStack } from './main/buy';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <Stack.Navigator 
    initialRouteName='home.main'
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen 
      name="home.main" 
      options={{
        header: () => <HeaderLogo />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {() => <HomeStack />}
    </Stack.Screen>
    <Stack.Screen name="home.preview"
    options={{headerShown: false}}>
      {(props) => <PreviewStack {...props} />}
    </Stack.Screen>
    <Stack.Screen name="home.buy"
    options={{headerShown: false}}>
      {() => <BuyStack />}
    </Stack.Screen>
    <Stack.Screen name="home.create"
    options={{headerShown: false}}>
      {() => <CreateStack />}
    </Stack.Screen>
  </Stack.Navigator>
)

const ScannerNavigator = () => (
  <Stack.Navigator 
    initialRouteName='scanner.main'
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen 
      name="scanner.main" 
      options={{headerShown: false}}>
      {() => <CameraStack />}
    </Stack.Screen>
    <Stack.Screen name="scanner.result"
    options={{headerShown: false}}>
      {() => <ScanResultStack />}
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
    <Stack.Screen name="profile.preview">
      {(props) => <PreviewStack {...props} />}
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
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name='scanner'
        component={ScannerNavigator}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-scan" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name='profile' 
        component={ProfileNavigator} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
