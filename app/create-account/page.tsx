"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";

import Form from "@/components/create-account/form";
import ErrMess from "@/components/errMess";
import { validateEmail, setInvalidEmailMessage } from "@/lib/utils";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("idle");
  // 'idle' | 'loading' | 'success' | 'error'
  const [errMess, setErrMess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrMess(null);
    if (!email) {
      setErrMess("Please enter your email");

      return;
    }
    const emailValid = validateEmail(email);

    if (!emailValid.valid) {
      const errMess = setInvalidEmailMessage(emailValid.reason);

      setErrMess(errMess);

      return;
    }
    try {
      setStatus("loading");

      /****** send request to the endpoint to get the confirmation code ******/

      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      router.push(`/create-account/set-password?email=${email}`);
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 1000);
    }
  }

  return (
    <Form
      messageType={["provide-your-email", "have-you-account"]}
      status={status}
      onSubmit={handleSubmit}
    >
      <Input
        className="standard-block-decoration-45"
        inputMode="email"
        placeholder="account@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrMess error={errMess} />
    </Form>
  );
}
