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

      {/* Search Bar with inline Near Me */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
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
          <TouchableOpacity
            style={[styles.nearMeBtn, sortByDistance && styles.nearMeBtnActive]}
            onPress={handleNearMe}
            activeOpacity={0.8}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Ionicons name="location" size={18} color={Colors.white} />
            )}
          </TouchableOpacity>
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
  searchSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
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
  nearMeBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  nearMeBtnActive: {
    backgroundColor: Colors.primaryDark,
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
