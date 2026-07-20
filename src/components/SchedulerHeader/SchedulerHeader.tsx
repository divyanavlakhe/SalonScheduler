import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../constants/Images';

interface Props {
  isOffline: boolean;
  user: string,
  pendingCount: number;
  onToggle: () => void;
}

const SchedulerHeader = ({
  isOffline,
  user,
  pendingCount,
  onToggle,
}: Props) => {
  return (
    <LinearGradient
      colors={['#7C3AED', '#4F46E5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}>

      <View style={styles.topRow}>
        <View style={styles.logoContainer}>
          <Image
            source={Images.ic_women}
            style={styles.logo}
            resizeMode='contain'
          />

          <View>
            <Text style={styles.title}>Salon Scheduler</Text>

            <Text style={styles.subtitle}>
              Manage • Schedule • Grow
            </Text>

            <Text
              style={styles.pendingAction}>
              Pending Actions : {pendingCount}
            </Text>
          </View>
        </View>
      </View>


      <LinearGradient
        colors={['#7C3AED', '#4F46E5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}>


        <View style={styles.leftSection}>
          <Image
            source={Images.ic_user}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.name}>{user}</Text>
            <View style={styles.onlineBadge}>
              <View style={[styles.greenDot, { backgroundColor: isOffline ? '#E53935' : '#43A047', }]} />

              <Text style={[styles.onlineText, { color: isOffline ? '#E53935' : '#43A047', }]}>{isOffline ? 'Offline' : 'Online'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSection}>
          <Text style={styles.availableText}>
            {isOffline ? 'Offline Mode' : 'Online Mode'}
          </Text>

          <Switch
            value={isOffline}
            onValueChange={onToggle}
            trackColor={{
              false: '#C4B5FD',
              true: '#7C3AED',
            }}
            thumbColor="#FFFFFF"
            accessibilityRole="switch"
          />

          <Text style={styles.acceptText}>
            {
              isOffline
                ? "Appointments will sync later"
                : "Accepting new appointments"
            }
          </Text>
        </View>

      </LinearGradient>
    </LinearGradient>
  );
};

export default React.memo(SchedulerHeader);

const styles = StyleSheet.create({
  header: {
    height: 120,
    paddingHorizontal: 12,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 32,
    height: 32,
    marginTop: 7,
    marginRight: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 10,
    color: '#E9D5FF',
  },

  pendingAction: {
    fontSize: 12,
    color: '#E9D5FF',
  },

  profileCard: {
    marginTop: 5,
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#FFF',

  },

  leftSection: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },

  onlineBadge: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 4,
  },

  onlineText: {
    color: '#22C55E',
    fontWeight: '600',
    fontSize: 10,
  },

  userInfo: {
    marginLeft: 14
  },

  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E7EB',
    opacity: 0.25,
    marginHorizontal: 20,
  },

  rightSection: {
    flex: 1,
    alignItems: 'flex-start'
  },

  availableText: {
    color: '#FFF',
    fontSize: 11,
  },

  acceptText: {
    marginTop: 5,
    color: '#E9D5FF',
    fontSize: 8,
    lineHeight: 10,
  },
});