import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCall = () => {
  const { user } = useUser(); // Retrieve authenticated user from Clerk
  const client = useStreamVideoClient(); // Retrieve Stream Video SDK client
  const [calls, setCalls] = useState(); // State to store fetched calls
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return; // Exit early if client or user ID is not available
      
      setIsLoading(true); // Set loading state to true

      try {
        // Query calls using Stream Video SDK
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }], // Sort calls by start time descending
          filter_conditions: {
            starts_at: { $exists: true }, // Filter for calls with defined start time
            $or: [
              { created_by_user_id: user.id }, // Calls created by the current user
              { members: { $in: [user.id] } }, // Calls where the current user is a member
            ],
          },
        });

        setCalls(calls); // Update calls state with the fetched calls
      } catch (error) {
        console.error(error); // Log any errors that occur during the query
      } finally {
        setIsLoading(false); // Set loading state back to false after query completion
      }
    };

    loadCalls(); // Invoke the loadCalls function when client or user ID changes
  }, [client, user?.id]); // Depend on client and user ID for the effect

  const now = new Date(); // Get the current date and time

  // Filter calls to find ended calls based on start and end times
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  // Filter calls to find upcoming calls based on start time
  const upcomingCalls = calls?.filter(({ state: { startsAt } }) => {
    return startsAt && new Date(startsAt) > now;
  });

  // Return endedCalls, upcomingCalls, callRecordings (all calls), and isLoading state
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
