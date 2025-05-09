"use client";
import { item_variants } from "@/constants/framer-motion";
import { providers } from "@/constants/provider";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export const OAuthProviders = providers.map((provider, index) => (
  <motion.div
    key={index}
    variants={item_variants}
    initial={"hidden"}
    animate={"visible"}
    className="w-full  h-full  "
    
  >
    <Button onPress={()=>signIn(provider.name)} className="w-full bg-[#7c694321] hover:bg-[#7c69433c] border-[1px]   border-[#b5b5b51a] h-full  rounded-2xl">
      {provider.icon}
    </Button>
  </motion.div>
));
