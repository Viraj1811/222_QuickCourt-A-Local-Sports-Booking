"use server";

import { generateReviewResponse } from "@/ai/flows/generate-review-response";
import { z } from "zod";

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
