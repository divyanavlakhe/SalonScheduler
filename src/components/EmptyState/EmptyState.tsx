import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📅</Text>

      <Text style={styles.title}>
        No Appointments
      </Text>

      <Text style={styles.subtitle}>
        There are no appointments scheduled.
      </Text>
    </View>
  );
};

export default React.memo(EmptyState);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },

  icon: {
    fontSize: 48,
  },

  title: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
});