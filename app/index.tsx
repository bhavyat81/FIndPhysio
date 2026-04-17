import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { clinics, Clinic, getDistance } from '@/data/clinics';
import ClinicCard from '@/components/ClinicCard';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

type ClinicWithOptDist = Clinic & { distance?: number };

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);

  const handleNearMe = async () => {
    if (sortByDistance) {
      setSortByDistance(false);
      return;
    }
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        setSortByDistance(true);
      }
    } finally {
      setLocationLoading(false);
    }
  };

  const filteredClinics = useMemo((): ClinicWithOptDist[] => {
    const list = clinics.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase())
    );
    if (sortByDistance && userLocation) {
      return list
        .map((c) => ({
          ...c,
          distance: getDistance(userLocation.lat, userLocation.lng, c.latitude, c.longitude),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }
    return list;
  }, [search, sortByDistance, userLocation]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {/* Hero Banner */}
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="medical" size={28} color={Colors.white} />
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>FindPhysio</Text>
            <Text style={styles.heroTagline}>
              Your trusted guide to physiotherapy, chiropractic, acupuncture, naturopathy, and registered massage therapy clinics in Brampton.
            </Text>
          </View>
        </View>

        {/* Nav Buttons */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnFeatured]}
            onPress={() => router.push('/featured')}
          >
            <Ionicons name="star" size={16} color={Colors.accent} />
            <Text style={[styles.navBtnText, { color: Colors.accent }]}>Featured Clinics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, sortByDistance ? styles.navBtnNearMeActive : styles.navBtnNearMe]}
            onPress={handleNearMe}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Ionicons name="location" size={16} color={Colors.white} />
            )}
            <Text style={[styles.navBtnText, { color: Colors.white }]}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, styles.navBtnAbout]}
            onPress={() => router.push('/about')}
          >
            <Ionicons name="information-circle-outline" size={16} color={Colors.white} />
            <Text style={[styles.navBtnText, { color: Colors.white }]}>About</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar — outside FlatList so it never remounts */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics by name or address..."
            placeholderTextColor={Colors.textLight}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.resultCount}>
          {search.length > 0
            ? `${filteredClinics.length} result${filteredClinics.length !== 1 ? 's' : ''} found`
            : sortByDistance
            ? `${filteredClinics.length} clinics sorted by distance`
            : `${clinics.length} clinics in Brampton & GTA`}
        </Text>
      </View>

      {/* Clinic List */}
      <FlatList
        data={filteredClinics}
        keyExtractor={(item: ClinicWithOptDist) => item.id}
        renderItem={({ item }) => <ClinicCard clinic={item} distance={item.distance} />}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={52} color={Colors.textLight} />
            <Text style={styles.emptyText}>No clinics found</Text>
            <Text style={styles.emptySubText}>Try a different search term</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: Spacing.xl }} />}
      />
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
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  heroIconWrap: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  heroTagline: {
    fontSize: FontSizes.xs,
    color: Colors.white + 'DD',
    lineHeight: 18,
    marginTop: 2,
  },
  navRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 2,
    borderWidth: 1.5,
    borderColor: Colors.white + '44',
  },
  navBtnFeatured: {
    backgroundColor: Colors.white + '18',
    borderColor: Colors.accent + '88',
  },
  navBtnNearMe: {
    backgroundColor: Colors.white + '18',
    borderColor: Colors.white + '44',
  },
  navBtnNearMeActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.white + '88',
  },
  navBtnAbout: {
    backgroundColor: Colors.white + '18',
    borderColor: Colors.white + '44',
  },
  navBtnText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  searchSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
    padding: 0,
  },
  resultCount: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  listContent: {
    paddingTop: Spacing.sm,
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  emptySubText: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
  },
});

