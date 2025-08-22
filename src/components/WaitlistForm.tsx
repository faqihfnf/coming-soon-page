"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, WaitlistFormValues } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail, Shield, User } from "lucide-react";
import { toast } from "sonner";

export default function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      agreeToTerms: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      const apiUrl = process.env.NEXT_PUBLIC_WAITLIST_API_URL;

      if (!apiUrl) {
        throw new Error("API URL tidak terkonfigurasi");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          timestamp: new Date().toISOString(),
        }),
      });

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        throw new Error("Gagal mendaftar. Silakan coba lagi.");
      }

      // Check if response is JSON
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        // Handle text response
        const text = await response.text();
        return { message: text, success: true };
      }
    },
    onSuccess: () => {
      console.log("Data berhasil dikirim!");
      setIsSuccess(true);
      reset();
      toast.success("Anda telah terdaftar di daftar tunggu kami.");
    },
    onError: (error) => {
      console.error("Terjadi kesalahan:", error);
      toast.error("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    },
  });

  const onSubmit = (data: WaitlistFormValues) => {
    mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
            Terima Kasih!
          </h3>
          <p className="text-green-700 dark:text-green-300">
            Anda telah berhasil terdaftar di daftar tunggu kami. Kami akan
            menghubungi Anda segera!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              {...register("name")}
              type="text"
              placeholder="Nama lengkap Anda..."
              className={`pl-10 h-12 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500 text-white"
                  : "border-slate-300 focus:ring-indigo-500 text-white"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              {...register("email")}
              type="email"
              placeholder="Masukkan email Anda..."
              className={`pl-10 h-12 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 text-white"
                  : "border-slate-300 focus:ring-indigo-500 text-white"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions Checkbox */}
        <div className="space-y-2">
          <div className="flex items-start space-x-3">
            <input
              {...register("agreeToTerms")}
              type="checkbox"
              id="agreeToTerms"
              className={`mt-1 h-4 w-4 rounded border-2 text-indigo-600 focus:ring-indigo-500 ${
                errors.agreeToTerms ? "border-red-500" : "border-slate-300"
              }`}
            />
            <label
              htmlFor="agreeToTerms"
              className="text-sm text-slate-300 leading-relaxed cursor-pointer">
              Saya setuju dengan{" "}
              <span className="text-indigo-400 hover:text-indigo-500 underline">
                Syarat & Ketentuan
              </span>{" "}
              yang berlaku
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors duration-200 cursor-pointer">
          {isPending ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Mendaftar...
            </>
          ) : (
            "Daftar Tunggu"
          )}
        </Button>
      </form>
    </div>
  );
}
