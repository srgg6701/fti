"use client";
import { useState } from "react";
import Image from "next/image";
import { status } from "@/types/ui";
import { Input } from "@heroui/input";
const SetSearchCommands = ({
  action,
  alt,
  title,
  onClick,
}: {
  action: string;
  alt: string;
  title: string;
  onClick: () => void;
}) => (
  <button
    className="standard-block-decoration-40 bg-translusent-light w-[40px] p-[13px] cursor-pointer"
    title={title}
    type="button"
    onClick={onClick}
  >
    <Image
      alt={alt}
      height={14}
      src={`/assets/images/service/${action}.svg`}
      width={14}
    />
  </button>
);

export default function StrategiesSearchSortFilter({
  handleSorting,
  handleFiltering,
  verticalOffset = true,
  setStatus,
}: {
  handleSorting: () => void;
  handleFiltering: () => void;
  verticalOffset?: boolean;
  setStatus?: (status: status) => void;
}) {
  const [search_text, setSearch] = useState("");

  // FIXME: remove this function as soon as data is real
  async function getData() {
    setStatus?.("loading");
    try {
      await new Promise((r) => setTimeout(r, 3500));
      setStatus?.("success");
    } finally {
      setTimeout(() => setStatus?.("idle"), 1000);
    }
  }
  const filterDataEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") getData();
  };

  return (
    <div
      className={`relative flex gap-[5px] ${verticalOffset && "max-2xl:-mb-10 max-2xl:translate-y-[20px]"}`}
    >
      <Image
        alt="Search"
        className="absolute left-[13px] top-[15px] z-10"
        height={10}
        src="/assets/images/service/search-white.svg"
        width={10}
      />
      <Input
        className="standard-block-decoration-40"
        placeholder="Enter your search request"
        type="search"
        value={search_text}
        onKeyDown={filterDataEnter}
        onValueChange={setSearch}
      />
      <SetSearchCommands
        action="sort"
        alt="Sort search results"
        title="Click to sort records"
        onClick={handleSorting}
      />
      <SetSearchCommands
        action="set"
        alt="Set search results"
        title="Click to filter records by search string"
        onClick={handleFiltering}
      />
    </div>
  );
}
