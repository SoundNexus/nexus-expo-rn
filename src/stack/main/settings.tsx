import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
  RefreshControl,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAppContext } from '../../context/AppContext';

const { CKCameraManager } = NativeModules;

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

export const SettingsStack = () => {
  const [loading, setLoading] = useState(false);
  const { value } = useAppContext();

  return (
    <SafeAreaView className="relative bg-black">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-black h-full py-5"
        refreshControl={
          <RefreshControl
            refreshing={loading}
          />
        }
      >
        <Text className='text-white'> I'm at Settings</Text>
      </ScrollView>
      
    </SafeAreaView>
  );
};
