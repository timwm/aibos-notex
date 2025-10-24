import { z } from "zod/v4";

const MIN_PASSWORD_LENGTH = 6;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    ),
});

export type LoginSchemaT = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      ),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export type SignupSchemaT = z.infer<typeof signupSchema>;

export function safeParse<T extends z.ZodType>(schema: T, value: z.infer<T>) {
  const parseResult = schema.safeParse(value);

  if (parseResult.success) {
    return [null, parseResult.data] as const; // [ error, value ]
  }
  const errors: Record<string, string[]> = {};
  const flattenedErrors = z.flattenError(parseResult.error);

  for (const [key, messages] of Object.entries(flattenedErrors.fieldErrors)) {
    errors[key] = messages as string[];
  }

  return [errors, null] as const; // [ error, value ]
}
