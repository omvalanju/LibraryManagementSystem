import UserEntityType from '../types/userEntityType';
import useBaseCRUDEntity from './base/useBaseCRUDEntity';

const useUserCRUDEntity = (enabled: boolean = true) => {
  const {
    getListData,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
    getListRefetch,
  } = useBaseCRUDEntity<UserEntityType>('people', '', '', '', enabled);

  return {
    getListData,
    getListRefetch,
    getListerror,
    getListisLoading,
    createFunction,
    createFunctionLoading,
  };
};

export default useUserCRUDEntity;
