import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getClinicById } from '@/data/clinics';
import FeaturedBadge from '@/components/FeaturedBadge';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { useEffect } from 'react';

export default function ClinicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const clinic = getClinicById(id ?? '');

  useEffect(() => {
    if (clinic) {
      navigation.setOptions({ title: clinic.name });
    }
  }, [clinic, navigation]);

  if (!clinic) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.textSecondary} />
        <Text style={styles.notFoundText}>Clinic not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    if (!clinic.phone) return;
    const phone = clinic.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert('Error', 'Unable to make a call from this device.')
    );
  };

  const handleDirections = () => {
    const destination = encodeURIComponent(
      clinic.address !== 'Brampton, ON' ? clinic.address : clinic.name + ', Brampton, ON'
    );
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destination}`).catch(() =>
      Alert.alert('Error', 'Unable to open maps application.')
    );
  };

  const handleWebsite = () => {
    Linking.openURL(clinic.website).catch(() =>
      Alert.alert('Error', 'Unable to open website.')
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="medical" size={48} color={Colors.primary} />
          </View>
          {clinic.featured && (
            <View style={styles.featuredWrap}>
              <FeaturedBadge />
            </View>
          )}
          <Text style={styles.heroName}>{clinic.name}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          {clinic.phone ? (
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
              <View style={[styles.actionIcon, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="call" size={22} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.actionBtn} onPress={handleDirections}>
            <View style={[styles.actionIcon, { backgroundColor: '#E0F2FE' }]}>
              <Ionicons name="navigate" size={22} color="#0284C7" />
            </View>
            <Text style={styles.actionLabel}>Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleWebsite}>
            <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="globe" size={22} color="#16A34A" />
            </View>
            <Text style={styles.actionLabel}>Website</Text>
          </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color={Colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{clinic.address}</Text>
              </View>
            </View>

            {clinic.phone && (
              <View style={styles.infoRow}>
                <Ionicons name="call" size={18} color={Colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{clinic.phone}</Text>
                </View>
              </View>
            )}

            <View style={styles.infoRow}>
              <Ionicons name="globe" size={18} color={Colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Website</Text>
                <Text style={[styles.infoValue, styles.link]} onPress={handleWebsite}>
                  {clinic.website}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Description */}
        {clinic.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.infoCard}>
              <Text style={styles.description}>{clinic.description}</Text>
            </View>
          </View>
        )}

        {/* Services */}
        {clinic.services && clinic.services.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.servicesWrap}>
              {clinic.services.map((service, i) => (
                <View key={i} style={styles.serviceChip}>
                  <Text style={styles.serviceChipText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          {clinic.phone && (
            <TouchableOpacity style={styles.primaryBtn} onPress={handleCall}>
              <Ionicons name="call" size={18} color={Colors.white} />
              <Text style={styles.primaryBtnText}>Call Now: {clinic.phone}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.secondaryBtn} onPress={handleDirections}>
            <Ionicons name="navigate" size={18} color={Colors.primary} />
            <Text style={styles.secondaryBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  notFoundText: {
    fontSize: FontSizes.lg,
    color: Colors.textSecondary,
  },
  hero: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  featuredWrap: {
    marginBottom: Spacing.sm,
  },
  heroName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionBtn: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.text,
  },
  section: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  servicesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  serviceChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
  },
  serviceChipText: {
    fontSize: FontSizes.xs,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});
