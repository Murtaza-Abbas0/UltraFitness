import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootStack from './navigation/RootStack';
import ProductScreen from './screens/ProductScreen';
import { store, persistor } from './redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import FlashMessage from "react-native-flash-message";
import { StripeProvider } from '@stripe/stripe-react-native';
import SpinnerLoader from './components/spinnerLoader';


export default function App() {

  const myLocalFlashMessage = useRef(null)

  return (
    <StripeProvider
      publishableKey="pk_test_51Lu2eNG7d6LAhtrknXabAfTeJIhWjf3diLSSLCJ6eKksP7f5JBPfioMB8nPHqDZv9CVeeAkNACezvu8r1tqbMwPt00NSPkCsoV"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Provider store={store}> 
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <SafeAreaProvider>
            <PaperProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <RootStack />
                <FlashMessage ref={myLocalFlashMessage} />
                <SpinnerLoader />
              </GestureHandlerRootView>
            </PaperProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
}
