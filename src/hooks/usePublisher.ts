import usePublishers from './usePublishers';

const usePublisher = (id?: number) => {
  const { data: publishers } = usePublishers();
  return publishers?.results.find((p) => p.id === id);
};

export default usePublisher;