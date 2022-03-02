import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, Theme, DeepPartial } from 'stream-chat-expo';
import AuthContext from './src/context/AuthContext';

const API_KEY = 'k5dt9vpgquyu';
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    // this is done when component mounts

    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContext>
          <OverlayProvider overlayOpacity={{ value: 1 }}>
            <Chat client={client}>
              <Navigation colorScheme={'dark'} />
            </Chat>
          </OverlayProvider>
        </AuthContext>
        <StatusBar style="light" />
      </SafeAreaProvider>
    );
  }
}
