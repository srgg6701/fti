"use client";
import type { status } from "@/types/ui";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Switch } from "@heroui/react";
import { Form } from "@heroui/form";
import { FormEvent, useState } from "react";

import { useUserStore } from "@/lib/store/userStore";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import DeletingSubscritpionConfirmation from "@/components/pop-ups/deletingSubscriptionConfirmation";
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

const billingData = [
  {
    img: "plus",
    title: "Adding funds",
    desc: "Deposit from the account **** 5423",
    amount: "+ $ 324",
  },
  {
    img: "payment_success",
    title: "Payment",
    desc: "Payment for the standard service",
    amount: "$ 324",
  },
  {
    img: "payment_error",
    title: "Adding funds",
    desc: "Insufficient funds",
    amount: "- $ 324",
  },
  {
    img: "plus",
    title: "Adding funds",
    desc: "Deposit from the account **** 5423",
    amount: "+ $ 324",
  },
];

export default function Profile() {
  const user = useUserStore((s) => s.user);

  console.log("user", user);
  const router = useRouter();
  const [notificationIsOpen, setNotification] = useState<boolean>(false);

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [email, setEmail] = useState("");
  // FIXME: use it or remove
  const [status, setStatus] = useState<status>("idle");
  const [errMess, setErrMess] = useState<string | null>(null);

  const handleTariffBtn = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  // Handlers (placeholders)
  const handleVerification = () => {
    console.log("Handling verification...");
    window.alert("Handling verification...");
  };

  const goReferralPage = () => {
    router.push("/referral-system");
  };

  //const handleToggleDark = (checked: boolean) => {};

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

  const colorizeAmount = (amount: string): string | undefined => {
    switch (amount[0]) {
      case "+":
        return "color-blue-canonical";
      case "-":
        return "color-ultra-violet";
      default:
        break;
    }
  };

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
              src="/assets/images/users/user-joshua.svg"
              width={120}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="flex flex-col items-center gap-2.5">
                <h2 className="h-[28px] text-[28px]">
                  <Link
                    href={`/profile/personal-information?id=${user?.id || 69}`}
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
        {/* Billing (stacked with other sections) */}
        <section {...sectionParams}>
          <SectionHeader title="Billing" {...headerParams} />
          {billingData.map((item, idx) => (
            <div
              key={idx}
              className="my-2.5 flex min-h-[66px] flex-wrap items-center justify-between gap-3 rounded-xl py-2.5"
            >
              <div className="flex min-w-0 items-center gap-5">
                <Image
                  alt={item.title}
                  height={25}
                  src={`/assets/images/icons/billing/${item.img}_icon.png`}
                  width={25}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.title}</span>
                    <span className="text-xs opacity-50">1 day ago</span>
                  </div>
                  <div className="text-sm opacity-80">{item.desc}</div>
                </div>
              </div>
              <div className={`text-sm ${colorizeAmount(item.amount)}`}>
                {item.amount}
              </div>
            </div>
          ))}
        </section>
        {/* Verification */}
        <section className={verticalOffset}>
          <SectionHeader noLink={true} title="Verification" {...headerParams} />
          <ButtonRoundedGrey
            btnText="Verification page"
            fontSize="text-base"
            height="h-[45px]"
            width="w-[171px]"
            onClick={handleVerification}
            onPress={handleVerification}
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
          <ButtonRoundedGrey
            btnText="Referral system page"
            fontSize="text-base"
            height="h-[45px]"
            width="w-[204px]"
            onClick={goReferralPage}
            onPress={goReferralPage}
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
    </>
  );
}
