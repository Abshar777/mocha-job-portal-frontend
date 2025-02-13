import BlurCircleAnimation from "@/components/animation/blurCircleAnimation";
import React from "react";
import MaskShaders from "@/components/ui/maskShaders";
import PersonalDetails from "@/components/global/personalDetails";
import { PersonalDetailsProvider } from "@/context/personalDetails/PersonalDetailsProvider";

interface Props {
  children: React.ReactNode;
  
}

const layout = ({ children }: Props) => {
  return (
    <PersonalDetailsProvider>
      <div className="bg-secondary text-background w-full h-screen overflow-hidden relative p-1">
        <div className="h-full gridAnim shades w-full overflow-hidden relative z-[1] bg-background rounded-xl">
          <MaskShaders />
          <PersonalDetails>{children}</PersonalDetails>
        </div>
        <BlurCircleAnimation />
      </div>
    </PersonalDetailsProvider>
  );
};

export default layout;
