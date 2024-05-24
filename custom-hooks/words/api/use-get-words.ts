import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { WordDetailInterface } from '@/helpers/interfaces';

export const useGetWords = () => {
  const query = useQuery({
    queryKey: ['words'],
    queryFn: async () => {
      const response = await client.api.words.$get();

      if (!response.ok) {
        throw new Error('failed to fetch words');
      }

      const { data } = await response.json();
      return data as WordDetailInterface[];
    },
  });

  return query;
};
