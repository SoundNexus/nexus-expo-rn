import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Dimensions, Platform, Image, TouchableHighlight } from 'react-native';
import { useAppContext } from '../../context/AppContext';

const windowWidth = Dimensions.get('window').width;

export const HeaderLogo = () => {
  const { value: app, dispatch: appDispatch } = useAppContext();
  const navigation = useNavigation();

  const onCreate = () => {
    appDispatch({
      type: 'app.update',
      payload: { currentStack: 'home.create' },
    });
    navigation.navigate('home.create')
  };

  return (
    <View className='flex flex-row bg-white justify-between py-1 px-8'>
      <View className='flex justify-center'>
        <Image
          source={require('../../assets/logo.png')}
          className="w-[200px] h-auto justify-center mx-auto"
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