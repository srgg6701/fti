"use client";

import type { status } from "@/types/ui";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";

import { siteConfig } from "@/config/site";
import Form from "@/components/create-account/form";
import { useUserStore } from "@/lib/store/userStore";
import ErrMess from "@/components/errMess";
import { apiFetch } from "@/lib/api";
import LoginResponse from "@/types/auth";

export default function LoginPage() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const initializeUser = useUserStore((s) => s.initializeUser);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: unify this for all cases
  const [status, setStatus] = useState<status>("idle");
  const [errMess, setErrMess] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  // Redirect to /home only when store is hydrated (isAuthenticated + user)
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User is authenticated");
      router.push("/home");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMess(null);
    if (!email || !password) {
      setErrMess("Please fill in all fields.");

      return;
    }

    try {
      setStatus("loading");
      const resp: LoginResponse = await apiFetch(
        `/api${siteConfig.innerItems.auth.login.href}`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }
      );

      if (resp?.success) {
        console.log("Login successful:", resp);
        // Централизованно инициализируем стор (внутри initializeUser делается /me + refresh + дедупликация)
        const ok = await initializeUser();

        if (!ok) {
          setErrMess("Failed to initialize user after login.");
          setStatus("idle");

          return;
        }

        const next = // TODO: clarify this and the next code (sessionStorage)
          new URLSearchParams(window.location.search).get("next") ||
          sessionStorage.getItem("reauth_from") ||
          "/";

        console.log(
          "%cRedirecting after successful login to:",
          "color: lightskyblue",
          next
        );
        sessionStorage.removeItem("reauth_from");
        router.replace(next);

        return;
      }

      setErrMess("Login failed.");
    } catch (err) {
      setErrMess("Network or auth error. Please try again.");
      console.error(err);
    } finally {
      setTimeout(() => setStatus("idle"), 1000);
    }
  };

  return (
    <Form
      header="Login to your account"
      messageType={["provide-your-email", "have-you-account"]}
      status={status}
      onSubmit={handleSubmit}
    >
      <Input
        className="standard-block-decoration-45 mb-[10px]"
        placeholder="Enter your email"
        type="email"
        value={email}
        onValueChange={setEmail}
      />
      <Input
        className="standard-block-decoration-45"
        placeholder="Enter your password"
        type="password"
        value={password}
        onValueChange={setPassword}
      />
      <ErrMess error={errMess} />
    </Form>
  );
}
