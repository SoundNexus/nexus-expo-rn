import React, { useEffect, useMemo, useState } from 'react';
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
  FlatList,
  Pressable,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

import "../../utils/flow/config";

import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import getAccountNFt from '../../../flow/scripts/GetAccountNFT.cdc';

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

const data = [
  { id: 0, eventName: 'Top of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', price: '$100', totalSupply: 100, minted: 57, description: 'The Fighters. After Funny Bones began to disappear, the Agency of the Meaty Bones formed as a defense against all threats.'},
  { id: 1, eventName: 'Shit of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', price: '$100', totalSupply: 500, minted: 157, description: 'The Fighters. After Funny Bones began to disappear, the Agency of the Meaty Bones formed as a defense against all threats.'}
]

export const ProfileStack = () => {
  const [loading, setLoading] = useState(false);
  const { value: app, dispatch: appDispatch } = useAppContext();
  const navigation = useNavigation();

  const onNavigate = (item: any) => {
    appDispatch({
      type: 'app.update',
      payload: { currentStack: 'profile.preview' },
    });
    navigation.navigate('profile.preview', item)
  }

  const onNavigateToSettings = () => {
    appDispatch({
      type: 'app.update',
      payload: { currentStack: 'profile.settings' },
    });
    navigation.navigate('profile.settings')
  }

  useEffect(() => {
    getNFTs();
    getProfile();

  },[]);

  const getNFTs = async() => {
    try {
      const nfts = await fcl
      .query({
        cadence: getAccountNFt,
      })
      console.log("🚀 ~ file: profile.tsx:69 ~ getNFTs ~ nfts:", nfts)
    } catch (error) {
      console.log("🚀 ~ file: profile.tsx:72 ~ getProfile ~ error:", error)
    }
  }

  const getProfile = async() => {
    try {
      const profile = await fcl
      .query({
        cadence: `
          import Profile from ${app.user?.addr}

          pub fun main(address: Address): Profile.ReadOnly? {
            return Profile.read(address)
          }
        `,
        args: (args: any, t: any) => [args(app.user?.addr, t.Address)],
      })
      console.log("🚀 ~ file: profile.tsx:87 ~ getProfile ~ profile:", profile)
    } catch (error) {
      console.log("🚀 ~ file: profile.tsx:91 ~ getProfile ~ error:", error)
      
    }
  }

  return (
    <SafeAreaView className="relative bg-white">
      <View className="flex flex-row self-start px-5 py-1">
        <View className="w-[100px] h-[100px] rounded-full bg-[#F4F6FB] shadow">
          <Image
            source={require('../../assets/webmint-mascot.png')}
            className="w-[100px] h-[100px]"
          />
        </View>
        <View className="flex flex-col items-left justify-center gap-3 ml-5 content-center">
          <Text className="text-[#757E9D]" >
            { app?.user?.services[0]?.scoped?.email }
          </Text>
          <TouchableHighlight
            // onPress={() => copyText(app?.user?.addr as string)}
            activeOpacity={1}
            underlayColor={'#DDDDDD'}
            className="rounded-[4px] bg-[#F4F6FB]"
          >
            <View className="px-2 py-1 rounded-[4px] w-auto flex flex-row items-center gap-x-2">
              <Text className="text-[#757E9D] text-xs">{ app?.user?.addr }</Text>
              <Image
                source={require('../../assets/copy.png')}
                className="w-[14px] h-[14px]"
              />
            </View>
          </TouchableHighlight>
        </View>
        <View className="w-[50px] h-[50px] rounded-full bg-[#F4F6FB] shadow justify-end">
          <TouchableHighlight className='justify-end' onPress={() => onNavigateToSettings()}>
            <Image
              source={require('../../assets/settings.png')}
              className="w-[30px] h-[30px]"
            />
          </TouchableHighlight>
        </View>
      </View>
      <View className="bg-[#E5E4E2] h-full py-5 px-4 content-center">
        <FlatList 
          data={app?.events}
          refreshing={loading}
          keyExtractor={(_, index) => index.toString()}
          renderItem={( item ) => (
            <Pressable onPress={() => onNavigate(item) }>
              <View className='overflow-hidden rounded-[10px] border border-[#DDE0ED] mb-4'>
                <Image source={require('../../assets/sample-cover.png')} className='max-w-[390px] h-auto justify-center mx-auto' />
              </View>
              <View className='flex flex-row justify-between mb-5'>
                <View>
                  <Text className=' text-2xl font-bold text-black'>
                    {item.item.eventName}
                  </Text>
                  <Text className=' text-lg font-bold text-black'>
                    {item.item.creatorName}
                  </Text>
                </View>
                <View className='flex justify-start'>
                  <Text className='text-2xl font-bold text-black'>
                    {item?.item?.minted + '/' + item?.item?.totalSupply}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

        {/* <TouchableHighlight
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
      </ScrollView> */}