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
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { clinics } from '@/data/clinics';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Banner */}
        <View style={styles.hero}>
          <View style={styles.appIcon}>
            <Ionicons name="medical" size={44} color={Colors.white} />
          </View>
          <Text style={styles.appName}>FindPhysio</Text>
          <Text style={styles.appTagline}>Find physiotherapy clinics near you in Brampton, Ontario</Text>
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
              FindPhysio is your local guide to physiotherapy and rehabilitation clinics in
              Brampton, Ontario. Whether you&apos;re recovering from an injury, managing chronic
              pain, or looking for sports rehabilitation, we help you find the right clinic
              near you.
            </Text>
            <Text style={[styles.bodyText, { marginTop: Spacing.sm }]}>
              Use the map to explore clinics visually, or browse the list sorted by distance
              from your location. Tap any clinic to see full details, call them directly, or
              get directions.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.card}>
            {[
              { icon: 'map', text: 'Interactive map with clinic pins' },
              { icon: 'location', text: 'GPS-based distance sorting' },
              { icon: 'call', text: 'One-tap calling' },
              { icon: 'navigate', text: 'Instant directions via Maps' },
              { icon: 'star', text: 'Featured clinic highlighting' },
              { icon: 'search', text: 'Search & filter clinics' },
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
              onPress={() => Linking.openURL('mailto:featured@findphysio.ca')}
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
              onPress={() => Linking.openURL('mailto:info@findphysio.ca')}
            >
              <Ionicons name="mail" size={18} color={Colors.primary} />
              <Text style={styles.contactText}>info@findphysio.ca</Text>
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
