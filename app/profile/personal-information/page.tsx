"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import Camera from "@/components/pop-ups/camera";

type PersonalItem = { label: string; value: string };

const personal: PersonalItem[] = [
  { label: "Full name", value: "Ivanov Inav Ivanovich" },
  { label: "Gender", value: "Man" },
  { label: "Date of birth", value: "17.10.1999" },
  { label: "Country of residence", value: "Russia" },
  { label: "Country of citizenship", value: "Russia" },
  { label: "Residential address", value: "Moscow, Marshala Tyhachevskogo" },
];

export default function PersonalInformation() {
  const [isCameraOpen, setCameraScreen] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle("camera-open", isCameraOpen);
    document.getElementById("navbar-container")?.classList.toggle("backdrop-blur-lg");
    const headerText = document.getElementById("page-header");

    if (headerText) {
      headerText.textContent = isCameraOpen ? "Biometrics" : "Profile";
    }

    return () => document.body.classList.remove("camera-open");
  }, [isCameraOpen]);

  const onEdit = () => {
    console.log("on Edit");
  };

  const blockParamsClass = "flex flex-col bg-translucent-extreme blick-rounded gap-5 p-[15px]";

  const btnColorBlue = "text-sm text-medium color-blue-secondary leading-[17px]";

  const RightBlockSection = ({
    height,
    header,
    children,
  }: {
    height?: string;
    header: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-2.5">
      <div className={`${height || ""} ${blockParamsClass}`}>
        <h4 className="h-[21px]">{header}</h4>
        {children}
      </div>
    </div>
  );

  const IncomeBlock = ({ header, value }: { header: string; value: string }) => (
    <div>
      <div className="mb-2.5 text-xs opacity-60">{header}</div>
      <Input className="opacity-20" disabled={true} inputMode="text" value={value} />
    </div>
  );

  const addPhoto = () => {
    alert("Add your photo");
  };

  const gotoCam = () => {
    setCameraScreen(true);
  };

  return (
    <>
      <section className="m-auto mt-[80px] mb-2.5 flex max-w-[880px] gap-2.5 max-md:flex-col">
        {/* TOP LEFT BLOCK — Personal information */}
        <div className="w-full lg:w-570/870 lg:max-w-[570px]">
          {/* Inner rounded block */}
          <div className={`h-[477px] ${blockParamsClass}`}>
            {/* Header */}
            <header className="flex h-[21px] items-center justify-between">
              <h3 className="text-lg font-semibold">Personal information</h3>
              <button
                className="color-blue-secondary text-sm font-medium"
                type="button"
                onClick={onEdit}
              >
                To change
              </button>
            </header>
            {/* Person full name */}
            <div className="flex flex-col gap-5">
              {personal.map((it) => (
                <div key={it.label} className="">
                  <div className="mb-[5px] h-[17px] text-xs opacity-60">{it.label}</div>
                  <div className="h-[23px] text-sm">{it.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP RIGHT BLOCK — 3 blocks */}
        <div className="w-full lg:w-870/570 lg:max-w-[300px]">
          <div className="flex flex-col gap-2.5">
            {[
              {
                height: "h-[111px]",
                header: "Type of activity",
                child: <Input className="" disabled={true} inputMode="text" value={"Welder"} />,
              },
              {
                height: "h-[235px]",
                header: "Income",
                child: [
                  <IncomeBlock key="period1" header="For the last month" value="$236" />,
                  <IncomeBlock key="period2" header="For the last year" value="2856" />,
                ],
              },
              {
                height: "h-[111px]",
                header: "Passport photo",
                child: (
                  <Button
                    className="bg-blue-second-translusent-lignt flex h-[40px] w-[260px] items-center justify-center gap-[10px] rounded-[15px] px-[12px] py-[4px]"
                    style={{ border: "dashed 1px rgb(var(--color-blue-second-rgb))" }}
                    onClick={addPhoto}
                  >
                    <Image
                      alt="Add passport photo"
                      height={15}
                      src="/assets/images/icons/paper-clip.svg"
                      width={15}
                    />
                    <span className={btnColorBlue}>Add</span>
                  </Button>
                ),
              },
            ].map((data, i) => (
              <RightBlockSection
                key={`${data.header}-${i}`}
                header={data.header}
                height={data.height}
              >
                {data.child}
              </RightBlockSection>
            ))}
          </div>
        </div>
      </section>
      <section className="m-auto mb-[80px] flex max-w-[880px] gap-2.5 max-md:flex-col">
        {/* BOTTOM LEFT BLOCK — reserved empty */}
        <div className="w-full opacity-0 max-md:hidden lg:w-570/870 lg:max-w-[570px]">
          <div className={blockParamsClass} />
        </div>

        {/* BOTTOM RIGHT BLOCK — Biometrics 
        FIXME: uncomment following block (remove false condition)
        */}
        {false && (
          <div className="w-full lg:w-870/570 lg:max-w-[300px]">
            <div className="flex flex-col gap-2.5">
              <RightBlockSection key="biometrics" header="Biometrics" height="h-[111px]">
                <Button
                  className="bg-blue-second-translusent-lignt flex h-[40px] w-[260px] items-center justify-center gap-[10px] rounded-[15px] px-[12px] py-[4px]"
                  onPress={gotoCam}
                >
                  <Image
                    alt="Add passport photo"
                    height={15}
                    src="/assets/images/icons/camera.svg"
                    width={15}
                  />
                  <span className={btnColorBlue}>Go to the camera</span>
                </Button>
              </RightBlockSection>
            </div>
          </div>
        )}
      </section>
      {(isCameraOpen && (
        <Camera imgSrc="/assets/images/client-face.jpg" onClose={() => setCameraScreen(false)} />
      )) ||
        null}
    </>
  );
}
