"use server";

import { generateReviewResponse } from "@/ai/flows/generate-review-response";
import { sendOtp } from "@/ai/flows/send-otp";
import { z } from "zod";
import { redirect } from "next/navigation";

const reviewSchema = z.object({
  reviewContent: z.string(),
});

export async function getReviewResponse(prevState: any, formData: FormData) {
  const validatedFields = reviewSchema.safeParse({
    reviewContent: formData.get("reviewContent"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input.",
      suggestedResponse: "",
    };
  }

  try {
    const result = await generateReviewResponse(validatedFields.data);
    return {
      message: "Response generated successfully.",
      suggestedResponse: result.suggestedResponse,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to generate response.",
      suggestedResponse: "",
    };
  }
}

const sendOtpSchema = z.object({
  email: z.string().email(),
  role: z.string().optional(),
});

export async function sendOtpAction(prevState: any, formData: FormData) {
  const validatedFields = sendOtpSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid email address.",
    };
  }
  
  try {
    const { otp } = await sendOtp(validatedFields.data);
    
    // In a real application, you would store a hash of the OTP along with an expiry time in your database.
    // For this prototype, we'll pass the OTP and email to the verification page via search parameters.
    // This is NOT secure for a production environment.
    const params = new URLSearchParams({
        email: validatedFields.data.email,
        role: validatedFields.data.role || 'player',
        otp_secret: otp // This would be a hash in a real app
    });
    
    redirect(`/verify-otp?${params.toString()}`);

  } catch (error) {
    console.error(error);
    return {
      message: "Failed to send OTP.",
    };
  }
}


const verifyOtpSchema = z.object({
  otp: z.string().length(6),
  email: z.string().email(),
  role: z.string(),
  otp_secret: z.string().length(6),
});


export async function verifyOtpAction(prevState: any, formData: FormData) {
    const validatedFields = verifyOtpSchema.safeParse({
        otp: formData.get("otp"),
        email: formData.get("email"),
        role: formData.get("role"),
        otp_secret: formData.get("otp_secret"),
    });

    if (!validatedFields.success) {
        return { message: "Invalid input. Please try again." };
    }

    const { otp, email, role, otp_secret } = validatedFields.data;

    // In a real app, you would fetch the hashed OTP from your DB and compare it.
    // We are comparing the plain text OTP here for demonstration purposes only.
    if (otp === otp_secret) {
        // On successful verification, redirect the user to their respective dashboard.
        switch (role) {
            case 'admin':
                redirect('/admin/dashboard');
            case 'owner':
                redirect('/owner/dashboard');
            default:
                redirect('/bookings');
        }
    } else {
        return { message: "Invalid OTP. Please try again." };
    }
}
