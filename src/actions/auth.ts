"use server";

import { revalidatePath } from "next/cache";
import { type SignOut as SignOutScope } from "@supabase/supabase-js";

import { createClient } from "~/utils/supabase/server";
import {
  type LoginSchemaT,
  type SignupSchemaT,
  loginSchema,
  signupSchema,
  safeParse,
} from "~/lib/schema";
// import { sleep } from "~/lib/utils";

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { error, user: null };
  }

  return { status: "success", ...(data || {}) };
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  } as LoginSchemaT;
  const [parsedErrors, parsedData] = safeParse(loginSchema, credentials);

  if (parsedErrors) {
    return { error: { fieldErrors: parsedErrors } };
  }

  const { data, error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    // redirect(ERROR_URL);
    return { error };
  }
  revalidatePath("/", "layout");

  return { status: "success", data };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("password"),
  } as SignupSchemaT;
  const [parsedErrors, parsedData] = safeParse(signupSchema, credentials);

  if (parsedErrors) {
    return { error: { fieldErrors: parsedErrors } };
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsedData.email,
    password: parsedData.password,
    options: {
      data: {
        username: parsedData.username,
      },
    },
  });

  if (error) {
    // redirect(ERROR_URL);
    return { error };
  }
  revalidatePath("/", "layout");

  return { status: "success", data };
}

export async function signOut(scope?: SignOutScope) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut(scope);

  if (error) {
    // redirect(ERROR_URL);
    return { error };
  }
  revalidatePath("/", "layout");

  // redirect(HOME_URL);
  return { status: "success" };
}
