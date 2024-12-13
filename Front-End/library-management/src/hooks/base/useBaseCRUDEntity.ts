import { useMutation, useQuery } from 'react-query';
import apiClient from '../../services/apiClient';
import ErrorType from '../../types/base/errorType';

const useBaseCRUDEntity = <T>(endpoint: string, enabled: boolean = true) => {
  const getList = async () => (await apiClient.get<T[]>(endpoint)).data;
  const {
    data: getListData,
    isLoading: getListisLoading,
    error: getListerror,
    refetch: getListRefetch,
  } = useQuery<T[], ErrorType>(['getList', endpoint], getList, {
    staleTime: 10000,
    cacheTime: 15000,
    retry: 2,
    enabled,
  });
  const deleteEntity = async (deleteEndpoint: string) => {
    return (await apiClient.delete(endpoint + deleteEndpoint)).data;
  };
  const {
    mutateAsync: deleteFunction,
    isLoading: addToCartLoading,
    error: addToCartError,
  } = useMutation(deleteEntity);
  return {
    getListData,
    getListRefetch,
    getListisLoading,
    getListerror,
    deleteFunction,
    addToCartLoading,
    addToCartError,
  };
};

export default useBaseCRUDEntity;
