import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './navigation/RootStack';
import ProductScreen from './screens/ProductScreen';
import { store, persistor } from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <SafeAreaProvider>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootStack />
            </GestureHandlerRootView>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
