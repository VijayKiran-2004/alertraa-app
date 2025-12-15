// 'use server'; // Disabled for static export

/**
 * @fileOverview An AI agent that provides personalized health recommendations based on user data.
 *
 * - getPersonalizedRecommendations - A function that generates personalized health recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  healthConditions: z
    .array(z.string())
    .describe('A list of the user`s health conditions.'),
  allergies: z.array(z.string()).describe('A list of the user`s allergies.'),
  medications: z.array(z.string()).describe('A list of the user`s medications.'),
});
export type PersonalizedRecommendationsInput =
  z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized health recommendations.'),
});
export type PersonalizedRecommendationsOutput =
  z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI health assistant that provides personalized health recommendations based on the user's health conditions, allergies, and medications.

  Provide a list of recommendations, formatted as a JSON array of strings.

  Health Conditions: {{healthConditions}}
  Allergies: {{allergies}}
  Medications: {{medications}}`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
