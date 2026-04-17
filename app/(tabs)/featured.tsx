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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFeaturedClinics, Clinic } from '@/data/clinics';
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

function FeaturedClinicCard({ clinic }: { clinic: Clinic }) {
  const handleCall = () => {
    if (clinic.phone) {
      Linking.openURL(`tel:${clinic.phone.replace(/\s/g, '')}`);
    }
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
    if (clinic.website) {
      Linking.openURL(clinic.website).catch(() =>
        Alert.alert('Error', 'Unable to open website.')
      );
    }
  };

  return (
    <View style={richStyles.card}>
      {/* Featured Badge Header */}
      <View style={richStyles.badgeHeader}>
        <Ionicons name="star" size={14} color={Colors.accent} />
        <Text style={richStyles.badgeText}>FEATURED CLINIC</Text>
      </View>

      <View style={richStyles.cardBody}>
        {/* Clinic Name */}
        <View style={richStyles.nameRow}>
          <View style={richStyles.iconWrap}>
            <Ionicons name="medical" size={26} color={Colors.primary} />
          </View>
          <Text style={richStyles.clinicName}>{clinic.name}</Text>
        </View>

        {/* Address */}
        <View style={richStyles.infoRow}>
          <Ionicons name="location" size={16} color={Colors.primary} />
          <Text style={richStyles.infoText}>{clinic.address}</Text>
        </View>

        {/* Phone */}
        {clinic.phone ? (
          <TouchableOpacity style={richStyles.infoRow} onPress={handleCall} activeOpacity={0.7}>
            <Ionicons name="call" size={16} color={Colors.primary} />
            <Text style={[richStyles.infoText, richStyles.infoLink]}>{clinic.phone}</Text>
          </TouchableOpacity>
        ) : null}

        {/* Website */}
        {clinic.website ? (
          <TouchableOpacity style={richStyles.infoRow} onPress={handleWebsite} activeOpacity={0.7}>
            <Ionicons name="globe" size={16} color={Colors.primary} />
            <Text style={[richStyles.infoText, richStyles.infoLink]} numberOfLines={1}>
              {clinic.website.replace(/^https?:\/\//, '')}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Services */}
        {clinic.services && clinic.services.length > 0 && (
          <View style={richStyles.servicesSection}>
            <Text style={richStyles.servicesLabel}>Services Offered</Text>
            <View style={richStyles.serviceChips}>
              {clinic.services.map((service, i) => (
                <View key={i} style={richStyles.chip}>
                  <Text style={richStyles.chipText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Description */}
        {clinic.description ? (
          <Text style={richStyles.description}>{clinic.description}</Text>
        ) : null}

        {/* Action Buttons */}
        <View style={richStyles.actions}>
          {clinic.phone && (
            <TouchableOpacity style={richStyles.callBtn} onPress={handleCall} activeOpacity={0.85}>
              <Ionicons name="call" size={18} color={Colors.white} />
              <Text style={richStyles.callBtnText}>Call Now</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={richStyles.directionsBtn} onPress={handleDirections} activeOpacity={0.85}>
            <Ionicons name="navigate" size={18} color={Colors.primary} />
            <Text style={richStyles.directionsBtnText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Clinics Section */}
        {featuredClinics.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.featuredSectionTitle}>⭐ Featured Clinics</Text>
            <Text style={styles.featuredSectionSubtitle}>
              Premium physiotherapy clinics — full details below
            </Text>
            {featuredClinics.map((c) => (
              <FeaturedClinicCard key={c.id} clinic={c} />
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

const richStyles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.featured,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  badgeHeader: {
    backgroundColor: Colors.featured,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  badgeText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardBody: {
    padding: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  clinicName: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.text,
    flex: 1,
    lineHeight: 28,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  infoText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  infoLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  servicesSection: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  servicesLabel: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  serviceChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  chip: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primary + '44',
  },
  chipText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  description: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  callBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
  },
  callBtnText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  directionsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  directionsBtnText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
});

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
