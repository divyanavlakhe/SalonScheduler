import { useAppSelector } from '../redux/hooks';
import { Permission } from '../types';

const usePermission = (permission: Permission) => {
  const permissions = useAppSelector(
    state => state.scheduler.data.currentUser.permissions,
  );

  return permissions.includes(permission);
};

export default usePermission;