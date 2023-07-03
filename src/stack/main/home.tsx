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

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

const musicData = [
  { id: 0, trackName: 'Top of the World', artistName: 'Se', coverImage: '../../assets/sample-cover.png'},
  { id: 1, trackName: 'Top of the World', artistName: 'Se', coverImage: '../../assets/sample-cover.png'}
]

export const HomeStack = () => {
  const [loading, setLoading] = useState(false);
  const { value: app } = useAppContext();
  console.log("🚀 ~ file: home.tsx:29 ~ HomeStack ~ app:", app)

  return (
    <SafeAreaView className="relative bg-black">
      <View className="bg-black h-full py-8 px-10 content-center">
      <FlatList 
        data={musicData}
        refreshing={loading}
        pagingEnabled={true}
        keyExtractor={(_, index) => index.toString()}
        renderItem={( item ) => (
          <View style={{ height: windowHeight}}>
            <View className='flex flex-row justify-between my-8 bg-[#282828]'>
              <Image source={require('../../assets/sample-cover.png')} className='max-w-[390px] max-h-[390px] h-auto justify-center mx-auto' />
            </View>
            <View className='flex justify-center'>
              <Text className=' text-2xl font-bold text-white text-center'>
                {item.item.trackName}
              </Text>
              <Text className=' text-lg font-bold text-white text-center'>
                {item.item.artistName}
              </Text>
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
