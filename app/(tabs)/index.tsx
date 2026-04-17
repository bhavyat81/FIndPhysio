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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { clinics, Clinic, getDistance } from '@/data/clinics';
import ClinicCard from '@/components/ClinicCard';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

type ClinicWithOptDist = Clinic & { distance?: number };

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);

  const handleNearMe = async () => {
    if (sortByDistance) {
      setSortByDistance(false);
      setSearch('');
      return;
    }
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Please allow location access to find clinics near you.',
          [{ text: 'OK' }]
        );
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      setSortByDistance(true);
      setSearch('');
    } finally {
      setLocationLoading(false);
    }
  };

  const showResults = search.length >= 2 || sortByDistance;

  const filteredClinics = useMemo((): ClinicWithOptDist[] => {
    if (!showResults) return [];
    const list = search.length >= 2
      ? clinics.filter(
          (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.address.toLowerCase().includes(search.toLowerCase())
        )
      : clinics;
    if (sortByDistance && userLocation) {
      return list
        .map((c) => ({
          ...c,
          distance: getDistance(userLocation.lat, userLocation.lng, c.latitude, c.longitude),
        }))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }
    return list;
  }, [search, sortByDistance, userLocation, showResults]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
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
      </View>

      {/* Find Rehab Near Me Button */}
      <View style={styles.nearMeSection}>
        <TouchableOpacity
          style={[styles.findNearMeBtn, sortByDistance && styles.findNearMeBtnActive]}
          onPress={handleNearMe}
          activeOpacity={0.85}
        >
          {locationLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Ionicons
              name={sortByDistance ? 'location' : 'location-outline'}
              size={22}
              color={Colors.white}
            />
          )}
          <Text style={styles.findNearMeBtnText}>
            {locationLoading
              ? 'Finding your location...'
              : sortByDistance
              ? 'Showing Clinics Near You'
              : 'Find Rehab Near Me'}
          </Text>
          {!locationLoading && (
            <Ionicons
              name={sortByDistance ? 'close-circle' : 'chevron-forward'}
              size={18}
              color={Colors.white + 'CC'}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by clinic name..."
            placeholderTextColor={Colors.textLight}
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              if (text.length >= 2) setSortByDistance(false);
            }}
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
        {search.length > 0 && search.length < 2 && (
          <Text style={styles.searchHint}>Type at least 2 characters to search</Text>
        )}
        {showResults && (
          <Text style={styles.resultCount}>
            {sortByDistance
              ? `${filteredClinics.length} clinic${filteredClinics.length !== 1 ? 's' : ''} sorted by distance`
              : `${filteredClinics.length} result${filteredClinics.length !== 1 ? 's' : ''} found`}
          </Text>
        )}
      </View>

      {/* Clinic List or Empty State */}
      {showResults ? (
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
      ) : (
        <View style={styles.defaultState}>
          <View style={styles.defaultIconWrap}>
            <Ionicons name="medkit-outline" size={64} color={Colors.primary + '66'} />
          </View>
          <Text style={styles.defaultTitle}>Discover Rehab Clinics</Text>
          <Text style={styles.defaultSubText}>
            Search by clinic name or tap{'\n'}
            <Text style={styles.defaultSubTextBold}>Find Rehab Near Me</Text>
            {'\n'}to discover clinics nearby
          </Text>
        </View>
      )}
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
    paddingTop: Spacing.md,
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
  nearMeSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  findNearMeBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  findNearMeBtnActive: {
    backgroundColor: Colors.primaryDark,
  },
  findNearMeBtnText: {
    color: Colors.white,
    fontSize: FontSizes.md,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  searchSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
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
  searchHint: {
    fontSize: FontSizes.xs,
    color: Colors.textLight,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
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
  defaultState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  defaultIconWrap: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  defaultTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  defaultSubText: {
    fontSize: FontSizes.md,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 26,
  },
  defaultSubTextBold: {
    fontWeight: '700',
    color: Colors.primary,
  },
});
