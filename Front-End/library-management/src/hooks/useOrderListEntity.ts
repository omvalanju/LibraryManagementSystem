import OrderEntity from '../types/orderEntity';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';

const useOrderListEntity = () => {
  const { getListData, getListerror, getListisLoading } =
    useBaseCRUDEntity<OrderEntity>('cart/all');
  return { getListData, getListerror, getListisLoading };
};

export default useOrderListEntity;
