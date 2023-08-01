import { useQuery } from '@tanstack/react-query';
import ms from 'ms';
import publishers from '../data/platforms';
import APIClient from '../services/api-client';
import Publisher from '../entities/Publisher';

const apiClient = new APIClient<Publisher>(
  '/publishers'
);

const usePublishers = () =>
  useQuery({
    queryKey: ['publishers'],
    queryFn: apiClient.getAll,
    staleTime: ms('24h'),
    // initialData: publishers,
  });

export default usePublishers;