import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
}

const DownArrow = ({ className, color = "#F4F4F4" }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-[24px] h-[24px]", className)}
    >
      <path
        d="M18 9L16.2857 12.4286C16.1003 12.7995 15.7995 13.1003 15.4286 13.2857V13.2857C13.2702 14.3649 10.7298 14.3649 8.57143 13.2857V13.2857C8.20051 13.1003 7.89975 12.7995 7.71429 12.4286L6 9"
        stroke={color}
        strokeOpacity="0.34"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownArrow;
