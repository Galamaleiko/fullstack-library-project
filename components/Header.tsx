"use client";

import React from "react";

import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link
        className={cn(
          "text-base cursor-pointer capitalize flex items-center justify-center gap-2 font-bold",
          pathName === "/" ? "text-light-200" : "text-light-100"
        )}
        href="/"
      >
        <img src="icons/logo.svg" alt="logo" width={40} height={40} />
        BookWise
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            className={cn(
              "text-base cursor-pointer capitalize",
              pathName === "/library" ? "text-light-200" : "text-light-100"
            )}
            href="/library"
          >
            Library
          </Link>
        </li>

        <li>
          <Link
            href="/my-profile"
            className="flex flex-1 items-center justify-center gap-2"
          >
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session.user?.name || "USER")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
