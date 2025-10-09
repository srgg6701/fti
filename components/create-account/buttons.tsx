"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  ButtonRoundedGrey,
  ButtonRoundedBlue,
} from "@/components/button-rounded";
import { getUrlSegments } from "@/lib/utils";
import { requestGoogleIdToken } from "@/lib/google";
import { apiFetch } from "@/lib/api";
import { useUserStore } from "@/lib/store/userStore";

type ButtonsProps = {
  messageType: string;
  status?: string;
  type: "button" | "submit" | "reset" | undefined;
};

export default function Buttons({ messageType, status, type }: ButtonsProps) {
  const urlFirstSegment = getUrlSegments(usePathname, 1);
  const router = useRouter();
  const loginUser = useUserStore((s) => s.login);

  async function goGoogleSignIn() {
    console.log(
      "Google sign-in clicked, NEXT_PUBLIC_GOOGLE_CLIENT_ID=",
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    );
    try {
      // TODO: move client id to env/public config
      const clientId = (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim();

      if (!clientId) {
        console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");

        return;
      }

      const idToken = await requestGoogleIdToken(clientId);
      const resp: { success?: boolean } = await apiFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ idToken: idToken }),
      });

      if (resp?.success) {
        // fetch profile and log in, mirroring email/password flow
        const me: { user?: ReturnType<typeof Object> } = await apiFetch(
          `/api${siteConfig.innerItems.auth.me.href}`,
        );

        if (me?.user) {
          // Type cast to store's ApiUser
          loginUser(me.user as any);
        }

        const next =
          new URLSearchParams(window.location.search).get("next") ||
          sessionStorage.getItem("reauth_from") ||
          "/home";

        sessionStorage.removeItem("reauth_from");
        router.replace(next);
      }
    } catch (e) {
      console.error("Google login failed", e);
    }
  }

  return (
    <div className="mx-auto mt-auto flex w-full max-w-[300px] flex-col items-center">
      <ButtonRoundedGrey
        startContent={
          <Image
            alt="Google"
            height={18}
            src="/assets/images/icons/google.svg"
            width={18}
          />
        }
        onPress={goGoogleSignIn}
      />
      <ButtonRoundedBlue type={type} />
      {urlFirstSegment !== siteConfig.innerItems.login.href &&
        urlFirstSegment !== siteConfig.innerItems.logout.href && (
          <p className="mt-[11.5px] text-sm">
            {messageType === "have-you-account" &&
              "Do you already have an account?"}
            <Link
              className="ml-1 font-bold"
              href={siteConfig.innerItems.login.href}
            >
              Log in
            </Link>
          </p>
        )}
      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
