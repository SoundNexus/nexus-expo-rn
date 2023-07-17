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
import QRCode from 'react-native-qrcode-svg';

export const BuyStack = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { value: app } = useAppContext();

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
          Buy Ticket
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white px-5 pt-4 pb-10 h-full"
      >
        <View className="pb-10 content-center items-center">
          <View className="w-[150px] h-[150px] rounded-full bg-[#F4F6FB] shadow">
            <Image
              source={require('../../assets/profile.jpg')}
              className="w-[150px] h-[150px] rounded-full"
            />
          </View>
          <View className="mt-4 mb-6">
            <View className="flex-row items-center justify-center">
              <Text
                className="text-[14px] text-[#757E9D]"
                
              >
                {app?.user?.services[0]?.scoped?.email}
              </Text>
              <Image
                source={require('../../assets/verified.png')}
                className="w-4 h-4 ml-1"
              />
            </View>
          </View>
          <Text className="mb-2 tracking-[2px] text-[#1C2237] text-sm font-medium">
            FLOW
          </Text>
          <Text className="text-[#757E9D] mb-6 text-sm">
            {'999.673662'}
          </Text>
          <Text className="mb-2 tracking-[2px] text-[#1C2237] text-sm font-medium">
            FUSD
          </Text>
          <Text className="text-[#757E9D] mb-6 text-sm">
            {'0'}
          </Text>
        </View>
        <View className="h-[96px] bg-white rounded-t-[16px] w-full relative flex flex-row justify-evenly items-center p-5">
          <>
            <TouchableHighlight
              className={cx('flex mx-auto rounded-[8px] px-15 bg-pink-500', {
                'bg-pink-500': loading,
              })}
              onPress={() => onBuyTicket()}
              activeOpacity={1}
              disabled={loading}
              underlayColor={'#eaeaea'}
            >
              <View className="rounded-[8px] overflow-hidden relative h-[56px] flex flex-row items-center justify-center px-10">
                <Text className="text-[16px] text-white mr-3">Use Wallet</Text>
                {loading && ( <ActivityIndicator /> )}
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              className={cx('flex mx-auto rounded-[8px] px-15 bg-blue-500', {
                'bg-blue-500': loading,
              })}
              onPress={() => onBuyTicket()}
              activeOpacity={1}
              disabled={loading}
              underlayColor={'#eaeaea'}
            >
              <View className="rounded-[8px] overflow-hidden relative h-[56px] flex flex-row items-center justify-center px-6">
                <Text className="text-[16px] text-white">Use Credit Card</Text>
                {loading && ( <ActivityIndicator /> )}
              </View>
            </TouchableHighlight>

            <View className="absolute bg-white w-full bottom-[-10px] h-[10px]"></View>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
