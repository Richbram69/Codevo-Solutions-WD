"use server"

import { currentUser } from "@clerk/nextjs";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// console.log(apiKey)
const apiSecret = process.env.STREAM_SECRET_KEY;
// console.log(apiSecret)
import { StreamClient } from '@stream-io/node-sdk';

// client = new StreamClient(apiKey, secret, { timeout: 3000 });
export const tokenProvider = async () => {
    const user = await currentUser();
    if(!user) throw new Error('User not logged in');
    if(!apiKey) throw new Error('No API KEY');
    if(!apiSecret) throw new Error('No API Secret');

    const client = new StreamClient(apiKey, apiSecret);
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000)-60;
    const token = client.createToken(user.id, exp, issued);
    return token;
}