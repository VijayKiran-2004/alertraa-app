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
import type { Appointment } from '../types';

interface BookingScreenProps {
  isDarkMode: boolean;
}

export default function BookingScreen({ isDarkMode }: BookingScreenProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return colors.info;
      case 'completed':
        return colors.success;
      case 'cancelled':
        return colors.error;
      default:
        return themeColors.mutedForeground;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <Text style={[styles.headerTitle, { color: themeColors.foreground }]}>Appointments</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: themeColors.card }]}>
            <Icon name="search" size={20} color={themeColors.mutedForeground} />
            <TextInput
              style={[styles.searchInput, { color: themeColors.foreground }]}
              placeholder="Search doctors or specialties..."
              placeholderTextColor={themeColors.mutedForeground}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Book New Appointment Button */}
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: themeColors.primary }]}
          activeOpacity={0.8}
        >
          <Icon name="plus-circle" size={24} color="#fff" />
          <Text style={styles.bookButtonText}>Book New Appointment</Text>
        </TouchableOpacity>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>Upcoming</Text>
          {mockData.appointments
            .filter((apt) => apt.status === 'upcoming')
            .map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={[styles.appointmentCard, { backgroundColor: themeColors.card }]}
                activeOpacity={0.7}
              >
                <View style={styles.appointmentHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={themeColors.mutedForeground} />
                </View>

                <View style={styles.appointmentBody}>
                  <View style={[styles.iconCircle, { backgroundColor: themeColors.primary + '20' }]}>
                    <Icon name="user" size={24} color={themeColors.primary} />
                  </View>
                  <View style={styles.appointmentDetails}>
                    <Text style={[styles.doctorName, { color: themeColors.foreground }]}>
                      {appointment.doctor}
                    </Text>
                    <Text style={[styles.specialty, { color: themeColors.mutedForeground }]}>
                      {appointment.specialty}
                    </Text>
                    <View style={styles.detailRow}>
                      <Icon name="calendar" size={14} color={themeColors.mutedForeground} />
                      <Text style={[styles.detailText, { color: themeColors.mutedForeground }]}>
                        {appointment.date}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="clock" size={14} color={themeColors.mutedForeground} />
                      <Text style={[styles.detailText, { color: themeColors.mutedForeground }]}>
                        {appointment.time}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Icon name="map-pin" size={14} color={themeColors.mutedForeground} />
                      <Text style={[styles.detailText, { color: themeColors.mutedForeground }]}>
                        {appointment.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Past Appointments */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.foreground }]}>Past Visits</Text>
          {mockData.appointments
            .filter((apt) => apt.status === 'completed')
            .map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={[styles.appointmentCard, { backgroundColor: themeColors.card }]}
                activeOpacity={0.7}
              >
                <View style={styles.appointmentHeader}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={themeColors.mutedForeground} />
                </View>

                <View style={styles.appointmentBody}>
                  <View style={[styles.iconCircle, { backgroundColor: themeColors.primary + '20' }]}>
                    <Icon name="user" size={24} color={themeColors.primary} />
                  </View>
                  <View style={styles.appointmentDetails}>
                    <Text style={[styles.doctorName, { color: themeColors.foreground }]}>
                      {appointment.doctor}
                    </Text>
                    <Text style={[styles.specialty, { color: themeColors.mutedForeground }]}>
                      {appointment.specialty}
                    </Text>
                    <View style={styles.detailRow}>
                      <Icon name="calendar" size={14} color={themeColors.mutedForeground} />
                      <Text style={[styles.detailText, { color: themeColors.mutedForeground }]}>
                        {appointment.date}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: fontSize.xxl,
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
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
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
  appointmentCard: {
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  appointmentBody: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentDetails: {
    flex: 1,
    gap: spacing.xs,
  },
  doctorName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  specialty: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailText: {
    fontSize: fontSize.sm,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
