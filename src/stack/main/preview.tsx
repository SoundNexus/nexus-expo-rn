import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Dimensions,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import cx from 'classnames';
import { useScanContext } from '../../context/ScanContext';
import { useAppContext } from '../../context/AppContext';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);

const buttonWidth = windowWidth / 2 - 20;

export const PreviewStack = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const {item} = route.params;
  console.log("🚀 ~ file: preview.tsx:32 ~ PreviewStack ~ item:", item)
  const navigation = useNavigation();
  const { value: app } = useAppContext();
  const { value: scan } = useScanContext();

  const onBack = () => {
    navigation.goBack();
  };

  const onBuyTicket = async () => {
    setLoading(true);
  };

  return (
    <SafeAreaView className="relative bg-white h-full">
      <View className="flex flex-row justify-between items-center bg-white p-5">
        <TouchableHighlight
          className="w-10 h-10 rounded-full bg-[#DBDBDB] flex items-center justify-center"
          activeOpacity={1}
          underlayColor={'#D1D1D1'}
          onPress={() => onBack()}
        >
          <Image
            source={require('../../assets/arrow-left.png')}
            className="h-6 w-6"
          />
        </TouchableHighlight>
        <Text className="text-[20px]">
          Preview
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white px-5 pt-4 pb-10 h-full"
      >
        <View className="pb-10">
          <View className="overflow-hidden rounded-[24px] shadow border border-[#DDE0ED]">
            <Image
              source={require('../../assets/sample-cover.png')}
              className='max-w-[390px] max-h-[390px] h-auto justify-center mx-auto'
            />
          </View>
          <View className="mt-4 mb-6">
            {!!item?.creatorName && (
              <View className="flex-row items-center justify-center">
                <Text
                  className="text-[14px] text-[#757E9D]"
                  
                >
                  {item?.creatorName}
                </Text>
                <Image
                  source={require('../../assets/verified.png')}
                  className="w-4 h-4 ml-1"
                />
              </View>
            )}
            <Text
              className="text-[24px] mx-auto font-medium"
              >
              {item?.eventName}
            </Text>
          </View>
          <Text className="mb-2 tracking-[2px] text-[#1C2237] text-sm font-medium">
            DESCRIPTION
          </Text>
          <Text className="text-[#757E9D] mb-6 text-sm">
            {item?.description}
          </Text>
        </View>
      </ScrollView>

      <View className="h-[96px] shadow bg-white rounded-t-[16px] w-full relative flex flex-row justify-evenly items-center p-5">
        <View className='flex mx-auto'>
          <Text>Price</Text>
          <Text>{item?.price}</Text>
        </View>
        <View className='flex mx-auto'>
          <Text>Quantity</Text>
          <Text>{item?.minted + '/' + item?.totalSupply}</Text>
        </View>
        <TouchableHighlight
          className={cx('flex mx-auto rounded-[8px]', {
            'bg-[#DFDFDF]': loading,
          })}
          onPress={() => onBuyTicket()}
          activeOpacity={1}
          disabled={loading}
          underlayColor={'#eaeaea'}
        >
          <View className="rounded-[8px] overflow-hidden relative h-[56px] flex flex-row items-center justify-center">
            <Text className="text-[16px] text-[#1c2237] mr-3">Buy Ticket</Text>
            {loading && ( <ActivityIndicator /> )}
          </View>
        </TouchableHighlight>

        <View className="absolute bg-white w-full bottom-[-10px] h-[10px]"></View>
      </View>
    </SafeAreaView>
  );
};
