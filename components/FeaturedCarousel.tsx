import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Clinic } from '@/data/clinics';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

interface FeaturedCarouselProps {
  clinics: Clinic[];
}

export default function FeaturedCarousel({ clinics }: FeaturedCarouselProps) {
  const router = useRouter();

  if (clinics.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Ionicons name="star" size={16} color={Colors.accent} />
        <Text style={styles.sectionTitle}>Featured Clinics</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {clinics.map((clinic) => (
          <TouchableOpacity
            key={clinic.id}
            style={styles.card}
            onPress={() => router.push(`/clinic/${clinic.id}`)}
            activeOpacity={0.85}
          >
            <View style={styles.iconWrap}>
              <Ionicons name="medical" size={22} color={Colors.primary} />
            </View>
            <View style={styles.badge}>
              <Ionicons name="star" size={9} color={Colors.white} />
              <Text style={styles.badgeText}>FEATURED</Text>
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {clinic.name}
            </Text>
            <Text style={styles.address} numberOfLines={2}>
              {clinic.address}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.getCard}
          onPress={() => router.push('/featured')}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={32} color={Colors.primary} />
          <Text style={styles.getTitle}>Get{'\n'}Featured</Text>
          <Text style={styles.getSubtitle}>Promote your clinic</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
  },
  scroll: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  card: {
    width: 160,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.featured,
    position: 'relative',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.featured,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
  name: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: Spacing.xs,
  },
  rating: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  address: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  getCard: {
    width: 130,
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  getTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  getSubtitle: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});
