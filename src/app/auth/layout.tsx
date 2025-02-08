"use client";
import BlurCircleAnimation from "@/components/animation/blurCircleAnimation";
import QuatePart from "@/components/global/quatePart";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="bg-secondary text-background w-full h-screen overflow-hidden relative p-1">
      <div className="w-full grid  h-full grid-cols-3">
        <div className="w-full md:col-span-1 col-span-3  h-full relative  z-[0]">
          <BlurCircleAnimation />
          {children}
        </div>
        <QuatePart />
      </div>
    </div>
  );
};

export default layout;
