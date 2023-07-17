import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  TouchableHighlight,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as ImagePicker from 'expo-image-picker';

import { useScanContext } from '../../context/ScanContext';
import { useAppContext } from '../../context/AppContext';
import { Input, InputMode } from '../../components/input/input';
import PinataService from '../../api/pinata';

import "../../utils/flow/config";

import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import mintNft from '../../../flow/transactions/MintNft.cdc';

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
  const [message, setMessage] = useState('');
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
      const formData = new FormData();
      formData.append('file', result?.assets[0]);
      const metadata = JSON.stringify({
        name: 'any names for now',
      });
      formData.append('pinataMetadata', metadata);
      // const response = await PinataService.uploadImageToIPFS(formData);
      
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
    try {
      fcl.mutate({
        cadence: mintNft,
        args: () => [],
        limit: 999,
      }).then((res: any) => {
        console.log("🚀 ~ file: create.tsx:100 ~ onBuyTicket ~ res:", res)
        setMessage('Successfully created ticket');
      });
    } catch (error) {
      console.log("🚀 ~ file: create.tsx:108 ~ onBuyTicket ~ error:", error)
      setMessage('Successfully created ticket');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }

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

      <View className="h-auto w-full relative p-5 mb-10">
        {message && (
          <Text>{message}</Text>
        )}
        <TouchableHighlight
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
