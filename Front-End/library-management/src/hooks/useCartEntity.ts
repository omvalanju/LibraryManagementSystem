import { useMutation } from 'react-query';
import apiClient from '../services/apiClient';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import { useSelector } from 'react-redux';
import { AppStore } from '../store/store';
import CartItemEntity from '../types/cartItemEntity';

const useCartEntity = () => {
  const personId = useSelector(
    (state: AppStore) => state.loginSlice.people.peopleId
  );
  const { getListData, getListerror, getListisLoading, getListRefetch } =
    useBaseCRUDEntity<CartItemEntity>(`cart/${personId}`);
  const addToCartMethod = async ({
    userId,
    bookId,
    quantity,
  }: {
    userId: number;
    bookId: number;
    quantity: number;
  }) => {
    const response = await apiClient.post(
      `/cart/${userId}/add?bookId=${bookId}&quantity=${quantity}`
    );
    return response.data;
  };
  const updateCartItem = async ({
    userId,
    bookId,
  }: {
    userId: number;
    bookId: number;
  }) => {
    const response = await apiClient.post(`cart/update/${userId}/${bookId}`);
    return response.data;
  };
  const { mutateAsync: updateCartFunction, isLoading: updateCartIsLoading } =
    useMutation(updateCartItem);
  const {
    mutateAsync: addToCart,
    isLoading: addToCartLoading,
    error: addToCartError,
  } = useMutation(addToCartMethod);

  return {
    addToCart,
    addToCartLoading,
    addToCartError,
    getListData,
    getListerror,
    getListisLoading,
    updateCartFunction,
    updateCartIsLoading,
    getListRefetch,
  };
};

export default useCartEntity;
