import useBaseCRUDEntity from './base/useBaseCRUDEntity';
import PublisherEntityType from '../types/publisherEntityType';

const usePublisherCRUDEntity = () => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getListRefetch,
    deleteFunction,
    deleteFunctionLoading,
    updateFunction,
    updateFunctionLoading,
  } = useBaseCRUDEntity<PublisherEntityType>(
    'publishers',
    'create',
    'deleteById',
    'update'
  );
  return {
    getListRefetch,
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    deleteFunction,
    deleteFunctionLoading,
    updateFunction,
    updateFunctionLoading,
  };
};

export default usePublisherCRUDEntity;
