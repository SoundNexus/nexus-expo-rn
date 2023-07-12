import React from 'react';
import { View, StyleSheet, Dimensions, Platform, Image, TouchableHighlight } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const HeaderLogo = () => {

  const onCreate = () => {
    
  };

  return (
    <View className='flex flex-row bg-white justify-between py-5 px-8'>
      <View className='flex justify-center'>
        <Image
          source={require('../../assets/logo.png')}
          className="w-[250px] h-auto justify-center mx-auto"
        />
      </View>

      <TouchableHighlight className='flex justify-center' onPress={() => onCreate()}>
        <Image
          source={require('../../assets/plus-icon.png')}
          className="justify-center h-[30px] w-[30px]"
        />
      </TouchableHighlight>
    </View>
  );
};