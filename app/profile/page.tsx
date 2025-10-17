"use client";
import type { status } from "@/types/ui";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Switch } from "@heroui/react";
import { Form } from "@heroui/form";

import { siteConfig, routeAliases } from "@/config/site";
import { useUserStore } from "@/lib/store/userStore";
import Billing from "@/components/billing";
import BillingModal from "@/components/pop-ups/billing";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import DeletingSubscritpionConfirmation from "@/components/pop-ups/deleting-subscription-confirmation";
import SectionHeader from "@/components/sectionsWrapper/sectionHeader";
import { ButtonRoundedGrey } from "@/components/button-rounded";
import { validateEmail, setInvalidEmailMessage } from "@/lib/utils";
import ErrMess from "@/components/errMess";

const headerParams = {
  h: "h-[33px]",
  mb: "mb-5",
  textSize: "!text-[28px]",
  textWeight: "!font-semibold",

  seeAllHref: "/#",
};

const verticalOffset = "pt-[var(--offset-80)]";
const sectionParams = {
  className: `flex flex-col ${verticalOffset}`,
};

export default function Profile() {
  const user = useUserStore((s) => s.user);

  const router = useRouter();
  const [notificationIsOpen, setNotification] = useState<boolean>(false);
  const [billingIsOpen, setBillingModal] = useState<boolean>(false);

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [email, setEmail] = useState("");
  // FIXME: use it or remove
  const [status, setStatus] = useState<status>("idle");
  const [errMess, setErrMess] = useState<string | null>(null);

  const handleTariffBtn = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  const SectionBtnGrey = ({ page, link }: { page: string; link: string }) => (
    <ButtonRoundedGrey
      btnText={page}
      fontSize="text-base"
      height="h-[45px]"
      width="w-[171px]"
      onClick={() => router.push(link)}
      onPress={() => router.push(link)}
    />
  );

  //const handleToggleDark = (checked: boolean) => {};
  // TODO: Set the procedure
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
      alert("Set page to go!");
      //router.push(`/create-account/set-password?email=${email}`);
    } catch {
      setStatus("error");
    }
  }

  /* function deleteSubscription() {
    setNotification(true);
  } */

  function closeActive() {
    setNotification(false);
  }

  return (
    <>
      <div className="mx-auto max-w-[550px]">
        {/* Profile header */}
        <section {...sectionParams}>
          <div className="mx-auto flex flex-wrap items-center gap-4">
            <Image
              alt="avatar"
              className="h-[120px] w-[120px] rounded-2xl object-cover"
              height={120}
              role="button"
              src="/assets/images/users/joshua.svg"
              width={120}
              onClick={() => router.push("/accounts")}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-col items-center gap-2.5">
                <h2 className="h-[28px] text-[28px]">
                  <Link
                    href={`${siteConfig.innerItems.personal_information.href}/?id=${user?.id || 69}`}
                  >
                    {user?.username || "User name unknown"}
                  </Link>
                </h2>
                <div className="relative">
                  <ButtonRoundedBlue
                    bgColor={`bg-light ${isUpdateOpen && "opacity-20"}`}
                    btnImageParams={{
                      src: "assets/images/icons/tariff-plan-black.svg",
                      alt: "Tariff plan",
                      height: 13.67,
                      width: 13.67,
                      className: "ml-2.5",
                    }}
                    btnText="Tariff plan"
                    fontColor="text-[#030303]"
                    fontSize="text-sm"
                    height="!h-[27px]"
                    padding="!px-[10px] !py-[5px]"
                    textBeforeImage={true}
                    width="min-w-[112px]"
                    onClick={handleTariffBtn}
                  />
                  {isUpdateOpen && (
                    <div className="standard-colored-005-rounded absolute top-0 right-[-240px] p-5">
                      <h5 className="text-sm font-medium">Standard</h5>
                      <p className="mb-5 text-xs opacity-50">
                        Active until 24.03.2026
                      </p>
                      <button
                        className="relative z-2 h-10 w-[190px] cursor-pointer rounded-[40px] bg-gradient-to-r from-[#101BC3] to-[#FF33A6]"
                        onClick={() => router.push("/tariffplan")}
                      >
                        <span className="pr-[12.5px]">Update the plan</span>
                        <Image
                          alt="Tariff plan"
                          className="absolute top-[12.5px] right-5"
                          height={15}
                          src="/assets/images/icons/tariff-plan-white.svg"
                          width={15}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Billing */}
        <section {...sectionParams}>
          <SectionHeader
            title="Billing"
            onClick={() => setBillingModal(true)}
            {...headerParams}
          />
          <Billing />
        </section>
        {/* Accounts */}
        <section className={verticalOffset}>
          <SectionHeader noLink={true} title="Accounts" {...headerParams} />
          <SectionBtnGrey
            link={siteConfig.innerItems.accounts.href}
            page="Accounts page"
          />
        </section>
        {/* Verification */}
        <section className={verticalOffset}>
          <SectionHeader noLink={true} title="Verification" {...headerParams} />
          <SectionBtnGrey
            link={`${siteConfig.innerItems.personal_information.href}/?id=${user?.id || 69}`}
            page="Verification page"
          />
        </section>
        {/* Settings */}
        <section {...sectionParams}>
          <SectionHeader noLink={true} title="Settings" {...headerParams} />
          <div className="mb-5 flex items-center justify-between">
            <span className="text-lg font-semibold">Dark theme</span>
            <Switch defaultSelected size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              Fintech Innovation Trade, LLC
            </span>
            <span className="text-sm opacity-80">v1.54.444</span>
          </div>
        </section>
        <section className={verticalOffset}>
          <SectionHeader
            noLink={true}
            title="Referral system"
            {...headerParams}
          />
          <SectionBtnGrey
            link={routeAliases.people}
            page="Referral system page"
          />
        </section>
        {/* Support */}
        <section {...sectionParams}>
          <SectionHeader noLink={true} title="Support" {...headerParams} />
          <p className="mb-5 text-sm opacity-80">
            Specify your email address and describe the problem
          </p>
          <div className="flex flex-col">
            <Form
              className={`flex flex-col h-full w-full justify-center gap-5`}
              onSubmit={handleSubmit}
            >
              <Input
                className="w-full max-w-[300px]"
                classNames={{
                  input: "placeholder:opacity-30",
                }}
                inputMode="email"
                placeholder="account@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ErrMess error={errMess} mx="mx-0" my="!my-[-10px]" />
              <Textarea
                className="w-full"
                classNames={{
                  input: "placeholder:opacity-30",
                }}
                minRows={4}
                placeholder="Describe the problem..."
              />
              <div className="pb-[56px]">
                <ButtonRoundedBlue
                  btnText="Send"
                  height="h-[45px]"
                  type="submit"
                  width="w-full w-[300px]"
                />
              </div>
            </Form>
          </div>
        </section>
      </div>
      {(notificationIsOpen && (
        <DeletingSubscritpionConfirmation onCloseModal={closeActive} />
      )) ||
        null}
      {(billingIsOpen && (
        <BillingModal onClose={() => setBillingModal(false)} />
      )) ||
        null}
    </>
  );
}
