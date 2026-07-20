import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  time: string;
}

const EmptySlot = ({ time }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>

      <View style={styles.slotContainer}>
        <Text style={styles.empty}>Available</Text>
      </View>
    </View>
  );
};

export default React.memo(EmptySlot);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 4,
  },

  timeContainer: {
    width: 80,
  },

  time: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },

  slotContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },

  empty: {
    color: '#9E9E9E',
    fontSize: 12,
  },
});