"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import Input from "~/components/form-input";
import { Mail, Lock } from "~/components/icons";
import { login } from "~/actions/auth";
import { type LoginSchemaT, loginSchema } from "~/lib/schema";
import { SIGNUP_URL, AUTH_REDIRECT_URL } from "~/lib/constants";

type ServerError = {
  fieldErrors?: Partial<Record<keyof LoginSchemaT, string[]>>;
  message?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginSchemaT>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginSchemaT) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      const formData = new FormData();

      formData.append("email", values.email);
      formData.append("password", values.password);

      const { error, data } = await login(formData);

      if (error || !data?.user) {
        const { fieldErrors, message } = (error || {}) as ServerError;

        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
            form.setError(fieldName as keyof LoginSchemaT, {
              type: "server",
              message: messages[0],
            });
          });
        } else {
          // fallback for general error
          setServerError(message || "Login failed. Please try again.");
        }
      } else {
        router.push(AUTH_REDIRECT_URL);
      }
    } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars, prettier/prettier
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col items-center justify-center space-y-8 rounded-3xl border-4 bg-white p-8 text-center md:max-w-[600px] lg:mx-0 lg:max-w-5/12 lg:rounded-none lg:rounded-r-3xl">
      <h1 className="text-notex-text pb-4 text-5xl font-black tracking-tight uppercase">
        Login
      </h1>

      {serverError && (
        <div className="w-full rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            control={form.control}
            fieldName="email"
            icon={<Mail className="h-6 w-6" />}
            placeholder="Email"
            type="email"
          />
          <Input
            showPasswordToggle
            control={form.control}
            fieldName="password"
            icon={<Lock className="h-6 w-6" />}
            placeholder="Password"
            type="password"
          />
          <div className="flex justify-center pt-4">
            <Button
              // className="bg-notex-accent hover:bg-notex-text h-12 rounded-full px-16 text-base font-semibold tracking-wide text-white uppercase"
              className="bg-notex-accent hover:bg-notex-text h-12 rounded-full px-16 text-base font-semibold tracking-wide text-white uppercase disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600">
        New here?{" "}
        <Link
          className="text-notex-accent font-medium hover:underline"
          href={SIGNUP_URL}
        >
          Create an Account
        </Link>
      </p>
    </div>
  );
}
