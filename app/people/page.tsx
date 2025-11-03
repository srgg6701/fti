"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import InviteFriendsContent from "@/components/invite-friends";
import InviteImage from "@/components/invite-friends/invite-image";
import { apiFetch } from "@/lib/api";
import { Partner } from "@/types/apiData";
import { Header4Left } from "@/components/pop-ups/styled-popup-header";

export default function People() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    const fetchPartners = async () => {
      try {
        const prtnrs = await apiFetch<Partner[]>("/api/partners?isActive=true");

        if (!isCancelled) {
          setPartners(prtnrs ?? []);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load partners list:", error);
          setPartners([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchPartners();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="mx-auto max-w-[550px] pt-20 pb-[56px]">
      <InviteImage height={311} src="invite-a-friend-big.png" width={550} />
      <InviteFriendsContent refSyst={true} />
      <Header4Left $h="[21px]" $mBottom="5" $mTop="5">
        Our partners
      </Header4Left>
      {isLoading ? (
        <p className="py-6 text-sm opacity-70">Loading partners...</p>
      ) : partners.length ? (
        partners.map((p) => (
          <a
            key={p.id ?? p.name}
            className="flex justify-between cursor-pointer w-full items-center p-2.5 pl-0"
            href={p.websiteUrl}
            rel="noopener noreferrer"
            target="_blank"
            title={`Visit ${p.name}`}
          >
            <div className="flex justify-start items-center">
              <Image
                alt={p.name}
                className="mr-5 rounded-sm"
                height={55}
                src={p.logoUrl}
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
          </a>
        ))
      ) : (
        <p className="py-6 text-sm opacity-70">
          Partner list is not available right now.
        </p>
      )}
    </section>
  );
}
