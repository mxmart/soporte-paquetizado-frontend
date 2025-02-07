"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  text: string;
  url: string;
  active?: boolean;
}

export const Tab = ({ active = false, text, url }: Props) => {

  const { push, prefetch } = useRouter();

  return (
    <button
      onMouseEnter={() => prefetch(url)}
      onClick={() => push(url)}
      className={`sm:w-auto w-full h-10 transition-all duration-200 px-5 tab ${
        active && "rounded-t-lg tab-active"
      }`}
    >
      <span className="tab-text font-medium text-sm">{text}</span>
    </button>
  );
};
