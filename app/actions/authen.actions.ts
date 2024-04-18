"use server";
import {
  RegisterFormSchema,
  FormState,
  LoginFormSchema,
} from "@/app/lib/definitions";
import { callAPI } from "./adapter";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { NextResponse } from "next/server";

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const res = await callAPI("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.error) {
    return { message: res.message };
  }
  await createSession(res.id);
  redirect("/");
}

export async function register(state: FormState, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const res = await callAPI("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ email, password }),
  });
  if (res.error) {
    return { message: res.message };
  }
  redirect("/login");
}

export async function signOut() {
  deleteSession();
  redirect("/login");
}
