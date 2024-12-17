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
    getListRefetch,
    deleteFunction,
    deleteFunctionLoading,
  } = useBaseCRUDEntity<BookEntityType>('books', 'create', '', '', enabled);
  const getSearchedData = async (keyword: string) =>
    await apiClient.get<BookEntityType[]>(
      'http://localhost:8080/api/books/search?keyword=' + keyword
    );
  const updateEntity = async (data: BookEntityType) => {
    return (await apiClient.put(`books/${data.bookId}`, data)).data;
  };
  const { mutateAsync: updateFunction, isLoading: updateFunctionLoading } =
    useMutation(updateEntity);
  const mutate = useMutation(getSearchedData);
  return {
    getListData,
    getListRefetch,
    updateFunction,
    updateFunctionLoading,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getSearchedBooks: mutate.mutateAsync,
    getSearchedBooksLoading: mutate.isLoading,
    deleteFunction,
    deleteFunctionLoading,
  };
};

export default useBookCRUDEntity;
