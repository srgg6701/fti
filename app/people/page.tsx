"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import InviteFriendsContent from "@/components/invite-friends";
import InviteImage from "@/components/invite-friends/invite-image";
import { apiFetch } from "@/lib/api";
import { Partner } from "@/types/apiData";
import { Header4Left } from "@/components/pop-ups/styled-popup-header";

export default function People() {
  const [partners, setPartners] = useState<Partner[] | null>(null);

  useEffect(() => {
    try {
      (async () => {
        const prtnrs = await apiFetch<Partner[]>("/api/partners?isActive=true");

        setPartners(prtnrs);
      })();
    } catch (error) {}
  }, []);

  return (
    <section className="mx-auto max-w-[550px] pt-20 pb-[56px]">
      <InviteImage height={311} src="invite-a-friend-big.png" width={550} />
      <InviteFriendsContent refSyst={true} />
      <Header4Left $h="[21px]" $mBottom="5" $mTop="5">
        Our partners
      </Header4Left>
      {partners?.map((p) => (
        <button
          key={p.name}
          className="flex justify-between cursor-pointer w-full items-center p-2.5 pl-0"
          title="Visit our partner's site"
          onClick={() => {
            location.href = p.websiteUrl;
          }}
        >
          <div className="flex justify-start items-center">
            <Image
              alt={p.name}
              className="mr-5"
              height={55}
              src={
                p.logoUrl.includes("yandex")
                  ? "https://altcoinsbox.com/wp-content/uploads/2022/10/bybit-logo-white.png"
                  : p.logoUrl
              }
              width={55}
            />
            <span>{p.name}</span>
          </div>
          <Image
            alt="Go to partner's site"
            height={7}
            src="/assets/images/icons/arrows/pointer.png"
            width={5}
          />
        </button>
      ))}
    </section>
  );
}
