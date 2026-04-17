import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clinics, getFeaturedClinics, getClinicsWithDistance, Clinic } from '@/data/clinics';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

const BRAMPTON_REGION = {
  latitude: 43.7315,
  longitude: -79.7624,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

export default function HomeScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const featuredClinics = getFeaturedClinics();

  const filteredClinics = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(loc);
    } catch {
      // Use Brampton default if location fails
    } finally {
      setLoading(false);
    }
  };

  const centerOnUser = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } else {
      Alert.alert('Location unavailable', 'Unable to get your current location.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrap}>
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
        <TouchableOpacity style={styles.listBtn} onPress={() => router.push('/list')}>
          <Ionicons name="list" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Map */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Finding clinics near you...</Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          initialRegion={
            location
              ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
              : BRAMPTON_REGION
          }
          showsUserLocation
          showsMyLocationButton={false}
        >
          {filteredClinics.map((clinic) => (
            <Marker
              key={clinic.id}
              coordinate={{ latitude: clinic.latitude, longitude: clinic.longitude }}
              title={clinic.name}
              description={clinic.address}
              pinColor={clinic.featured ? Colors.mapPinFeatured : Colors.mapPin}
              onPress={() => setSelectedClinic(clinic)}
            />
          ))}
        </MapView>
      )}

      {/* Center on user button */}
      <TouchableOpacity style={styles.locateBtn} onPress={centerOnUser}>
        <Ionicons name="locate" size={22} color={Colors.primary} />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FeaturedCarousel clinics={featuredClinics} />

          {selectedClinic && (
            <View style={styles.selectedCard}>
              <View style={styles.selectedHeader}>
                <View style={styles.selectedIcon}>
                  <Ionicons name="medical" size={18} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.selectedName}>{selectedClinic.name}</Text>
                  <Text style={styles.selectedAddress} numberOfLines={1}>
                    {selectedClinic.address}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedClinic(null)}>
                  <Ionicons name="close" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => router.push(`/clinic/${selectedClinic.id}`)}
              >
                <Text style={styles.viewDetailsBtnText}>View Full Details</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white} />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomActions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/list')}
            >
              <Ionicons name="list-outline" size={20} color={Colors.primary} />
              <Text style={styles.actionBtnText}>All Clinics</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/featured')}
            >
              <Ionicons name="star-outline" size={20} color={Colors.accent} />
              <Text style={[styles.actionBtnText, { color: Colors.accent }]}>
                Get Featured
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push('/about')}
            >
              <Ionicons name="information-circle-outline" size={20} color={Colors.textSecondary} />
              <Text style={[styles.actionBtnText, { color: Colors.textSecondary }]}>About</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchWrap: {
    position: 'absolute',
    top: 16,
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 10,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  listBtn: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  locateBtn: {
    position: 'absolute',
    right: Spacing.md,
    bottom: 290,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  bottomSheet: {
    height: 280,
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingTop: Spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  selectedCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  selectedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  selectedIcon: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedName: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  selectedAddress: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  viewDetailsBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  viewDetailsBtnText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    gap: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  actionBtnText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.primary,
  },
});
