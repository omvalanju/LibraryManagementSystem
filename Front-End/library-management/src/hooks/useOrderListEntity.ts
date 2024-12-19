import apiClient from '../services/apiClient';
import OrderEntity from '../types/orderEntity';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import { useMutation } from 'react-query';

const useOrderListEntity = () => {
  const { getListData, getListerror, getListisLoading, getListRefetch } =
    useBaseCRUDEntity<OrderEntity>('cart/all');
  const borrowFunction = async (data: OrderEntity) => {
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));

    const reqData = {
      peopleId: data.peopleId,
      books: data.cartItems.map(
        (m) =>
          new Object({
            bookId: m.bookId,
            borrowDate: m.borrowDate ?? new Date().toISOString().split('T')[0],
            dueDate: m.dueDate ?? nextMonth.toISOString().split('T')[0],
          })
      ),
    };
    await apiClient.post('/borrow-records/borrow', reqData);
  };
  const {
    mutateAsync: borrowingFunction,
    isLoading: borrowingFunctionLoading,
    error: borrowingFunctionError,
  } = useMutation(borrowFunction);
  return {
    getListData,
    getListerror,
    getListisLoading,
    borrowingFunction,
    borrowingFunctionLoading,
    borrowingFunctionError,
    getListRefetch,
  };
};

export default useOrderListEntity;
