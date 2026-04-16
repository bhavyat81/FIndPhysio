import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0D9488',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: '#F8FAFC',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'FindPhysio',
            headerRight: undefined,
          }}
        />
        <Stack.Screen
          name="list"
          options={{
            title: 'Clinics Near You',
          }}
        />
        <Stack.Screen
          name="clinic/[id]"
          options={{
            title: 'Clinic Details',
          }}
        />
        <Stack.Screen
          name="featured"
          options={{
            title: 'Get Featured',
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: 'About FindPhysio',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
