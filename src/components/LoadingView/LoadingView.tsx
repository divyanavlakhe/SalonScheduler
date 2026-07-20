import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

const LoadingView = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />

      <Text
        style={{
          marginTop: 15,
          color: '#666',
        }}>
        Loading Schedule...
      </Text>
    </View>
  );
};

export default React.memo(LoadingView);