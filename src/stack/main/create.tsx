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
  Button,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as ImagePicker from 'expo-image-picker';

import { useScanContext } from '../../context/ScanContext';
import { useAppContext } from '../../context/AppContext';
import { Input, InputMode } from '../../components/input/input';
import PinataService from '../../api/pinata';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);


interface SubmitProps {
  eventName: string;
  ticketName: string;
  description: string;
  image?: string;
}
export const CreateStack = () => {
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [eventName, setEventName] = useState('');
  const [ticketName, setTicketName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [quantity, setQuantity] = useState('');
  console.log("🚀 ~ file: create.tsx:45 ~ CreateStack ~ quantity:", quantity)
  const navigation = useNavigation();
  const { value: app } = useAppContext();
  const { value: scan } = useScanContext();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    setUploadLoading(true)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    try {
      const { response } = await PinataService.uploadImageToIPFS(result?.assets[0]?.uri);
      console.log("🚀 ~ file: create.tsx:69 ~ pickImage ~ result?.assets[0]:", result?.assets[0])
      console.log("🚀 ~ file: create.tsx:68 ~ pickImage ~ response:", response)
      
    } catch (error: any) {
      console.log("🚀 ~ file: create.tsx:72 ~ pickImage ~ error:", error)
      
    } finally {
      setUploadLoading
    }

    
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onBuyTicket = async () => {
    const submitItems: SubmitProps = {
      eventName,
      ticketName,
      description: eventDesc,
    }
    console.log("🚀 ~ file: create.tsx:55 ~ onBuyTicket ~ submitItems:", submitItems)
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
          <Input 
            label='Event Name' 
            placeholder='G event' 
            onTextChange={setEventName} 
            inputMode={InputMode.Text}
            value={eventName} />
        </View>
        <View className="pb-10">
          <Input 
            label='Ticket Name' 
            placeholder='G event' 
            onTextChange={setTicketName} 
            inputMode={InputMode.Text}
            value={ticketName} />
        </View>
        <View className="pb-10">
          <Input 
            label='Description' 
            placeholder='An event description' 
            onTextChange={setEventDesc} 
            textarea={true} 
            inputMode={InputMode.Text}
            value={eventDesc} />
        </View>
        <View className="pb-10">
          <Input 
            label='Quantity' 
            placeholder='500' 
            onTextChange={setQuantity} 
            textarea={true} 
            inputMode={InputMode.Number}
            value={quantity} />
        </View>
        <View className="pb-10">
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </ScrollView>

      <View className="h-[56px] bg-white rounded-t-[16px] w-full relative flex flex-row justify-evenly items-center p-5 mb-10">
        <TouchableHighlight
          className="rounded-[8px] p-4 border border-[#DDE0ED] bg-white w-full"
          onPress={() => onBuyTicket()}
          activeOpacity={1}
          disabled={loading}
          underlayColor={'#eaeaea'}
        >
          <View className="rounded-[8px] overflow-hidden relative h-[56px] flex flex-row items-center justify-center">
            <Text className="text-[16px] text-[#1c2237] mr-3">Create Ticket</Text>
            {loading && ( <ActivityIndicator /> )}
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};
