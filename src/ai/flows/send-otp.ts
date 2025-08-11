'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a one-time password (OTP).
 *
 * It includes:
 * - `sendOtp`: An asynchronous function that generates a 6-digit OTP.
 * - `SendOtpInput`: The input type for the sendOtp function.
 * - `SendOtpOutput`: The output type for the sendOtp function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the OTP generator.
const SendOtpInputSchema = z.object({
  email: z.string().email().describe('The email address to send the OTP to.'),
});

// Define the TypeScript type for the input schema
export type SendOtpInput = z.infer<typeof SendOtpInputSchema>;

// Define the output schema for the OTP generator.
const SendOtpOutputSchema = z.object({
  otp: z.string().length(6).describe('The 6-digit one-time password.'),
});

// Define the TypeScript type for the output schema
export type SendOtpOutput = z.infer<typeof SendOtpOutputSchema>;

// Exported function to generate an OTP
export async function sendOtp(
  input: SendOtpInput
): Promise<SendOtpOutput> {
  return sendOtpFlow(input);
}

// Define the Genkit flow for generating the OTP.
const sendOtpFlow = ai.defineFlow(
  {
    name: 'sendOtpFlow',
    inputSchema: SendOtpInputSchema,
    outputSchema: SendOtpOutputSchema,
  },
  async (input) => {
    // In a real application, you would use a secure random number generator.
    // For this prototype, Math.random is sufficient.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, you would integrate an email service (like Nodemailer or SendGrid) here to send the OTP.
    // For this prototype, we will just log it to the console for demonstration purposes.
    console.log(`OTP for ${input.email}: ${otp}`);

    return { otp };
  }
);
