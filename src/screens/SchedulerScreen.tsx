import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StatusBar, FlatList, ToastAndroid, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import StylistSection from '../components/StylistSection/StylistSection';
import AppointmentCard from '../components/AppointmentCard/AppointmentCard';
import EmptySlot from '../components/EmptySlot/EmptySlot';
import usePermission from '../hooks/usePermission';
import MoveAppointmentModal from '../components/MoveAppointmentModal/MoveAppointmentModal';
import { Appointment } from '../types';
import { checkAppointmentConflict } from '../utils/checkAppointmentConflict';
import { generateTimeSlots } from '../utils/generateSlots';
import { buildTimeline, TimelineItem, TimelineSection } from '../utils/buildTimeline';
import {
  moveAppointment,
  queueAction,
  setOffline,
  syncPendingActions,
} from '../redux/schedulerSlice';
import SchedulerHeader from '../components/SchedulerHeader/SchedulerHeader';
import EmptyState from '../components/EmptyState/EmptyState';
import LoadingView from '../components/LoadingView/LoadingView';

const SchedulerScreen = () => {

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const canMove = usePermission('appt.move');

  const dispatch = useAppDispatch();

  const {
    config,
    currentUser,
    stylists,
    appointments,
  } = useAppSelector(state => state.scheduler.data);

  const {
    isOffline,
    pendingActions,
  } = useAppSelector(state => state.scheduler);

  const slots = useMemo(() => {
    return generateTimeSlots(
      config.shopOpenTime,
      config.shopCloseTime,
      config.slotInterval,
    );
  }, [config]);

  const timeline = useMemo(() => {
    return buildTimeline(
      stylists,
      appointments,
      slots,
    );
  }, [stylists, appointments, slots]);

  const showToast = useCallback((message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }, []);

  const toggleOffline = useCallback(() => {
    if (isOffline) {
      dispatch(syncPendingActions());
      showToast('Pending changes synced successfully.');
    }
    else {
      showToast('Offline Mode Enabled');
    }
    dispatch(setOffline(!isOffline));
  }, [dispatch, isOffline,showToast]);

  const handleLongPress = useCallback(
    (appointment: Appointment) => {
      if (!canMove) return;
      setSelectedAppointment(appointment);
      setModalVisible(true);
    },
    [canMove],
  );

  const handleSave = useCallback(
    (stylistId: string, startTime: string) => {
      if (!selectedAppointment) {
        return;
      }

      const hasConflict = checkAppointmentConflict({
        appointments,
        appointmentId: selectedAppointment.id,
        stylistId,
        startTime,
      });

      if (hasConflict) {
        showToast('Conflict Detected: Slot already booked.')
        return;
      }

      dispatch(
        moveAppointment({
          appointmentId: selectedAppointment.id,
          stylistId,
          startTime,
        }),
      );

      if (isOffline) {
        dispatch(
          queueAction({
            id: Date.now().toString(),
            type: 'MOVE_APPOINTMENT',
            payload: {
              appointmentId: selectedAppointment.id,
              stylistId,
              startTime,
            },
          }),
        );
      }
      setModalVisible(false);
      setSelectedAppointment(null);
    },
    [
      appointments,
      dispatch,
      isOffline,
      selectedAppointment,
      showToast
    ],
  );

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedAppointment(null);
  }, []);

  const renderTimelineItem = useCallback(
    ({ item }: { item: TimelineItem }) =>
      item.appointment ? (
        <AppointmentCard
          appointment={item.appointment}
          onLongPress={handleLongPress}
        />
      ) : (
        <EmptySlot time={item.label} />
      ),
    [handleLongPress],
  );

  const renderSection = useCallback(
    ({ item: section }: { item: TimelineSection }) => (
      <View>
        <StylistSection title={section.title} />
        <FlatList
          data={section.data}
          scrollEnabled={false}
          keyExtractor={(item, index) => `${item.time}-${index}`}
          renderItem={renderTimelineItem}
        />
      </View>
    ),
    [renderTimelineItem],
  );


  if (loading) {
    return <LoadingView />;
  }

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView
        edges={['top']}
        style={styles.safeArea}>

        <View
          style={styles.container}>

          <SchedulerHeader
            isOffline={isOffline}
            user={currentUser.name}
            pendingCount={pendingActions.length}
            onToggle={toggleOffline}
          />

          <FlatList
            data={timeline}
            style={styles.list}
            removeClippedSubviews
            keyExtractor={(section) => section.id}
            ListEmptyComponent={<EmptyState />}
            renderItem={renderSection}
            initialNumToRender={10}
            windowSize={10}
            maxToRenderPerBatch={10}
          />

          <MoveAppointmentModal
            visible={modalVisible}
            appointment={selectedAppointment}
            onClose={closeModal}
            onSave={handleSave}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4F46E5',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  list: {
    marginTop: 38,
    marginBottom: 25,
  },
});

export default React.memo(SchedulerScreen);