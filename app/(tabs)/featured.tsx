import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFeaturedClinics } from '@/data/clinics';
import ClinicCard from '@/components/ClinicCard';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

const INQUIRY_EMAIL = 'bhavyat81@gmail.com';

const BENEFITS = [
  {
    icon: 'trending-up',
    title: 'Top of Search Results',
    desc: 'Your clinic appears at the top of the list and on the featured carousel on the map screen.',
  },
  {
    icon: 'star',
    title: 'Featured Badge',
    desc: 'A gold "Featured" badge on your clinic card makes you stand out from the competition.',
  },
  {
    icon: 'people',
    title: 'More Patient Inquiries',
    desc: 'Featured clinics receive significantly more profile views and patient contacts.',
  },
  {
    icon: 'shield-checkmark',
    title: 'Verified Listing',
    desc: 'We verify your clinic information to build trust with potential patients.',
  },
];

export default function FeaturedScreen() {
  const featuredClinics = getFeaturedClinics();
  const [name, setName] = useState('');
  const [clinic, setClinic] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !clinic.trim() || !email.trim()) {
      Alert.alert('Missing Information', 'Please fill in your name, clinic name, and email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    const subject = encodeURIComponent('FindPhysio - Featured Listing Inquiry');
    const body = encodeURIComponent(
      `Business Name: ${clinic}\nContact Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message || 'No message provided.'}`
    );
    Linking.openURL(`mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`);
  };

  const handleEmailContact = () => {
    Linking.openURL(`mailto:${INQUIRY_EMAIL}?subject=FindPhysio%20-%20Featured%20Listing%20Inquiry`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Clinics List */}
        {featuredClinics.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.featuredSectionTitle}>Featured Clinics</Text>
            <Text style={styles.featuredSectionSubtitle}>
              Premier physiotherapy clinic in Brampton — 200 County Court Blvd, Unit C
            </Text>
            {featuredClinics.map((c) => (
              <ClinicCard key={c.id} clinic={c} />
            ))}
          </View>
        )}

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="star" size={40} color={Colors.accent} />
          </View>
          <Text style={styles.heroTitle}>Get Your Clinic Featured</Text>
          <Text style={styles.heroSubtitle}>
            Reach more patients in Brampton and grow your physiotherapy practice
          </Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.price}>$49<Text style={styles.priceMonth}>/month</Text></Text>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Get Featured?</Text>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <Ionicons name={b.icon as any} size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Inquiry Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Information</Text>
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Your Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Dr. Jane Smith"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Clinic Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Brampton Physio Clinic"
                placeholderTextColor={Colors.textLight}
                value={clinic}
                onChangeText={setClinic}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. info@yourclinic.ca"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 905-555-1234"
                placeholderTextColor={Colors.textLight}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Message (optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us about your clinic and any questions you have..."
                placeholderTextColor={Colors.textLight}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
            >
              <Ionicons
                name="send"
                size={18}
                color={Colors.white}
              />
              <Text style={styles.submitBtnText}>
                Send Inquiry
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Alternate Contact */}
        <View style={styles.section}>
          <View style={styles.altContact}>
            <Text style={styles.altContactText}>
              Prefer to reach us directly?
            </Text>
            <TouchableOpacity style={styles.emailBtn} onPress={handleEmailContact}>
              <Ionicons name="mail" size={16} color={Colors.primary} />
              <Text style={styles.emailBtnText}>{INQUIRY_EMAIL}</Text>
            </TouchableOpacity>
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
  featuredSection: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.featuredBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    overflow: 'hidden',
  },
  featuredSectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  featuredSectionSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  hero: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.white + 'DD',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  priceTag: {
    backgroundColor: Colors.white + '22',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FontSizes.xs,
    color: Colors.white + 'BB',
    fontWeight: '500',
  },
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
  },
  priceMonth: {
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  benefitCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  benefitIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  benefitDesc: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  fieldGroup: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.text,
    backgroundColor: Colors.background,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.sm,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  altContact: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  altContactText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  emailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  emailBtnText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
