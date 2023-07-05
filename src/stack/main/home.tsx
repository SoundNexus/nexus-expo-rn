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
  FlatList,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useAppContext } from '../../context/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

const musicData = [
  { id: 0, eventName: 'Top of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', totalSupply: 100, minted: 57},
  { id: 1, eventName: 'Shit of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', totalSupply: 500, minted: 157}
]

export const HomeStack = () => {
  const [loading, setLoading] = useState(false);
  const { value: app } = useAppContext();
  console.log("🚀 ~ file: home.tsx:29 ~ HomeStack ~ app:", app)

  const copyText = (value: string) => {
    Clipboard.setString(value);
  };

  return (
    <SafeAreaView className="relative bg-white">
      <View className="flex flex-row self-start px-5 py-8">
        <View className="w-[100px] h-[100px] rounded-full bg-[#F4F6FB] shadow">
          <Image
            source={require('../../assets/webmint-mascot.png')}
            className="w-[100px] h-[100px]"
          />
        </View>
        <View className="flex flex-col items-left justify-center gap-3 ml-5 content-center">
          <Text className="text-[#757E9D]" style={{ fontFamily: 'Rubik' }}>
            {'email@email.com'}
          </Text>
          <TouchableHighlight
            onPress={() => copyText(app?.user?.addr as string)}
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
      </View>
      <View className="bg-[#E5E4E2] h-full py-5 px-8 content-center">
        <FlatList 
          data={musicData}
          refreshing={loading}
          keyExtractor={(_, index) => index.toString()}
          renderItem={( item ) => (
            <View>
              <View className='flex flex-row justify-between my-8'>
                <Image source={require('../../assets/sample-cover.png')} className='max-w-[390px] max-h-[390px] h-auto justify-center mx-auto' />
              </View>
              <View className='flex flex-row justify-between'>
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
            </View>
          )}
        />
      </View>
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-black h-full py-8 px-10 content-center"
        refreshControl={
          <RefreshControl
            refreshing={loading}
          />
        }
      >
        <View className='flex flex-row justify-between my-8 bg-[#282828]'>
          <Image source={require('../../assets/sample-cover.png')} className='max-w-[390px] max-h-[390px] h-auto justify-center mx-auto'></Image>
        </View>
        <View className='flex justify-center'>
          <Text className=' text-2xl font-bold text-white text-center'>
            {'Track Name'}
          </Text>
          <Text className=' text-lg font-bold text-white text-center'>
            {'Artist Name'}
          </Text>
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};
