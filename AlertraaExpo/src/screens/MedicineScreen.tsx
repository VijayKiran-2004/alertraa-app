import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '../lib/mockData';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../lib/theme';
import type { Medicine, CartItem } from '../types';

interface MedicineScreenProps {
  isDarkMode: boolean;
}

export default function MedicineScreen({ isDarkMode }: MedicineScreenProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find((item: CartItem) => item.id === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item: CartItem) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <Text style={[styles.headerTitle, { color: themeColors.foreground }]}>Medicines</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="shopping-cart" size={24} color={themeColors.foreground} />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: themeColors.card }]}>
            <Icon name="search" size={20} color={themeColors.mutedForeground} />
            <TextInput
              style={[styles.searchInput, { color: themeColors.foreground }]}
              placeholder="Search medicines..."
              placeholderTextColor={themeColors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Prescribed Medicines */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
            Your Prescriptions
          </Text>
          {mockData.userDetails.prescriptions.map((prescription) => (
            <View
              key={prescription.id}
              style={[styles.medicineCard, { backgroundColor: themeColors.card }]}
            >
              <View style={styles.medicineHeader}>
                <View style={[styles.iconCircle, { backgroundColor: colors.info + '20' }]}>
                  <Icon name="file-text" size={24} color={colors.info} />
                </View>
                <View style={styles.medicineDetails}>
                  <Text style={[styles.medicineName, { color: themeColors.foreground }]}>
                    {prescription.name}
                  </Text>
                  <Text style={[styles.medicineDescription, { color: themeColors.mutedForeground }]}>
                    {prescription.description}
                  </Text>
                  <Text style={[styles.medicinePrice, { color: themeColors.primary }]}>
                    {prescription.price}
                  </Text>
                  <Text style={[styles.prescriptionInfo, { color: themeColors.mutedForeground }]}>
                    Prescribed by {prescription.doctor} on {prescription.date}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: themeColors.primary }]}
                onPress={() => addToCart(prescription)}
                activeOpacity={0.8}
              >
                <Icon name="plus" size={16} color="#fff" />
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Frequently Bought */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
            Frequently Bought
          </Text>
          {mockData.ecommerce.medicines
            .filter((med) => med.frequentlyBought)
            .map((medicine) => (
              <View
                key={medicine.id}
                style={[styles.medicineCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.medicineHeader}>
                  <View style={[styles.iconCircle, { backgroundColor: themeColors.primary + '20' }]}>
                    <Icon name="package" size={24} color={themeColors.primary} />
                  </View>
                  <View style={styles.medicineDetails}>
                    <Text style={[styles.medicineName, { color: themeColors.foreground }]}>
                      {medicine.name}
                    </Text>
                    <Text style={[styles.medicineDescription, { color: themeColors.mutedForeground }]}>
                      {medicine.description}
                    </Text>
                    <Text style={[styles.medicinePrice, { color: themeColors.primary }]}>
                      {medicine.price}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: themeColors.primary }]}
                  onPress={() => addToCart(medicine)}
                  activeOpacity={0.8}
                >
                  <Icon name="plus" size={16} color="#fff" />
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        {/* All Medicines */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>
            All Medicines
          </Text>
          {mockData.ecommerce.medicines
            .filter((med) => !med.frequentlyBought)
            .map((medicine) => (
              <View
                key={medicine.id}
                style={[styles.medicineCard, { backgroundColor: themeColors.card }]}
              >
                <View style={styles.medicineHeader}>
                  <View style={[styles.iconCircle, { backgroundColor: themeColors.primary + '20' }]}>
                    <Icon name="package" size={24} color={themeColors.primary} />
                  </View>
                  <View style={styles.medicineDetails}>
                    <Text style={[styles.medicineName, { color: themeColors.foreground }]}>
                      {medicine.name}
                    </Text>
                    <Text style={[styles.medicineDescription, { color: themeColors.mutedForeground }]}>
                      {medicine.description}
                    </Text>
                    <Text style={[styles.medicinePrice, { color: themeColors.primary }]}>
                      {medicine.price}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: themeColors.primary }]}
                  onPress={() => addToCart(medicine)}
                  activeOpacity={0.8}
                >
                  <Icon name="plus" size={16} color="#fff" />
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: fontWeight.bold,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  medicineCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicineDetails: {
    flex: 1,
    gap: spacing.xs,
  },
  medicineName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  medicineDescription: {
    fontSize: fontSize.sm,
  },
  medicinePrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  prescriptionInfo: {
    fontSize: fontSize.xs,
    fontStyle: 'italic',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  addButtonText: {
    color: '#fff',
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
