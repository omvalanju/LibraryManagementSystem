import { useMutation } from 'react-query';
import BookEntityType from '../types/bookEntityType';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import apiClient from '../services/apiClient';

const useBookCRUDEntity = (enabled: boolean = true) => {
  const { getListData, getListerror, getListisLoading } =
    useBaseCRUDEntity<BookEntityType>('books', '', '', '', enabled);
  const getSearchedData = async (keyword: string) =>
    await apiClient.get<BookEntityType[]>(
      'http://localhost:8080/api/books/search?keyword=' + keyword
    );
  //
  const mutate = useMutation(getSearchedData);
  return {
    getListData,
    getListerror,
    getListisLoading,
    getSearchedBooks: mutate.mutateAsync,
    getSearchedBooksLoading: mutate.isLoading,
  };
};

export default useBookCRUDEntity;
