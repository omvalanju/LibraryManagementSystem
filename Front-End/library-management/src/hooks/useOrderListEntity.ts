import { useSelector } from 'react-redux';
import apiClient from '../services/apiClient';
import OrderEntity from '../types/orderEntity';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import { AppStore } from '../store/store';
import { useMutation } from 'react-query';

const useOrderListEntity = () => {
  const { getListData, getListerror, getListisLoading, getListRefetch } =
    useBaseCRUDEntity<OrderEntity>('cart/all');
  const personId = useSelector(
    (state: AppStore) => state.loginSlice.people.peopleId
  );
  const borrowFunction = async (data: OrderEntity) => {
    const reqData = {
      peopleId: personId,
      books: data.cartItems.map(
        (m) =>
          new Object({
            bookId: m.bookId,
            borrowDate: m.borrowDate,
            dueDate: m.dueDate,
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
