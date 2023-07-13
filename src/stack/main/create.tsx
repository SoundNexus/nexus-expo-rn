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
import { Input } from '../../components/input/input';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);


export const CreateStack = () => {
  const [loading, setLoading] = useState(false);
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
          Create Ticket
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white px-5 pt-4 pb-10 h-full"
      >
        <View className="pb-10">
          <Input />
        </View>
      </ScrollView>

      <View className="h-[96px] bg-white rounded-t-[16px] w-full relative flex flex-row justify-evenly items-center p-5">
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
      </View>
    </SafeAreaView>
  );
};
