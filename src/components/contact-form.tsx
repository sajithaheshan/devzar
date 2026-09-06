"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Icon } from "./icon";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { subject: "General" } });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="brutal-box flex flex-col gap-4 bg-[var(--card-bg)] p-6">
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide">Name</label>
        <input {...register("name")} className="brutal-box-sm w-full bg-[var(--bg)] px-3 py-2.5 text-sm outline-none" />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide">Email</label>
        <input {...register("email")} className="brutal-box-sm w-full bg-[var(--bg)] px-3 py-2.5 text-sm outline-none" />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide">Subject</label>
        <input {...register("subject")} className="brutal-box-sm w-full bg-[var(--bg)] px-3 py-2.5 text-sm outline-none" />
        {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-wide">Message</label>
        <textarea rows={5} {...register("message")} className="brutal-box-sm w-full bg-[var(--bg)] px-3 py-2.5 text-sm outline-none" />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={submitting} className="btn-glow flex w-fit items-center gap-2 px-5 py-3 text-sm font-bold uppercase disabled:opacity-60">
        <Icon name="faEnvelope" className="h-4 w-4" />
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
