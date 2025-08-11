"use client";

import { useActionState, useFormStatus } from "react";
import { getReviewResponse } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "@/components/StarRating";
import type { Review } from "@/lib/types";
import { Bot, CornerDownLeft, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const initialState = {
  message: "",
  suggestedResponse: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Generate Response
    </Button>
  );
}

export default function ReviewResponseGenerator({ review, venueName }: { review: Review, venueName: string }) {
  const [state, formAction] = useActionState(getReviewResponse, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={review.userAvatar} alt={review.user} data-ai-hint="person user"/>
            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{review.user} on {venueName}</CardTitle>
            <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
            <StarRating rating={review.rating} size="sm" className="mt-1" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="italic">"{review.comment}"</p>
      </CardContent>
      <CardFooter>
        <form action={formAction} ref={formRef} className="w-full space-y-4">
          <input type="hidden" name="reviewContent" value={review.comment} />
          {review.response ? (
             <div className="space-y-2">
                <label className="font-medium text-sm">Your Response:</label>
                <p className="text-sm p-3 bg-background rounded-md border">{review.response}</p>
             </div>
          ) : (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <label htmlFor={`response-${review.id}`} className="font-medium text-sm">Suggested Response</label>
                    <SubmitButton />
                </div>
                <Textarea
                    id={`response-${review.id}`}
                    name="suggestedResponse"
                    placeholder="Click 'Generate Response' to get an AI-powered suggestion..."
                    rows={4}
                    defaultValue={state.suggestedResponse}
                    key={state.suggestedResponse}
                />
                <Button variant="secondary" size="sm" className="w-full">
                    <CornerDownLeft className="mr-2 h-4 w-4"/>
                    Send Response
                </Button>
            </div>
          )}
        </form>
      </CardFooter>
    </Card>
  );
}
