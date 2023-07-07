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
import "../../utils/flow/config";

import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { useNavigation } from '@react-navigation/native';

const { CKCameraManager } = NativeModules;

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

export const ProfileStack = () => {
  const [loading, setLoading] = useState(false);
  const { value } = useAppContext();
  const navigation = useNavigation();

  const onNavigate = () => {
    navigation.navigate('profile.settings');
  }

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
        <Text className='text-white'> I'm at Profile Page</Text>
        <TouchableHighlight
            className="rounded-[8px] p-4 border border-[#DDE0ED] bg-white"
            activeOpacity={1}
            underlayColor={'#DDDDDD'}
            onPress={() => onNavigate()}
          >
            <View className="flex flex-row items-center justify-center gap-4">
              <Text
                className="text-[16px] font-normal text-center text-[#1C2237]"
              >
                Settings
              </Text>
            </View>
          </TouchableHighlight>
      </ScrollView>
      
    </SafeAreaView>
  );
};
