import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { changeIcon } from 'react-native-change-icon';

const ICONS = [
  {
    key: 'Guitar',
    label: 'Guitar',
    image: require('../assets/guitar.png'),
  },
  {
    key: 'Piano',
    label: 'Piano',
    image: require('../assets/piano.png'),
  },
  {
    key: 'Violin',
    label: 'Violin',
    image: require('../assets/violin.png'),
  },
  {
    key: 'Drum',
    label: 'Drum',
    image: require('../assets/drum.png'),
  },
];

const DynamicIconChange = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const onSelectIcon = async (iconKey: string) => {
    try {
      setSelected(iconKey);
      await changeIcon(iconKey);
    } catch (e) {
      Alert.alert('Error', 'Failed to change app icon');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose App Icon</Text>
      <Text style={styles.subtitle}>
        Customize how the app appears on your home screen
      </Text>

      <View style={styles.row}>
        {ICONS.map(icon => {
          const isActive = selected === icon.key;

          return (
            <Pressable
              key={icon.key}
              onPress={() => onSelectIcon(icon.key)}
              style={[styles.card, isActive && styles.activeCard]}
            >
              <Image source={icon.image} style={styles.icon} />
              <Text style={styles.label}>{icon.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default DynamicIconChange;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#A1A1AA',
    marginBottom: 32,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#18181B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272A',
  },
  activeCard: {
    borderColor: '#6366F1',
    backgroundColor: '#1F1F2F',
  },
  icon: {
    width: 72,
    height: 72,
    marginBottom: 12,
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
