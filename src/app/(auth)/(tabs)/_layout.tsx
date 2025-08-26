import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme.web';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(clinic)"
        
        options={{
          title: 'Citas',
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="med.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(registered)"
        options={{
          title: 'Radicados',
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="clip.board" color={color} />,
        }}
      
      />
      <Tabs.Screen
      name='(settings)'
      options={{
        title: 'Configuraciones',
        tabBarIcon : ({ color }) => <IconSymbol size={22} name='rog.fill' color={color} />,
      }}
      />
    </Tabs>
  );
}
