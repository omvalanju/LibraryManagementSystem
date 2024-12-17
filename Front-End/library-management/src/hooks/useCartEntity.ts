import { useMutation } from 'react-query';
import apiClient from '../services/apiClient';
import { useSelector } from 'react-redux';
import { AppStore } from '../store/store';
import CartItemEntity from '../types/cartItemEntity';

const useCartEntity = () => {
  const personId = useSelector(
    (state: AppStore) => state.loginSlice.people.peopleId
  );

  const addMultiple = async (data: CartItemEntity[]) => {
    const response = await apiClient.post(
      `/cart/${personId}/addMultiple`,
      data
    );
    return response.data;
  };

  const {
    mutateAsync: addMultipleFunction,
    isLoading: addMultipleIsLoading,
    isError: addMultipleIsError,
    error: addMultipleError,
  } = useMutation(addMultiple);

  return {
    addMultipleFunction,
    addMultipleIsLoading,
    addMultipleIsError,
    addMultipleError,
  };
};

export default useCartEntity;
