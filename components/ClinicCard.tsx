import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Clinic } from '@/data/clinics';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

interface ClinicCardProps {
  clinic: Clinic;
  distance?: number;
  compact?: boolean;
}

export default function ClinicCard({ clinic, distance, compact = false }: ClinicCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/clinic/${clinic.id}`);
  };

  const handleCall = () => {
    if (clinic.phone) {
      Linking.openURL(`tel:${clinic.phone.replace(/\s/g, '')}`);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, clinic.featured && styles.featuredCard]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {clinic.featured && (
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={10} color={Colors.accent} />
          <Text style={styles.featuredText}>FEATURED</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Ionicons name="medical" size={20} color={Colors.primary} />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.name} numberOfLines={2}>
              {clinic.name}
            </Text>
            {clinic.rating && (
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color={Colors.accent} />
                <Text style={styles.rating}>{clinic.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
          {distance !== undefined && (
            <Text style={styles.distance}>{distance} km</Text>
          )}
        </View>

        {!compact && (
          <>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.infoText} numberOfLines={2}>
                {clinic.address}
              </Text>
            </View>

            {clinic.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.infoText}>{clinic.phone}</Text>
              </View>
            )}

            <View style={styles.actions}>
              {clinic.phone && (
                <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
                  <Ionicons name="call" size={14} color={Colors.white} />
                  <Text style={styles.callBtnText}>Call</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.detailBtn} onPress={handlePress}>
                <Text style={styles.detailBtnText}>View Details</Text>
                <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  featuredCard: {
    borderWidth: 1.5,
    borderColor: Colors.featured,
  },
  featuredBadge: {
    backgroundColor: Colors.featured,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    gap: 3,
  },
  featuredText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 22,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  rating: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  distance: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  callBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
  },
  callBtnText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 'auto',
  },
  detailBtnText: {
    color: Colors.primary,
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
});
