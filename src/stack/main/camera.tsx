import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAppContext } from '../../context/AppContext';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useScanContext } from '../../context/ScanContext';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const statusBarHeight: number =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : getStatusBarHeight(true);
const imageSize = width - 40;

export const CameraStack = () => {
  const [scanning, setScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { dispatch: appDispatch } = useAppContext();
  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("🚀 ~ file: camera.tsx:36 ~ getBarCodeScannerPermissions ~ status:", status)
      if (status === 'granted') setHasPermission(true)
    };

    getBarCodeScannerPermissions();
  }, []);

  
  const handleBarCodeScanned = ({ type, data }: any) => {
    try {
      console.log("🚀 ~ file: camera.tsx:48 ~ handleBarCodeScanned ~ data:", data)
      console.log("🚀 ~ file: camera.tsx:48 ~ handleBarCodeScanned ~ type:", type)

      appDispatch({
        type: 'app.update',
        payload: { currentStack: 'scanner.result' },
      });

      navigation.navigate('scanner.result')
      setScanned(true);
    } catch (error) {
      
    } finally {
      setScanning(false);
    }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View className="flex-1 bg-black relative">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={BarCodeScanner.Constants.BarCodeType.qr}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        className="absolute top-10 left-0 items-center flex-row w-full justify-between px-5"
        style={{ elevation: 10 }}
      >
        <Image
          source={require('../../assets/logo.png')}
          className="w-[86px] h-6"
        />

        <TouchableHighlight
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          activeOpacity={1}
          underlayColor={'#D1D1D1'}
        >
          <Image
            source={require('../../assets/exit.png')}
            className="h-6 w-6"
          />
        </TouchableHighlight>
      </View>
      <View
        className="absolute left-0 px-5"
        style={{ top: height / 2 - (imageSize / 2 + statusBarHeight) }}
      >
        <View
          className="border border-white rounded-[16px]"
          style={{ width: imageSize, height: imageSize }}
        />
        <View
          className="flex-row items-center justify-center py-3 px-5 mt-[26px] self-center rounded-[8px]"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <Image
            source={require('../../assets/scan.png')}
            className="w-5 h-5 mr-2.5"
          />
          <Text
            className="text-white text-[16px]"
          >
            {!scanned
              ? 'Scanning QR Code...'
              : <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </Text>
        </View>
      </View>
    </View>
  );
};

