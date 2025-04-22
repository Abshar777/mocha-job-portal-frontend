import Image from "next/image";
import React from "react";
import Logo from "@/../public/svgs/logo.svg";
import { FooterSection, FooterSocialMediaLinks } from "@/constants/footer";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Footer = () => {
  return (
    <div className="md:flex hidden  text-white  lg:justify-around justify-between    rounded-t-2xl bg-foreground lg:px-10 px-5 py-5 ">
      <div className="flex -translate-y-5  flex-col items-center ">
        <div className="translate-y-5 ">
          <Image src={Logo} alt="logo" className="object-contain h-full" />
        </div>
        <p className="text-sm text-muted-foreground">connect with us</p>
        <div className="flex items-center justify-center ">
          {FooterSocialMediaLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              <Button isIconOnly className="bg-transparent p-0 ">
                {" "}
                {link.icon}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {FooterSection.map((section) => (
        <div className="translate-y-5" key={section.title}>
          <ul className="flex flex-col gap-1 text-sm">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="translate-y-5 lg:block hidden w-[20rem] h-[7rem] ">
        <Skeleton className="w-full bg-muted-foreground/20   rounded-xl h-full" />
      </div>
    </div>
  );
};

export default Footer;
