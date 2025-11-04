"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
//import { useRouter } from "next/navigation";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import {
  ButtonRoundedGrey,
  ButtonRoundedBlue,
} from "@/components/button-rounded";
import { getUrlSegments } from "@/lib/utils";

type ButtonsProps = {
  messageType: string;
  status?: string;
  type: "button" | "submit" | "reset" | undefined;
};

export default function Buttons({ messageType, status, type }: ButtonsProps) {
  //const router = useRouter();
  const urlFirstSegment = getUrlSegments(usePathname, 1);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      console.error("ID Token is missing in credential response.");

      return;
    }

    console.log("ID Token successfully received.");

    try {
      // GOOGLE_AUTH_ENDPOINT
      const apiResponse = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken: idToken }),
      });

      const responseText = await apiResponse.text();

      if (apiResponse.ok) {
        let jwt: string | null = null;

        try {
          const parsed = JSON.parse(responseText) as {
            jwt?: string;
            token?: string;
            access_token?: string;
            accessToken?: string;
          };

          jwt =
            parsed.jwt ??
            parsed.token ??
            parsed.access_token ??
            parsed.accessToken ??
            null;
        } catch (error) {
          console.log("Auth response is not JSON:", error);
        }

        if (jwt) {
          const maxAge = 60 * 60; // 1h

          document.cookie = `jwt=${jwt}; Max-Age=${maxAge}; Path=/;${
            window.location.protocol === "https:" ? " Secure;" : ""
          } SameSite=Lax`;
        } else {
          console.warn("Auth success response does not include a JWT token.");
        }

        console.log(
          "Auth successful. Redirecting to /home. Raw response:",
          responseText || "<empty>"
        );

        window.location.href = "/home";
      } else {
        console.error("API Error:", responseText || "<empty>");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="mx-auto mt-auto flex w-full max-w-[300px] flex-col items-center">
      <div className="w-full relative h-[48px]">
        <div
          className="absolute top-0 left-0 w-full opacity-0"
          style={{ position: "absolute", bottom: "0", zIndex: 2 }}
        >
          <GoogleLogin
            locale="en_US"
            text="signin_with"
            theme="outline"
            type="standard"
            width={"100%"}
            onError={() => {
              console.log("Login Failed");
            }}
            onSuccess={handleSuccess}
          />
        </div>
        <ButtonRoundedGrey
          startContent={
            <Image
              alt="Google"
              height={18}
              src="/assets/images/icons/google.svg"
              width={18}
            />
          }
          style={{ position: "absolute", bottom: "0", zIndex: 1 }}
        />
      </div>
      <ButtonRoundedBlue type={type} />
      {(urlFirstSegment !== siteConfig.innerItems.auth.login.href_ui &&
        urlFirstSegment !== siteConfig.innerItems.auth.logout.href_ui && (
          <p className="mt-[11.5px] text-sm">
            {messageType === "have-you-account" &&
              "Do you already have an account?"}
            <Link
              className="ml-1 font-bold"
              href={siteConfig.innerItems.auth.login.href_ui}
            >
              Log in
            </Link>
          </p>
        )) ||
        null}
      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  );
}
