import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export const useGetWords = () => {
  const query = useQuery({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await client.api.words.$get();
      console.log(response);

      //   With hono you have to take care of errors yourself (unlike Axios that will throw error)

      if (!response.ok) {
        throw new Error('failed to fetch words');
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};

// with the type safety we ensured here, there is no chance for spelling mistakes and api errors
