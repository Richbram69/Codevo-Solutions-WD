'use client';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = 'user-id';
// const token = 'authentication-token';
// const user = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', 'my-first-call');
// call.join({ create: true });

export const StreamVideoProvider = ({children}) => {
    const [videoClient, setVideoClient] = useState();
    const {user, isLoaded} = useUser();
    // console.log('object,', user)
    useEffect(() => {
        if(!isLoaded || !user) return;
        if(!apiKey) throw new Error('Missing Stream API key');
        const client = new StreamVideoClient({ apiKey, user:{
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
        },
        tokenProvider,
     });
        setVideoClient(client);
    }, [user, isLoaded])

    if (!videoClient) {
        return <Loader/>;
    }
    
  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};