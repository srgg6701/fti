"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import { useUserStore } from "@/lib/store/userStore";
import { LogoFTI } from "@/components/icons";

export default function LogoutPage() {
  const logoutUser = useUserStore((state) => state.logout);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <div className="user-form-wrapper h-full m-[-80px]">
      <p className="mb-6 text-2xl font-medium">You have been logged out.</p>
      <p className="mb-8 text-base opacity-60">
        Thank you for using our service!
      </p>
      <LogoFTI className="mt-16 mb-28 max-w-[100%]" />
      <Link href={siteConfig.innerItems.login.href}>
        <ButtonRoundedBlue btnText="Go to Login Page" />
      </Link>
    </div>
  );
}
