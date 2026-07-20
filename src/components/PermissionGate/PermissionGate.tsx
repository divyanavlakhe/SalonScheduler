import React from 'react';
import { View } from 'react-native';
import usePermission from '../../hooks/usePermission';
import { Permission } from '../../types';

interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGate = ({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) => {
  const hasPermission = usePermission(permission);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <View>{children}</View>;
};

export default React.memo(PermissionGate);