import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';

import { StreamChat } from 'stream-chat';
import { OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

const API_KEY = 'k5dt9vpgquyu';
const client = StreamChat.getInstance(API_KEY);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const connectUser = async () => {
    try {
      const user = await client.connectUser(
        {
          id: 'fiyi',
          name: 'Fiyi',
          image: 'https://randomuser.me/api/portraits/men/80.jpg',
        },
        client.devToken('fiyi')
      );
      setIsReady(true);
      // console.log('User => ', user);
    } catch (error) {
      console.log(error);
    }

    // const channel = client.channel('team', 'general', { name: 'General' });

    // await channel.create();
  };

  useEffect(() => {
    connectUser();
  }, []);

  const onChannelSelect = (channel: any) => {
    setSelectedChannel(channel);
  };

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider overlayOpacity={{ value: 1 }}>
          <Chat client={client}>
            {!selectedChannel ? (
              <ChannelList onSelect={onChannelSelect} />
            ) : (
              <>
                <Channel channel={selectedChannel}>
                  <Text
                    style={{
                      marginTop: 70,
                      paddingHorizontal: 20,
                    }}
                    onPress={() => setSelectedChannel(null)}
                  >
                    go back
                  </Text>
                  <MessageList />
                  <MessageInput />
                </Channel>
              </>
            )}
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
