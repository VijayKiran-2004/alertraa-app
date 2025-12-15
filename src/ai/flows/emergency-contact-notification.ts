// 'use server'; // Disabled for static export

/**
 * @fileOverview Notifies emergency contacts based on user's SOS initiation.
 *
 * - notifyEmergencyContacts - A function to determine which contacts to notify and what information to send.
 * - NotifyEmergencyContactsInput - The input type for the notifyEmergencyContacts function.
 * - NotifyEmergencyContactsOutput - The return type for the notifyEmergencyContacts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmergencyContactSchema = z.object({
  name: z.string().describe('Name of the emergency contact.'),
  relationship: z.string().describe('Relationship to the user.'),
  phone: z.string().describe('Phone number of the emergency contact.'),
  instructions: z.string().describe('Specific instructions for contacting this person.'),
  prioritized: z.boolean().describe('Whether this contact should be prioritized.'),
});

const UserDetailsSchema = z.object({
  username: z.string().describe('The username of the user initiating the SOS.'),
  age: z.number().describe('The age of the user.'),
  gender: z.string().describe('The gender of the user.'),
  height: z.string().describe('The height of the user.'),
  weight: z.string().describe('The weight of the user.'),
});

const VitalsSchema = z.object({
  heartRate: z.string().describe('The user heart rate.'),
  bloodPressure: z.string().describe('The user blood pressure.'),
  bloodOxygen: z.string().describe('The user blood oxygen.'),
});

const NotifyEmergencyContactsInputSchema = z.object({
  emergencyContacts: z.array(EmergencyContactSchema).describe('List of emergency contacts.'),
  userDetails: UserDetailsSchema.describe('Details of the user initiating the SOS.'),
  currentVitals: VitalsSchema.describe('Current vitals of the user.'),
  location: z
    .object({
      latitude: z.number().describe('Latitude of the user.'),
      longitude: z.number().describe('Longitude of the user.'),
      address: z.string().describe('Address of the user.'),
    })
    .describe('The current location of the user.'),
});
export type NotifyEmergencyContactsInput = z.infer<typeof NotifyEmergencyContactsInputSchema>;

const ContactNotificationSchema = z.object({
  name: z.string().describe('Name of the contact to notify.'),
  phone: z.string().describe('Phone number of the contact.'),
  message: z.string().describe('Message to send to the contact.'),
});

const NotifyEmergencyContactsOutputSchema = z.array(ContactNotificationSchema).describe(
  'List of contacts to notify with the message to send to each.'
);
export type NotifyEmergencyContactsOutput = z.infer<typeof NotifyEmergencyContactsOutputSchema>;

export async function notifyEmergencyContacts(input: NotifyEmergencyContactsInput): Promise<NotifyEmergencyContactsOutput> {
  return notifyEmergencyContactsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'notifyEmergencyContactsPrompt',
  input: {schema: NotifyEmergencyContactsInputSchema},
  output: {schema: NotifyEmergencyContactsOutputSchema},
  prompt: `Based on the following user details, current vitals, location, and emergency contacts, determine which contacts to notify and what information to send to them when an SOS is initiated.\n\nUser Details:\nUsername: {{{userDetails.username}}}\nAge: {{{userDetails.age}}}\nGender: {{{userDetails.gender}}}\nHeight: {{{userDetails.height}}}\nWeight: {{{userDetails.weight}}}\n\nCurrent Vitals:\nHeart Rate: {{{currentVitals.heartRate}}}\nBlood Pressure: {{{currentVitals.bloodPressure}}}\nBlood Oxygen: {{{currentVitals.bloodOxygen}}}\n\nLocation:\nLatitude: {{{location.latitude}}}\nLongitude: {{{location.longitude}}}\nAddress: {{{location.address}}}\n\nEmergency Contacts:\n{{#each emergencyContacts}}\nName: {{{name}}}\nRelationship: {{{relationship}}}\nPhone: {{{phone}}}\nInstructions: {{{instructions}}}\nPrioritized: {{#if prioritized}}Yes{{else}}No{{/if}}\n{{/each}}\n\nConsidering the user's relationship to each contact and any specific instructions, create a list of contacts to notify with a personalized message for each. Prioritize contacts marked as 'prioritized'. Include relevant information such as the user's current location and vitals in the message.\n\nOutput the list of contacts to notify with their phone numbers and the message to send to each. Output must be a JSON array of ContactNotificationSchema objects.\n`,
});

const notifyEmergencyContactsFlow = ai.defineFlow(
  {
    name: 'notifyEmergencyContactsFlow',
    inputSchema: NotifyEmergencyContactsInputSchema,
    outputSchema: NotifyEmergencyContactsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
