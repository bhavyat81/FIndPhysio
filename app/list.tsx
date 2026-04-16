import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getClinicsWithDistance, getFeaturedClinics, Clinic } from '@/data/clinics';
import ClinicCard from '@/components/ClinicCard';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

type ClinicWithDist = Clinic & { distance: number };

export default function ListScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const userLat = location?.coords.latitude ?? 43.7315;
  const userLng = location?.coords.longitude ?? -79.7624;

  const clinicsWithDist: ClinicWithDist[] = getClinicsWithDistance(userLat, userLng);

  const filtered = clinicsWithDist.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || c.featured;
    return matchesSearch && matchesFeatured;
  });

  // Featured clinics first
  const sorted = [
    ...filtered.filter((c) => c.featured),
    ...filtered.filter((c) => !c.featured),
  ];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setLocation(loc);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderHeader = () => (
    <View style={styles.listHeader}>
      {loading ? (
        <View style={styles.locatingRow}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.locatingText}>Finding your location...</Text>
        </View>
      ) : (
        <Text style={styles.resultsText}>
          {sorted.length} clinic{sorted.length !== 1 ? 's' : ''} found
          {location ? ' near you' : ' in Brampton'}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Search & Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clinics..."
            placeholderTextColor={Colors.textLight}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[styles.filterBtn, showFeaturedOnly && styles.filterBtnActive]}
          onPress={() => setShowFeaturedOnly(!showFeaturedOnly)}
        >
          <Ionicons
            name="star"
            size={14}
            color={showFeaturedOnly ? Colors.white : Colors.accent}
          />
          <Text style={[styles.filterBtnText, showFeaturedOnly && styles.filterBtnTextActive]}>
            Featured
          </Text>
        </TouchableOpacity>
      </View>

      {/* Clinic List */}
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClinicCard clinic={item} distance={item.distance} />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSection: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.text,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.white,
  },
  filterBtnActive: {
    backgroundColor: Colors.accent,
  },
  filterBtnText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accent,
  },
  filterBtnTextActive: {
    color: Colors.white,
  },
  listHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  locatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  locatingText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  resultsText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
});
