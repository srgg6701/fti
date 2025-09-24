"use client";
import type { status } from "@/types/ui";

import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { useState } from "react";

import Brokers, { type brokerData } from "@/mockData/brokers-list";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader, {
  Header4Left,
} from "@/components/pop-ups/styled-popup-header";
import { selectStyle, inputStyleInner } from "@/styles/style-variables";
import ErrMess from "@/components/errMess";
import { validatePassword } from "@/lib/utils";

interface NewAccountData {
  sectionName: string;
  data: Record<string, string>;
}

function validateField(field: brokerData, val: string): string | null {
  const label = field.title;
  const value = (val ?? "").trim();

  // 0) пусто
  if (!value) return `${label} is required`;

  // 1) Select (список допустимых значений)
  if (Array.isArray(field.value)) {
    if (!field.value.includes(value)) {
      return `${label} must be one of: ${field.value.join(", ")}`;
    }

    return null;
  }

  if (field.value === "password") {
    const res = validatePassword(value, {
      min: 8,
      max: 128,
      allowUnicode: false,
      allowSpaces: false,
    });

    if (!res.valid) {
      const map: Record<string, string> = {
        empty: `${label} is required`,
        too_short: `${label} is too short (min 8)`,
        too_long: `${label} is too long`,
        whitespace: `${label} must not contain spaces`,
        invalid_char: `${label} must be ASCII only`,
        lower: `${label} must contain a lowercase letter`,
        upper: `${label} must contain an uppercase letter`,
        digit: `${label} must contain a digit`,
        symbol: `${label} must contain a symbol`,
        repeat: `${label} has too many repeated chars`,
        sequence: `${label} must not contain sequences (e.g. 1234 / abcd)`,
        common: `${label} is too common`,
      };

      return map[res.reason!] ?? `${label} is invalid`;
    }

    return null;
  }

  const noSpaces = /\s/.test(value);

  if (noSpaces) return `${label} must not contain spaces`;

  // per-field heuristics
  if (label === "Server") {
    if (value.length < 3 || value.length > 64)
      return `${label} length must be 3–64`;

    return null;
  }

  if (label === "Login") {
    if (value.length < 3 || value.length > 32)
      return `${label} length must be 3–32`;

    return null;
  }

  if (label === "API key") {
    if (value.length < 10 || value.length > 128)
      return `${label} length must be 10–128`;

    return null;
  }

  if (label === "Secret key") {
    if (value.length < 16 || value.length > 128)
      return `${label} length must be 16–128`;

    return null;
  }

  return null;
}

export default function AddAccountModal({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [accountData, setAccountData] = useState<NewAccountData>({
    sectionName: "",
    data: {},
  });

  const [status, setStatus] = useState<status>("idle");
  // Ошибки по полям: { "Server": "msg", "Login": null, ... }
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  function handleSelect(broker: string) {
    setActiveSection(broker);
    setAccountData((prev) => ({ ...prev, sectionName: broker, data: {} }));
    setErrors({});
  }

  // key: "serverName", value: "Server",
  function handleAccountData(key: string, label: string, value: string) {
    if (!activeSection) return;

    setAccountData((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: value },
    }));

    const fields = Brokers.find((b) => b.key === activeSection)!.data;
    const field = fields.find((f) => f.title === label)!;

    const msg = validateField(field, value);

    setErrors((prev) => ({ ...prev, [label]: msg }));
  }

  async function addAccount(activeSection: string) {
    // final check
    const broker = Brokers.find((b) => b.key === activeSection)!;
    const nextErrors: Record<string, string | null> = {};

    for (const f of broker.data) {
      nextErrors[f.title] = validateField(f, accountData.data[f.key] ?? "");
    }

    const hasErrors = Object.values(nextErrors).some(Boolean);

    setErrors(nextErrors);
    if (hasErrors) return;

    // всё ок — отправляем
    setStatus("loading");

    let accountPath = "";

    switch (activeSection) {
      case "binance":
        accountPath = "binance";
        break;
      case "bybit":
        accountPath = "bybit";
        break;
      default:
        accountPath = "forex-account";
        break;
    }

    const addedAccountData = { ...accountData.data };

    addedAccountData.broker = Brokers.find(
      (obj) => obj.key === activeSection,
    )!.label;

    console.log("New account data", {
      accountPath,
      accountData,
      addedAccountData,
    });

    /* await apiFetch(`/trading-accounts/add-${accountPath}`, {
      method: "POST",
      body: JSON.stringify({
        
        broker: Brokers[activeSection].label // RoboForex,
        platform: Brokers[activeSection].data.*platform //MT5,
        accountNumber Brokers[activeSection].data.*login
        
        serverName: Brokers[activeSection].data.*serverName
        password: Brokers[activeSection].data.*password
        

        apiKey: Brokers[activeSection].data.*apiKey
        secretKey: Brokers[activeSection].data.*secretKey
      }),
    }); */

    setTimeout(() => {
      setStatus("success");
      onClose();
    }, 1500);
  }

  return (
    <PopupWrapper
      deeper
      reducePb
      h="426px"
      isLoading={status === "loading"}
      w="380px"
      onClose={onClose}
    >
      <div
        className={`flex flex-col gap-5 text-left ${status === "loading" && "opacity-20"}`}
      >
        <PopupHeader>Add account</PopupHeader>

        <div>
          <Header4Left>Choose a broker</Header4Left>
          <Select
            classNames={{ trigger: selectStyle }}
            id="choose-broker"
            placeholder="Broker's name"
            onChange={(e) => handleSelect(e.target.value)}
          >
            {Brokers.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>

        {activeSection === "roboforex" && (
          <div className="flex flex-col gap-2.5">
            <Header4Left>Enter the data</Header4Left>
            {Brokers[0].data.map((field) =>
              typeof field.value === "string" ? (
                <div key={field.title}>
                  <Input
                    classNames={{ inputWrapper: inputStyleInner }}
                    placeholder={field.title}
                    type={field.value}
                    onChange={(e) =>
                      handleAccountData(field.key, field.title, e.target.value)
                    }
                  />
                  <ErrMess error={errors[field.title]} />
                </div>
              ) : Array.isArray(field.value) ? (
                <div key={field.title}>
                  <Select
                    classNames={{ trigger: selectStyle }}
                    placeholder={field.title}
                    onChange={(e) =>
                      handleAccountData(field.key, field.title, e.target.value)
                    }
                  >
                    {field.value.map((option) => (
                      <SelectItem key={option}>{option}</SelectItem>
                    ))}
                  </Select>
                  <ErrMess error={errors[field.title]} />
                </div>
              ) : null,
            )}
          </div>
        )}

        {activeSection === "binance" && (
          <div className="flex flex-col gap-2.5">
            <Header4Left>Enter the key</Header4Left>
            {Brokers[1].data.map((field) => (
              <div key={field.title}>
                <Input
                  classNames={{ inputWrapper: inputStyleInner }}
                  placeholder={field.title}
                  type={field.value as string}
                  onChange={(e) =>
                    handleAccountData(field.key, field.title, e.target.value)
                  }
                />
                <ErrMess error={errors[field.title]} />
              </div>
            ))}
          </div>
        )}

        {activeSection && (
          <ButtonRoundedBlue
            btnText="Add"
            onClick={() => addAccount(activeSection)}
          />
        )}
      </div>
    </PopupWrapper>
  );
}
