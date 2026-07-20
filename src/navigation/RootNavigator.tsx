import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SchedulerScreen from '../screens/SchedulerScreen';

export type RootStackParamList = {
  Scheduler: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Scheduler"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Scheduler"
          component={SchedulerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;