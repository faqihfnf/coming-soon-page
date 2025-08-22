import { z } from "zod";

export const waitlistSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(50, { message: "Nama maksimal 50 karakter" }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui Syarat & Ketentuan",
  }),
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>;
