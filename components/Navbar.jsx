import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 text-white">
      <Link href={`/`} className="flex gap-1 items-center">
        <Image
          src="/icons/logo.svg"
          alt="Zoom logo"
          width={32}
          height={32}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold max-sm:hidden">Zoom</p>
      </Link>
      <div className="flex-between gap-5">
      <SignedIn>
        <UserButton />
      </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  );
};

export default Navbar;
