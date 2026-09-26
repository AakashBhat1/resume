"use server";

import { headers } from "next/headers";
import { sendContactMail } from "@/lib/mailer";
import { allowContactSubmission } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations";
import { ContactFormState } from "@/app/actions/contact-state";

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = String(formData.get("hp_field_x") ?? "");

  if (honeypot) {
    return {
      status: "success",
      message: "Message sent successfully.",
    };
  }

  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;

    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: {
        name: errors.name?.[0],
        email: errors.email?.[0],
        message: errors.message?.[0],
      },
    };
  }

  try {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    if (!allowContactSubmission(ip)) {
      return {
        status: "error",
        message: "You've sent several messages recently. Please try again in 10 minutes.",
      };
    }

    await sendContactMail({
      senderName: parsed.data.name,
      senderEmail: parsed.data.email,
      message: parsed.data.message,
    });

    return {
      status: "success",
      message: "Thanks for reaching out. Your message has been sent.",
    };
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return {
      status: "error",
      message: "Unable to send message right now. Please try again later.",
    };
  }
}
