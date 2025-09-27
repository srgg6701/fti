"use client"; // TODO: check if it should be a client component
import { useState, useEffect } from "react";
import Image from "next/image";
//import { useRouter } from "next/navigation";

import HomeSections from "@/components/dataSections";
import AddAccount from "@/components/pop-ups/add-account";
import AccountAdded from "@/components/pop-ups/account-added";
import { apiFetch } from "@/lib/api";

export default function Home() {
  //const router = useRouter();

  const [isAddAccountOpen, setAddAccount] = useState<boolean | null>(null);
  const [isAccountAddOpen, setAccountAddOpen] = useState<boolean | null>(null);
  const [addedData, setAddedData] = useState<{
    accountNumber: string;
    broker: string;
    platform?: string;
  } | null>(null);

  function addAddAccount() {
    setAddAccount(true);
  }
  function closeAddAccount(
    accountNumber?: string,
    broker?: string,
    platform?: string,
  ) {
    setAddAccount(null);
    setAccountAddOpen(true);
    if (accountNumber && broker) {
      setAddedData({ accountNumber, broker, platform });
    }
  }
  function closeAccountAddedAndRedirect() {
    setAccountAddOpen(false);
    //router.push("/home/strategies");
  }

  useEffect(() => {
    (async () => {
      const userAccounts = await apiFetch(
        "/api/trading-accounts/user-accounts",
      );

      console.log("userAccounts", userAccounts);
    })();
  });

  return (
    <>
      <section className="mx-auto py-[80px]">
        <div className="mx-auto flex w-full max-w-[370px] flex-col text-center">
          <h2 className="text-lg font-medium">
            You don&apos;t have any strategies at the moment
          </h2>
          <div className="my-[10px]">Add your first strategy</div>
          <button className="text-center" onClick={addAddAccount}>
            <Image
              alt="Add your first strategy"
              className="mx-auto"
              height="45"
              src="/assets/images/cross/plus.svg"
              style={{ cursor: "pointer" }}
              width="45"
            />
          </button>
        </div>
      </section>
      <HomeSections section="home" />
      {(isAddAccountOpen && (
        <AddAccount
          onClose={closeAddAccount}
          onCloseModal={() => setAddAccount(false)}
        />
      )) ||
        null}
      {isAccountAddOpen && (
        <AccountAdded
          accountNumber={addedData?.accountNumber}
          broker={addedData?.broker}
          platform={addedData?.platform}
          onClick={closeAccountAddedAndRedirect}
          onClose={closeAccountAddedAndRedirect}
        />
      )}
    </>
  );
}
