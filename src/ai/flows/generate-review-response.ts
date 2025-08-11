'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating suggested responses to user reviews.
 *
 * It includes:
 * - `generateReviewResponse`: An asynchronous function that takes user review content and generates a suggested response.
 * - `GenerateReviewResponseInput`: The input type for the generateReviewResponse function, defining the structure of the user review data.
 * - `GenerateReviewResponseOutput`: The output type for the generateReviewResponse function, defining the structure of the generated response.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the review response generator.
const GenerateReviewResponseInputSchema = z.object({
  reviewContent: z
    .string()
    .describe('The content of the user review for the facility.'),
}); 

// Define the TypeScript type for the input schema
export type GenerateReviewResponseInput = z.infer<
  typeof GenerateReviewResponseInputSchema
>;

// Define the output schema for the review response generator.
const GenerateReviewResponseOutputSchema = z.object({
  suggestedResponse: z
    .string()
    .describe('The AI-generated suggested response to the user review.'),
});

// Define the TypeScript type for the output schema
export type GenerateReviewResponseOutput = z.infer<
  typeof GenerateReviewResponseOutputSchema
>;

// Exported function to generate a review response
export async function generateReviewResponse(
  input: GenerateReviewResponseInput
): Promise<GenerateReviewResponseOutput> {
  return generateReviewResponseFlow(input);
}

// Define the prompt for the review response generator.
const generateReviewResponsePrompt = ai.definePrompt({
  name: 'generateReviewResponsePrompt',
  input: {schema: GenerateReviewResponseInputSchema},
  output: {schema: GenerateReviewResponseOutputSchema},
  prompt: `You are a helpful AI assistant designed to help a facility owner respond to user reviews.

  Generate a response to the following user review, incorporating details from the review where appropriate to show you understand the user's feedback. Make the response sound friendly and professional.

  Review Content: {{{reviewContent}}}
  `,
});

// Define the Genkit flow for generating review responses.
const generateReviewResponseFlow = ai.defineFlow(
  {
    name: 'generateReviewResponseFlow',
    inputSchema: GenerateReviewResponseInputSchema,
    outputSchema: GenerateReviewResponseOutputSchema,
  },
  async input => {
    const {output} = await generateReviewResponsePrompt(input);
    return output!;
  }
);
