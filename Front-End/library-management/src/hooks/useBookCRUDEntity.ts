import { useMutation } from 'react-query';
import BookEntityType from '../types/bookEntityType';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import apiClient from '../services/apiClient';

const useBookCRUDEntity = (enabled: boolean = true) => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    updateFunction,
    updateFunctionLoading,
    getListRefetch,
  } = useBaseCRUDEntity<BookEntityType>('books', 'create', '', '', enabled);
  const getSearchedData = async (keyword: string) =>
    await apiClient.get<BookEntityType[]>(
      'http://localhost:8080/api/books/search?keyword=' + keyword
    );
  //
  const mutate = useMutation(getSearchedData);
  return {
    getListData,
    getListRefetch,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getSearchedBooks: mutate.mutateAsync,
    getSearchedBooksLoading: mutate.isLoading,
  };
};

export default useBookCRUDEntity;
