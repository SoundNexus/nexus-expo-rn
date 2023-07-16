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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);


export const ScanResultStack = ({ }) => {
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

  const onGenerateQR = async () => {
    console.log('Generating QR code')
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
          Result
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="bg-white px-5 pt-4 pb-10 h-full"
      >
        <View className="pb-10">
          <View className="overflow-hidden rounded-[10px] border border-[#DDE0ED]">
            <Image
              source={require('../../assets/sample-cover.png')}
              className='max-w-[390px] max-h-[390px] h-auto justify-center mx-auto'
            />
          </View>
          <View className="mt-4 mb-6">
            <Text
              className="text-[24px] mx-auto font-medium"
              >
              Ticket has been scanned
            </Text>
            <Text
              className="text-[24px] mx-auto font-medium"
              >
              User may now enter
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
