import React, { useEffect, useMemo, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Appointment } from '../../types';
import { useAppSelector } from '../../redux/hooks';
import { generateTimeSlots } from '../../utils/generateSlots';

interface MoveAppointmentModalProps {
    visible: boolean;
    appointment: Appointment | null;
    onClose: () => void;
    onSave: (stylistId: string, startTime: string) => void;
}

const MoveAppointmentModal = ({
    visible,
    appointment,
    onClose,
    onSave,
}: MoveAppointmentModalProps) => {
    const stylists = useAppSelector(
        state => state.scheduler.data.stylists,
    );

    const config = useAppSelector(
        state => state.scheduler.data.config,
    );

    const slots = useMemo(() => {
        return generateTimeSlots(
            config.shopOpenTime,
            config.shopCloseTime,
            config.slotInterval,
        );
    }, [config]);

    const [selectedStylist, setSelectedStylist] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    useEffect(() => {
        if (appointment) {
            setSelectedStylist(appointment.stylistId);
            setSelectedTime(appointment.start.substring(11, 16));
        }
    }, [appointment]);

    if (!appointment) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Move Appointment
                    </Text>

                    <Text style={styles.label}>Client</Text>

                    <Text style={styles.value}>
                        {appointment.clientName}
                    </Text>

                    <Text style={styles.label}>Stylist</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedStylist}
                            onValueChange={value =>
                                setSelectedStylist(value)
                            }>
                            {stylists.map(stylist => (
                                <Picker.Item
                                    key={stylist.id}
                                    label={stylist.name}
                                    value={stylist.id}
                                    color="#999999"
                                />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Time</Text>

                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedTime}
                            onValueChange={value =>
                                setSelectedTime(value)
                            }>
                            {slots.map(slot => (
                                <Picker.Item
                                    key={slot.id}
                                    label={slot.label}
                                    value={slot.value}
                                    color="#999999"
                                />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.cancelButton,
                            ]}
                            onPress={onClose}>
                            <Text style={styles.cancelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                styles.saveButton,
                            ]}
                            onPress={() =>
                                onSave(
                                    selectedStylist,
                                    selectedTime,
                                )
                            }>
                            <Text style={styles.saveText}>
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default React.memo(MoveAppointmentModal);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        paddingHorizontal: 14,
    },

    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: '#000'
    },

    label: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },

    value: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 6,
        color: '#000'
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginTop: 8,
        overflow: 'hidden',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },

    button: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },

    cancelButton: {
        backgroundColor: '#EEEEEE',
        marginRight: 8,
    },

    saveButton: {
        backgroundColor: '#7C3AED',
        marginLeft: 8,
    },

    cancelText: {
        color: '#333',
        fontWeight: '600',
    },

    saveText: {
        color: '#fff',
        fontWeight: '600',
    },
});