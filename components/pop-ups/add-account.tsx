"use client";
import type { status } from "@/types/ui";

import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { useState } from "react";

import brokers from "@/mockData/brokers-list";
import { ButtonRoundedBlue } from "@/components/button-rounded";
import PopupWrapper from "@/components/pop-ups/popup-wrapper";
import PopupHeader, {
  Header4Left,
} from "@/components/pop-ups/styled-popup-header";
import { selectStyle, inputStyleInner } from "@/styles/style-variables";

interface NewAccountData {
  sectionName: string;
  data: Record<string, string>;
}

export default function AddAccountModal({ onClose }: { onClose: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [accountData, setAccountData] = useState<NewAccountData>({
    sectionName: "",
    data: {},
  });

  const [status, setStatus] = useState<status>("idle");

  function handleSelect(broker: string) {
    setActiveSection(broker);
    setAccountData((prev) => ({ ...prev, sectionName: broker }));
  }

  function handleAccountData(dvalue: string, tvalue: string) {
    if (!activeSection) return;

    setAccountData((prev) => ({
      ...prev,
      sectionName: activeSection,
      data: { ...prev.data, [dvalue]: tvalue }, // upsert одной строкой
    }));
  }

  async function addAccount(activeSection: string) {
    if (activeSection) {
      setStatus("loading");
      console.log("New account data", accountData);
      setTimeout(() => {
        setStatus("success");

        onClose();
      }, 3000);
      /* await apiFetch("/auth/accounts", {
        method: "POST",
        body: JSON.stringify({  }),
      }); */
    }
  }

  return (
    <PopupWrapper
      deeper={true}
      h="426px"
      isLoading={status === "loading"}
      reducePb={true}
      w="380px"
      onClose={onClose}
    >
      {/* Header */}
      <div
        className={`flex flex-col gap-5 text-left ${status === "loading" && "opacity-20"}`}
      >
        <PopupHeader>Add account</PopupHeader>
        <div>
          <Header4Left>Choose a broker</Header4Left>
          <Select
            classNames={{
              trigger: selectStyle,
            }}
            id="choose-broker"
            placeholder="Broker's name"
            onChange={(e) => handleSelect(e.target.value)}
          >
            {brokers.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        {activeSection === "roboforex" && (
          <div>
            <div className="flex flex-col gap-2.5">
              <Header4Left>Enter the data</Header4Left>
              {brokers[0].data.map((data) => (
                <Input
                  key={data.value}
                  classNames={{ inputWrapper: inputStyleInner }}
                  placeholder={data.value}
                  type={data.type}
                  onChange={(e) =>
                    handleAccountData(data.value, e.target.value)
                  }
                  // RoboForex MT4: 1) MT4/MT5, 2) Server, 3) Login, 4) Password | console.log({ 'data1.value': data.value, value1: e.target.value})
                />
              ))}
            </div>
          </div>
        )}
        {activeSection === "binance" && (
          <div>
            <div className="flex flex-col gap-2.5">
              <Header4Left>Enter the key</Header4Left>
              {brokers[1].data.map((data) => (
                <Input
                  key={data.value}
                  classNames={{ inputWrapper: inputStyleInner }}
                  placeholder={data.value}
                  type={data.type}
                  onChange={(e) =>
                    handleAccountData(data.value, e.target.value)
                  }
                  // Binance: 1) "API key", 2) "Secret key" | console.log({ 'data2.value': data.value, value2: e.target.value})
                />
              ))}
            </div>
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
