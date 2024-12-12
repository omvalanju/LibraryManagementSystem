import BorrowedBookType from '../types/borrowedBookType';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';

const useBorrowedBookEntity = (clientID: number) => {
  const { getListData, getListerror, getListisLoading } =
    useBaseCRUDEntity<BorrowedBookType>(
      'borrow-records/user-books/' + clientID
    );
  return { getListData, getListerror, getListisLoading };
};

export default useBorrowedBookEntity;
