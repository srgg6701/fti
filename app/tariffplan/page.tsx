"use client";
import { ButtonRoundedBlue, ButtonRoundedGrey } from "@/components/button-rounded";

export default function Tariffplan() {
  const plans = [
    {
      name: "Standard",
      badge: "Popular",
      price: "$50.99",
      period: "1 month",
      cta: "Buy",
    },
    {
      name: "Let's discuss it",
      badge: null,
      price: "Contractual",
      period: "1 month",
      cta: "Buy",
    },
  ];

  const btnProps = {
    btnText: "Buy",
    height: "h-[45px]",
  };

  const onClickBlue = () => {
    console.log("Blue");
  };
  const onClickGrey = () => {
    console.log("Grey");
  };

  return (
    <div className="w-full pt-20 pb-[56px]">
      <section className="flex flex-col items-center pb-10">
        <h2 className="pb-2.5 !text-[28px] leading-[33px] font-semibold">Choose a data plan</h2>
        <p className="max-w-[207px] text-center text-sm leading-[17px] opacity-80">
          Choose the most suitable tariff plan for yourself
        </p>
      </section>
      <div className="flex justify-center gap-[15px] max-[560px]:flex-col">
        {plans.map((p) => (
          <section
            key={p.name}
            className="bg-translucent-extreme-hover blick-rounded flex w-[380px] max-w-full flex-col justify-between rounded-[15px] p-10 text-center"
          >
            <div className="mb-5 flex flex-col justify-center gap-[15px]">
              <h3 className="text-lg font-semibold text-white">
                {p.name}
                {p.badge && (
                  <ButtonRoundedBlue
                    bgColor="bg-blue-second"
                    btnText="Popular"
                    fontSize="text-xs"
                    height="!h-[18px]"
                    marginClass="ml-[5px]"
                    padding="!px-[5px]"
                    width="min-w-[53px]"
                  />
                )}
              </h3>
              <div className="flex flex-col justify-center gap-[5px]">
                <span className="h-[43px] text-4xl font-medium">{p.price}</span>
                <span className="text-base font-medium">{p.period}</span>
              </div>
              <p className="text-sm leading-[17px] opacity-80">
                The service uses a database characteristics, scenarios and interactions
              </p>
            </div>
            {p.name === "Standard" ? (
              <ButtonRoundedBlue {...btnProps} onClick={onClickBlue} />
            ) : (
              <ButtonRoundedGrey {...btnProps} onClick={onClickGrey} />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
