import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Appointment } from '../../types';
import Images from '../../constants/Images';

interface Props {
  appointment: Appointment;
  onLongPress: (appointment: Appointment) => void;
  isPending?: boolean;
}

const AppointmentCard = ({
  appointment,
  onLongPress,
  isPending = false,
}: Props) => {
  const statusColor = () => {
    switch (appointment.status) {
      case 'confirmed':
        return '#2E7D32';

      case 'pending':
        return '#F57C00';

      default:
        return '#D32F2F';
    }
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => onLongPress(appointment)}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.row}>
            <View style={styles.iconView}>
              <Image
                source={Images.ic_clock}
                style={styles.avatar}
                resizeMode='contain'
                tintColor={'#7C3AED'}
              />
            </View>
            <View>
              <Text style={styles.time}>
                {formatTime(appointment.start)} -{' '}
                {formatTime(appointment.end)}
              </Text>

              <Text style={styles.client}>
                {appointment.clientName}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusColor(),
                },
              ]}>
              <Text style={styles.statusText}>
                {appointment.status.toUpperCase()}
              </Text>
            </View>

            {isPending && (
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>
                  Pending Sync
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AppointmentCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#7C3AED',
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  iconView: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e9e3e3',
  },

  avatar: {
    width: 16,
    height: 16,
  },

  time: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },

  client: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '600',
  },
  
  pendingBadge: {
    marginTop: 6,
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  pendingText: {
    fontSize: 10,
    color: '#856404',
    fontWeight: '600',
  },
});