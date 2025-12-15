// 'use server'; // Disabled for static export

/**
 * @fileOverview This file defines a Genkit flow for querying a user's health summary.
 *
 * It includes:
 * - `healthSummaryQuery`: The main function to call to get the health summary.
 * - `HealthSummaryQueryInput`: The input type for the `healthSummaryQuery` function.
 * - `HealthSummaryQueryOutput`: The output type for the `healthSummaryQuery` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthSummaryQueryInputSchema = z.string().describe('The query for health summary.');
export type HealthSummaryQueryInput = z.infer<typeof HealthSummaryQueryInputSchema>;

const HealthSummaryQueryOutputSchema = z.string().describe('The health summary.');
export type HealthSummaryQueryOutput = z.infer<typeof HealthSummaryQueryOutputSchema>;

export async function healthSummaryQuery(input: HealthSummaryQueryInput): Promise<HealthSummaryQueryOutput> {
  return healthSummaryQueryFlow(input);
}

const healthSummaryPrompt = ai.definePrompt({
  name: 'healthSummaryPrompt',
  input: {schema: HealthSummaryQueryInputSchema},
  output: {schema: HealthSummaryQueryOutputSchema},
  prompt: `You are an AI health assistant for an app named \"Alertraa\".
  Your purpose is to provide helpful, general health advice, diet suggestions, and safety precautions based on user query.
  Please provide the response in a concise, conversational tone. Use Markdown formatting like **bolding** and bullet points for lists to make the information easy to read.
  Use your knowledge and be creative to answer the following user query: {{{$input}}}`,
});

const healthSummaryQueryFlow = ai.defineFlow(
  {
    name: 'healthSummaryQueryFlow',
    inputSchema: HealthSummaryQueryInputSchema,
    outputSchema: HealthSummaryQueryOutputSchema,
  },
  async input => {
    const {output} = await healthSummaryPrompt(input);
    return output!;
  }
);
