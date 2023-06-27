import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import "../../utils/flow/config";

import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { useAppContext } from '../../context/AppContext';

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

export const LoginStack = () => {
  const { value: app, dispatch: appDispatch } = useAppContext();
  
  useEffect(() => fcl.currentUser.subscribe(setBloctoUser), [])
  
  const setBloctoUser = (user: Partial<any>) => {
    try {
      if (user.loggedIn) {
        console.log("🚀 ~ file: login.tsx:36 ~ setBloctoUser ~ user.loggedIn:", user.loggedIn)
        appDispatch({
          type: 'app.update',
          payload: {
            user,
          },
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: login.tsx:44 ~ setBloctoUser ~ error:", error)
    } finally {
      console.log("WHAT THE FUCK")
      console.log("🚀 ~ file: login.tsx:29 ~ LoginStack ~ app:", app)
      appDispatch({
        type: 'app.update',
        payload: {
          loading: false,
        },
      });
    }
    
  }

  return (
    <SafeAreaView className="bg-black">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-black h-full relative p-5"
      >
        <Image
          source={require('../../assets/logo.png')}
          className="w-[250px] h-auto mt-60 justify-center mx-auto"
        />
        <View
          style={{ height: windowHeight - (64 + statusBarHeight + 50) }}
          className="flex flex-col pb-[54px] mt-10"
        >
          <View className="flex items-center">
            <Text
              className="text-[36px] font-semibold mb-3 text-white"
            >
              Welcome
            </Text>
            <Text
              className="text-[16px] mb-10 text-white"
            >
              Login to your account
            </Text>
          </View>


          <TouchableHighlight
            className="rounded-[8px] p-4 border border-[#DDE0ED] bg-white"
            activeOpacity={1}
            underlayColor={'#DDDDDD'}
          >
            <View className="flex flex-row items-center justify-center gap-4">
              {/* <Text
                className="text-[16px] font-normal text-center text-[#1C2237]"
              >
                Login via email
              </Text> */}
              {app.loading ? (
                <View className="bg-white h-full relative p-5 flex items-center justify-center">
                  <ActivityIndicator />
                  <Text className="mt-2">Please wait..</Text>
                </View>
              ) : (
                <fcl.ServiceDiscovery fcl={fcl} />
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View className="absolute -top-5 -right-5">
          {/* <Image
            source={require('../../assets/background.png')}
            className="w-[249px] h-[420px]"
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
