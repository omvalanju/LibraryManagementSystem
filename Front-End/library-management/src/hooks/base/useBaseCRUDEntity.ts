import { useMutation, useQuery } from 'react-query';
import apiClient from '../../services/apiClient';
import ErrorType from '../../types/base/errorType';

const useBaseCRUDEntity = <T>(
  endpoint: string,
  createEndpoint: string = '',
  deleteEndpoint: string = '',
  updateEndpoint: string = '',
  enabled: boolean = true
) => {
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
  const createEntity = async (data: T) => {
    return (await apiClient.post(`${endpoint}/${createEndpoint}`, data)).data;
  };
  const deleteEntity = async (id: number) => {
    return (await apiClient.delete(`${endpoint}/${deleteEndpoint}/${id}`)).data;
  };
  const updateEntity = async (data: T) => {
    return (await apiClient.put(`${endpoint}/${updateEndpoint}`, data)).data;
  };
  const {
    mutateAsync: deleteFunction,
    isLoading: deleteFunctionLoading,
    error: deleteFunctionError,
  } = useMutation(deleteEntity);
  const {
    mutateAsync: createFunction,
    isLoading: createFunctionLoading,
    error: createFunctionError,
  } = useMutation(createEntity);
  const {
    mutateAsync: updateFunction,
    isLoading: updateFunctionLoading,
    error: updateFunctionError,
  } = useMutation(updateEntity);
  return {
    updateFunction,
    updateFunctionLoading,
    updateFunctionError,
    deleteFunctionLoading,
    deleteFunctionError,
    getListData,
    getListRefetch,
    getListisLoading,
    getListerror,
    deleteFunction,
    createFunction,
    createFunctionLoading,
    createFunctionError,
  };
};

export default useBaseCRUDEntity;
