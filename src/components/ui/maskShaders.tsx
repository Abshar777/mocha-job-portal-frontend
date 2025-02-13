import React from "react";

interface Props {}

const MaskShaders = (props: Props) => {
  return (
    <>
      <div className="w-1/4 left-0 h-full absolute z-[0] bg-gradient-to-r from-background"></div>
      <div className="w-1/4 right-0 h-full absolute z-[0] bg-gradient-to-l from-background"></div>
    </>
  );
};

export default MaskShaders;
