import { Text, View, Button, StyleSheet, StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './src/stack';
import { BuilderProviders } from './src/context/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    }
  }
});

const CustomStatusBar = ({ backgroundColor }: { backgroundColor: string }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />
    </View>
  );
};

function App(): JSX.Element { 
  return (
    <BuilderProviders>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <CustomStatusBar backgroundColor="black" />
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </BuilderProviders>
  );
}

export default App;
