import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { clinics } from '@/data/clinics';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Banner */}
        <View style={styles.hero}>
          <View style={styles.appIcon}>
            <Ionicons name="medical" size={44} color={Colors.white} />
          </View>
          <Text style={styles.appName}>FindPhysio</Text>
          <Text style={styles.appTagline}>Your trusted guide to physiotherapy, chiropractic, acupuncture, naturopathy, and registered massage therapy clinics in Brampton.</Text>
          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{clinics.length}</Text>
            <Text style={styles.statLabel}>Clinics Listed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{clinics.filter((c) => c.featured).length}</Text>
            <Text style={styles.statLabel}>Featured Clinics</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>City Covered</Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the App</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              FindPhysio is Brampton&apos;s comprehensive healthcare clinic directory. Discover top physiotherapy, chiropractic, acupuncture, naturopathy, and registered massage therapy (RMT) clinics near you.
            </Text>
            <Text style={[styles.bodyText, { marginTop: Spacing.sm }]}>
              Whether you&apos;re recovering from an injury, managing chronic pain, seeking sports rehabilitation, or looking for holistic wellness care — we connect you with trusted local practitioners across Brampton and the Greater Toronto Area.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.card}>
            {[
              { icon: 'search', text: 'Search & filter 60+ Brampton clinics' },
              { icon: 'call', text: 'One-tap calling' },
              { icon: 'navigate', text: 'Instant directions via Maps' },
              { icon: 'star', text: 'Featured clinic highlighting' },
              { icon: 'body', text: 'Physio, Chiro, Acupuncture, Naturopath & RMT' },
              { icon: 'mail', text: 'Send inquiry to get your clinic featured' },
            ].map((f, i) => (
              <View key={i} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name={f.icon as any} size={16} color={Colors.primary} />
                </View>
                <Text style={styles.featureText}>{f.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Business */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>For Clinic Owners</Text>
          <View style={styles.card}>
            <Text style={styles.bodyText}>
              Are you a physiotherapy clinic owner in Brampton? Get your clinic listed and
              consider our featured placement to reach more patients.
            </Text>
            <TouchableOpacity
              style={styles.featuredBtn}
              onPress={() => router.push('/featured')}
            >
              <Ionicons name="star" size={16} color={Colors.white} />
              <Text style={styles.featuredBtnText}>Learn About Featured Placement</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL('mailto:bhavyat81@gmail.com')}
            >
              <Ionicons name="mail" size={18} color={Colors.primary} />
              <Text style={styles.contactText}>bhavyat81@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.section}>
          <View style={styles.disclaimerCard}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.disclaimerText}>
              Clinic information is provided for reference only. Please verify details
              directly with clinics. FindPhysio is not affiliated with any listed clinic.
            </Text>
          </View>
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
  hero: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  appName: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  appTagline: {
    fontSize: FontSizes.sm,
    color: Colors.white + 'CC',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  versionBadge: {
    backgroundColor: Colors.white + '22',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  versionText: {
    fontSize: FontSizes.xs,
    color: Colors.white + 'BB',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  bodyText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  featuredBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm + 2,
    marginTop: Spacing.md,
  },
  featuredBtnText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  contactText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  disclaimerCard: {
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
  },
  disclaimerText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
});
