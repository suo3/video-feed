"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletterAction } from "@/app/actions";
import { redirect } from "next/navigation";

export default function VlogSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(email);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await subscribeToNewsletterAction(email);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    } finally {
      setIsSubmitting(false);
      setEmail("");
      redirect("/");
    }
  };

  return (
    <section className="w-full bg-[#1e3a8a] py-16 px-0 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          You will love Vlog
        </h2>

        <p className="mb-8 text-base md:text-lg">
          The highest quality video content, handpicked for your viewing
          pleasure. Get updates on our new videos, special offers, and exciting
          promotions right to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white text-black h-12 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className={` ${isSubmitting ? "bg-green-600" : "bg-purple-600"} hover:bg-purple-700 text-white font-medium h-12 px-6 sm:whitespace-nowrap`}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>

        <p className="mt-4 text-sm opacity-90">
          Content created by professional travelers and camera operators. Join
          us now!
        </p>
      </div>
    </section>
  );
}
