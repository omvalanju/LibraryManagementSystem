import { useQuery } from 'react-query';
import apiClient from '../../services/apiClient';
import ErrorType from '../../types/base/errorType';

const useBaseCRUDEntity = <T>(endpoint: string, enabled: boolean = true) => {
  const getList = async () => (await apiClient.get<T[]>(endpoint)).data;
  const {
    data: getListData,
    isLoading: getListisLoading,
    error: getListerror,
  } = useQuery<T[], ErrorType>(['getList', endpoint], getList, {
    staleTime: 10000,
    cacheTime: 15000,
    retry: 2,
    enabled,
  });
  return {
    getListData,
    getListisLoading,
    getListerror,
  };
};

export default useBaseCRUDEntity;
