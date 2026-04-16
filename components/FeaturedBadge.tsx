import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

interface FeaturedBadgeProps {
  size?: 'sm' | 'md';
}

export default function FeaturedBadge({ size = 'md' }: FeaturedBadgeProps) {
  const isSmall = size === 'sm';
  return (
    <View style={[styles.badge, isSmall && styles.badgeSm]}>
      <Ionicons name="star" size={isSmall ? 9 : 11} color={Colors.white} />
      <Text style={[styles.text, isSmall && styles.textSm]}>FEATURED</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.featured,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    gap: 3,
  },
  badgeSm: {
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 2,
  },
  text: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  textSm: {
    fontSize: 10,
  },
});
