"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import Input from "~/components/form-input";
import { Mail, Lock } from "~/components/icons";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginFormx() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values); // integrate with API
  };

  return (
    // < className="flex min-h-screen w-full max-w-[600px] flex-col items-center justify-center space-y-8 rounded-none border-4 bg-white p-8 text-center sm:max-w-5/12 sm:rounded-r-3xl">
    <div className="flex min-h-screen w-full max-w-[600px] flex-col items-center justify-center space-y-8 rounded-3xl border-4 bg-white p-8 text-center mx-auto md:max-w-[600px] lg:mx-0 lg:max-w-5/12 lg:rounded-none lg:rounded-r-3xl">
      <h1 className="text-notex-text pb-4 text-5xl font-black tracking-tight uppercase">
        Login
      </h1>

      <Form {...form}>
        <form
          className="space-y-4 border-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Input
            control={form.control}
            fieldName="email"
            icon={<Mail className="h-6 w-6" />}
            placeholder="Email"
            type="email"
          />
          <Input
            control={form.control}
            fieldName="password"
            icon={<Lock className="h-6 w-6" />}
            placeholder="Password"
            type="password"
          />
          <div className="flex justify-center pt-4">
            <Button
              className="bg-notex-accent hover:bg-notex-text h-12 rounded-full px-16 text-base font-semibold tracking-wide text-white uppercase"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600">
        New here?{" "}
        <Link
          className="text-notex-accent font-medium hover:underline"
          href="/signup"
        >
          Create an Account
        </Link>
      </p>
    </div>
    // </div>
  );
}
