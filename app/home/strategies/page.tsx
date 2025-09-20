"use client";
import HomeSections from "@/components/dataSections";
import HomeStrategiesGraph from "@/mockData/graphs/home-strategies";
import DropdownPill from "@/components/dateDropDown";
import ColoredIndicator from "@/components/coloredIndicator";

export default function Home() {
  return (
    <>
      <section className="flex w-full flex-wrap gap-11 py-5 lg:flex-nowrap lg:p-[80px] lg:pb-[90px]">
        <div className="flex max-w-[452px] flex-col gap-2.5">
          <h3 className="text-2xl font-medium">Total Balance</h3>
          <h1 className="text-5xl font-medium">$ 1000.00</h1>
          <p className="leading-normal opacity-50">
            Google&apos;s free service allows you to instantly translate words, phrases, and web
            pages. It supports over 100 languages.
          </p>
        </div>
        <div className="max-h-[160px] w-[590px] max-w-[100%] xl:p-[20px]">
          <div className="jus flex justify-between">
            <div className="flex gap-2.5">
              <span className="font-semibold">Graph</span>
              <ColoredIndicator data={["32", "1.23"]} direction="Up" />
            </div>
            <div>
              <DropdownPill
                items={[
                  { label: "1 Week", value: "1week" },
                  { label: "1 Month", value: "1month" },
                  { label: "6 Months", value: "6month" },
                  { label: "1 Year", value: "1year" },
                  { label: "2 Years", value: "2years" },
                  { label: "3 Years", value: "3years" },
                ]}
                onSelect={(item) => console.log("selected:", item)}
              />
            </div>
          </div>
          <HomeStrategiesGraph />
        </div>
      </section>
      <HomeSections section="home/strategies" />
    </>
  );
}
