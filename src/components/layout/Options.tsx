'use client'
import React, { JSX, useEffect, useState } from "react";
import { Option } from "./Option";
import { IoMdPersonAdd } from "react-icons/io";
import { useParams } from "next/navigation";
import { checkUserPermissions } from "@/helpers";
import { LoadingOptions } from "./LoadingOptions";

type OptionType = "administrador";

interface Props {
  options: OptionType[];
  type: "admin" | "customer";
}

interface OptionItem {
  icon: JSX.Element;
  title: string;
  responsiveTitle: string;
  url: string;
  permission: string;
}

export const Options = ({ options, type }: Props) => {
  const [optionsToShow, setOptionsToShow] = useState<OptionItem[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const params = useParams();

  const optionsItems: { [key in OptionType]: OptionItem } = {
    administrador: {
      icon: <IoMdPersonAdd className="icon-option text-[18px]" />,
      permission: "create-admin-agent",
      title: "Crear cuenta de admin o agente",
      responsiveTitle: "Crear cuenta",
      url: "/admin/create-account",
    },
  };

  const optionsItemsClients: { [key in OptionType]: OptionItem } = {
    administrador: {
      icon: <IoMdPersonAdd className="icon-option text-[18px]" />,
      permission: "create-admin-agent",
      title: "Crear cuenta de admin o agente",
      responsiveTitle: "Crear cuenta",
      url: "/admin/create-account",
    },
  };

  const optionsToCompare =
    type === "admin" ? optionsItems : optionsItemsClients;

  useEffect(() => {
    const fetchPermissions = async () => {
      const optionsCanSee = [] as OptionItem[];
      const newOptionsToShow = options.map(
        (option) => optionsToCompare[option]
      );
      await Promise.all(
        newOptionsToShow.map(async (option) => {
          const canSee = await checkUserPermissions([option?.permission]);
          if (canSee) {
            optionsCanSee.push(option);
          }
        })
      );
      setOptionsToShow((prevOptions) => {
        const uniqueOptions = optionsCanSee.filter(
          (newOption) =>
            !prevOptions.some(
              (prevOption) => prevOption.title === newOption.title
            )
        );
        return prevOptions.concat(uniqueOptions);
      });
      setIsLoadingOptions(false);
    };
    fetchPermissions();
  }, [options]);

  return (
    <>
      <div className="lg:flex lg:flex-col w-full lg:w-80 xl:w-[450px] gap-3 order-1 lg:order-2 mb-7 lg:mb-0 grid grid-cols-1 md:grid-cols-2">
        {
          isLoadingOptions
          ? <LoadingOptions/>
          : (
            optionsToShow.map((option, index) => (
              <Option
                key={index}
                icon={option.icon}
                title={option.title}
                responsiveTitle={option.responsiveTitle}
                url={option.url}
                index={index}
              />
            ))
          )
        }
      </div>
    </>
  );
};
