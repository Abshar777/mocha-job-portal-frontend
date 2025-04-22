"use client";
import React from "react";
import logo from "@/../public/logo.png";
import Logo from "@/../public/svgs/logo.svg";
import Image from "next/image";
import Link from "next/link";
import {
  RecruiterMobileNavLinks,
  RecruiterNavLinks,
} from "@/constants/recruiter";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { IoNotificationsCircle } from "react-icons/io5";
import { Button } from "@heroui/button";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import ShinyText from "@/components/animation/shinyText";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationBtn from "@/components/animation/notificationBtn";
import { IoCloseCircle } from "react-icons/io5";
import { Drawer } from "vaul";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const DesktopNavElemnts = () => {
  const pathname = usePathname();
  return (
    <div className="md:flex hidden items-center gap-6">
      {RecruiterNavLinks.map((link) => (
        <Link key={link.href} className="group relative" href={link.href}>
          <h2 className="text-white active:scale-95 transition-all duration-300 ease-in-out  text-md hover:opacity-80    font-semibold ">
            {link.label}
          </h2>
          <div
            className={cn(
              " bg-primary origin-right w-full  transition-transform duration-300 ease-in-out h-1 absolute rounded-full",
              link.href !== "/recruiter/jobs" ? "scale-x-0 " : "scale-x-100",
              link.href !== pathname &&
                "group-hover:scale-x-100 group-hover:origin-left "
            )}
          ></div>
        </Link>
      ))}
      <div className="relative">
        <Input
          placeholder="Search"
          className="w-full max-w-[15rem] rounded-full border-none h-[80%]  bg-primary-background text-muted-foreground"
        />
        <Button
          size="sm"
          className="absolute text-white text-xs w-1/4  bg-primary p-0  right-0  top-0 h-full rounded-full"
        >
          <FaSearch />
        </Button>
      </div>
      <Button className="bg-gradient-to-l shadow-[0_0_8px_0px_#ffbc00b8]  rounded-full from-[#F9CC16] to-[#8E7100] max-w-[5rem] min-w-[5rem]  overflow-hidden relative  h-[2.5rem]  text-white    flex items-center justify-center ">
        <ShinyText className="font-semibold" text="360" speed={1} />
      </Button>
      <NotificationBtn />
      <div className="flex items-center justify-between overflow-hidden bg-white/5 rounded-full">
        <Button
          size="md"
          isIconOnly
          className="bg-transparent px-2 text-lg text-white"
        >
          <HiOutlineMenuAlt1 />
        </Button>
        <Button
          size="md"
          isIconOnly
          className="rounded-full px-2 bg-white/10 shadow-md  text-sm text-white"
        >
          <FaUserAlt />
        </Button>
      </div>
    </div>
  );
};

const MobileNavSheetContent = ({ closeDrawer }: { closeDrawer: Function }) => {
  const pathname = usePathname();
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed z-10 inset-0 bg-black/40  backdrop-blur-sm" />
      <Drawer.Content
        className="left-1 top-2 bottom-2 fixed z-20 outline-none w-[310px] flex"
        style={
          { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
        }
      >
        <div className="bg-background h-full w-full grow px-3 py-1 flex flex-col rounded-[16px]">
          <Drawer.Title className="font-medium px-0 -translate-y-3 border-b border-dashed  justify-between flex items-center mb-2 text-white">
            <div className=" top-0 -translate-x-3 scale-[.8] left-0 ">
              <Image src={Logo} alt="logo" className="object-contain h-full" />
            </div>
            <Button
              onPress={() => closeDrawer()}
              size="sm"
              isIconOnly
              variant="ghost"
              className="text-xl active:scale-100 border-0 px-0 text-primary bg-transparent"
            >
              <IoCloseCircle />
            </Button>
          </Drawer.Title>
          <Drawer.Description className=" mb-2 flex flex-col gap-4">
            {RecruiterMobileNavLinks.map((e) => (
              <Link
                className={cn(
                  "w-full flex items-center justify-between ",
                  pathname == e.href && "text-primary"
                )}
                key={e.href}
                href={e.href}
              >
                <span className="">{e.label}</span>
                <IoIosArrowDroprightCircle
                  className={cn(
                    "text-primary  text-lg ",
                    pathname != e.href && "opacity-50"
                  )}
                />
              </Link>
            ))}
          </Drawer.Description>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

const RecruiterNav = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);
  const closeDrawer = () => setIsOpen(false);
  return (
    <div className="flex bg-foreground p-4 w-full max-h-[4rem]  items-center justify-between">
      <Drawer.Root
        shouldScaleBackground
        open={isOpen}
        onOpenChange={setIsOpen}
        direction="left"
      >
        <Drawer.Trigger className="md:hidden text-lg text-white block">
          <HiOutlineMenuAlt1 />
        </Drawer.Trigger>
        <MobileNavSheetContent closeDrawer={closeDrawer} />
      </Drawer.Root>

      <div className=" top-0 scale-[.8] left-0 ">
        <Image src={Logo} alt="logo" className="object-contain h-full" />
      </div>
      {!isMobile ? <DesktopNavElemnts /> : <NotificationBtn />}
    </div>
  );
};

export default RecruiterNav;
