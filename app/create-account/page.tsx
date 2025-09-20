"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@heroui/input";

import Form from "@/components/create-account/form";
import ErrMess from "@/components/errMess";
import { validateEmail } from "@/lib/utils";

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
      let errMess = "";

      switch (emailValid.reason) {
        case "too_long":
          errMess = "Too long email";
          break;
        case "at":
          errMess = "'@' is missed";
          break;
        case "local_too_long":
          errMess = "You put too many characters before '@'";
          break;
        case "local_chars":
          errMess = "You used invalid characters";
          break;
        case "local_dots":
          errMess = "You used '.' in wrong position or with wrong sequence";
          break;
        case "domain_length":
          errMess = "You put too less characters after '@'";
          break;
        case "no_tld":
          errMess = "Wrong value after '@'";
          break;
        case "domain_label":
          errMess = "Wrong characters after '@'";
          break;
        case "tld":
          errMess = "Wrong domain ending";
          break;
        default:
          errMess = "Please, enter your email";
          break;
      }
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
