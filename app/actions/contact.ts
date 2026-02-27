"use server";

import { sendContactMail } from "@/lib/mailer";
import { contactSchema } from "@/lib/validations";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
};

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const honeypot = String(formData.get("company") ?? "");

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
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Unable to send message right now. Please try again later.",
    };
  }
}
