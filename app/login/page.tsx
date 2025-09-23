"use client";

import type { status } from "@/types/ui";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";

import Form from "@/components/create-account/form";
import { ApiUser, useUserStore } from "@/lib/store/userStore";
import ErrMess from "@/components/errMess";
import { apiFetch } from "@/lib/api";
import LoginResponse from "@/types/auth";

export default function LoginPage() {
  const loginUser = useUserStore((state) => state.login);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: unify this for all cases
  const [status, setStatus] = useState<status>("idle");
  const [errMess, setErrMess] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
      console.log("User is authenticated");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrMess(null);
    if (!email || !password) {
      setErrMess("Please fill in all fields.");

      return;
    }

    try {
      setStatus("loading");
      const resp: LoginResponse = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (resp?.success) {
        // подтянуть профиль и записать весь user в Zustand
        const me: { user: ApiUser } = await apiFetch("/auth/me");

        if (me?.user) {
          console.log("user data", me?.user);
          loginUser(me.user);
        } else {
          console.log("%cUser data has not delivered...", "color: red");
        }

        const next =
          new URLSearchParams(window.location.search).get("next") ||
          sessionStorage.getItem("reauth_from") ||
          "/home";

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
