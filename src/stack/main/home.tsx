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
import { sampleEvents } from '../../constants/constants';

const windowHeight = Dimensions.get('window').height;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

const data = [
  { id: 0, eventName: 'Top of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', price: '$100', totalSupply: 100, minted: 57, description: 'The Fighters. After Funny Bones began to disappear, the Agency of the Meaty Bones formed as a defense against all threats.'},
  { id: 1, eventName: 'Shit of the World', creatorName: 'Se', coverImage: '../../assets/sample-cover.png', price: '$100', totalSupply: 500, minted: 157, description: 'The Fighters. After Funny Bones began to disappear, the Agency of the Meaty Bones formed as a defense against all threats.'}
] as Event[];

export const HomeStack = () => {
  const [loading, setLoading] = useState(false);
  const { value: app, dispatch: appDispatch } = useAppContext();
  const navigation = useNavigation();

  const onNavigate = (item: any) => {
    appDispatch({
      type: 'app.update',
      payload: { currentStack: 'home.preview' },
    });
    navigation.navigate('home.preview', item)
  }

  useEffect(() => {
    appDispatch({
      type: 'app.update',
      payload: { events: sampleEvents },
    });
  },[appDispatch])

  return (
    <SafeAreaView className="relative bg-white">
      <View className="bg-[#E5E4E2] h-full py-5 px-4 content-center">
        <FlatList 
          data={app.events}
          refreshing={loading}
          keyExtractor={(_, index) => index.toString()}
          renderItem={( item ) => (
            <Pressable onPress={() => onNavigate(item) }>
              <View className='overflow-hidden rounded-[10px] border border-[#DDE0ED] mb-4'>
                <Image source={require('../../assets/sample-cover2.jpg')} className='max-w-[390px] max-h-[550px] h-[550px] mx-auto' />
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
