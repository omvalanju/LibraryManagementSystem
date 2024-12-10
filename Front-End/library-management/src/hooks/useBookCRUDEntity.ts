import BookEntityType from '../types/bookEntityType';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';

const useBookCRUDEntity = () => {
  const { getListData, getListerror, getListisLoading } =
    useBaseCRUDEntity<BookEntityType>('books');
  return { getListData, getListerror, getListisLoading };
};

export default useBookCRUDEntity;
