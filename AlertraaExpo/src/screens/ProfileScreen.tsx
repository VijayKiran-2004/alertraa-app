import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '../lib/mockData';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../lib/theme';

interface ProfileScreenProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ isDarkMode, toggleDarkMode, onLogout }: ProfileScreenProps) {
  const themeColors = isDarkMode ? colors.dark : colors.light;
  const user = mockData.userDetails;

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={[styles.card, { backgroundColor: themeColors.card }]}>
      <Text style={[styles.cardTitle, { color: themeColors.foreground }]}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: themeColors.mutedForeground }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: themeColors.foreground }]}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <Text style={[styles.headerTitle, { color: themeColors.foreground }]}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: themeColors.card }]}>
          <View style={[styles.avatarContainer, { backgroundColor: themeColors.primary + '20' }]}>
            <Icon name="user" size={48} color={themeColors.primary} />
          </View>
          <Text style={[styles.userName, { color: themeColors.foreground }]}>{user.username}</Text>
          <Text style={[styles.userInfo, { color: themeColors.mutedForeground }]}>
            {user.age} years • {user.gender}
          </Text>
        </View>

        {/* Basic Info */}
        <InfoCard title="Basic Information">
          <InfoRow label="Height" value={user.height} />
          <InfoRow label="Weight" value={user.weight} />
          <InfoRow label="Age" value={`${user.age} years`} />
          <InfoRow label="Gender" value={user.gender} />
        </InfoCard>

        {/* Health Conditions */}
        <InfoCard title="Health Conditions">
          {user.healthConditions.map((condition, index) => (
            <View key={index} style={styles.conditionItem}>
              <View style={styles.conditionHeader}>
                <Icon name="alert-circle" size={16} color={colors.warning} />
                <Text style={[styles.conditionName, { color: themeColors.foreground }]}>
                  {condition.name}
                </Text>
              </View>
              <Text style={[styles.conditionDetail, { color: themeColors.mutedForeground }]}>
                Since {condition.since} • {condition.status}
              </Text>
              <Text style={[styles.conditionDetail, { color: themeColors.mutedForeground }]}>
                Medication: {condition.medication}
              </Text>
            </View>
          ))}
        </InfoCard>

        {/* Current Medications */}
        <InfoCard title="Current Medications">
          {user.medications.map((med, index) => (
            <View key={index} style={styles.medicationItem}>
              <View style={styles.medicationHeader}>
                <Icon name="package" size={16} color={themeColors.primary} />
                <Text style={[styles.medicationName, { color: themeColors.foreground }]}>
                  {med.name} - {med.dosage}
                </Text>
              </View>
              <Text style={[styles.medicationDetail, { color: themeColors.mutedForeground }]}>
                {med.frequency} • {med.duration}
              </Text>
              <Text style={[styles.medicationDetail, { color: themeColors.mutedForeground }]}>
                For: {med.condition}
              </Text>
            </View>
          ))}
        </InfoCard>

        {/* Allergies */}
        <InfoCard title="Allergies">
          {user.allergies.map((allergy, index) => (
            <View key={index} style={styles.allergyItem}>
              <View style={styles.allergyHeader}>
                <Icon name="alert-triangle" size={16} color={colors.error} />
                <Text style={[styles.allergyName, { color: themeColors.foreground }]}>
                  {allergy.name}
                </Text>
              </View>
              <Text style={[styles.allergyDetail, { color: themeColors.mutedForeground }]}>
                Reaction: {allergy.reaction}
              </Text>
              <Text style={[styles.allergyDetail, { color: themeColors.mutedForeground }]}>
                Precaution: {allergy.precaution}
              </Text>
            </View>
          ))}
        </InfoCard>

        {/* Emergency Contacts */}
        <InfoCard title="Emergency Contacts">
          {mockData.emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Icon name="phone" size={16} color={colors.success} />
                <Text style={[styles.contactName, { color: themeColors.foreground }]}>
                  {contact.name}
                </Text>
                {contact.prioritized && (
                  <View style={styles.priorityBadge}>
                    <Text style={styles.priorityText}>Priority</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.contactDetail, { color: themeColors.mutedForeground }]}>
                {contact.relationship} • {contact.phone}
              </Text>
              <Text style={[styles.contactDetail, { color: themeColors.mutedForeground }]}>
                {contact.instructions}
              </Text>
            </View>
          ))}
        </InfoCard>

        {/* Settings */}
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.cardTitle, { color: themeColors.foreground }]}>Settings</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name={isDarkMode ? 'moon' : 'sun'} size={20} color={themeColors.foreground} />
              <Text style={[styles.settingLabel, { color: themeColors.foreground }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: themeColors.border, true: themeColors.primary }}
              thumbColor="#fff"
            />
          </View>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="bell" size={20} color={themeColors.foreground} />
              <Text style={[styles.settingLabel, { color: themeColors.foreground }]}>
                Notifications
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color={themeColors.mutedForeground} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="shield" size={20} color={themeColors.foreground} />
              <Text style={[styles.settingLabel, { color: themeColors.foreground }]}>
                Privacy & Security
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color={themeColors.mutedForeground} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={onLogout}
          activeOpacity={0.8}
        >
          <Icon name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

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
  profileHeader: {
    alignItems: 'center',
    padding: spacing.xxxl,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  userName: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  userInfo: {
    fontSize: fontSize.md,
  },
  card: {
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
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  cardContent: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: fontSize.md,
  },
  infoValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  conditionItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  conditionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  conditionName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  conditionDetail: {
    fontSize: fontSize.sm,
  },
  medicationItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  medicationName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  medicationDetail: {
    fontSize: fontSize.sm,
  },
  allergyItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  allergyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  allergyName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  allergyDetail: {
    fontSize: fontSize.sm,
  },
  contactItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  contactName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    flex: 1,
  },
  priorityBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    color: '#fff',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  contactDetail: {
    fontSize: fontSize.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  settingLabel: {
    fontSize: fontSize.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },
  logoutText: {
    color: '#fff',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});
