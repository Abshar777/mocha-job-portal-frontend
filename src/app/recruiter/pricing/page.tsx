"use client";
import PricingCard from "@/components/global/pricingCard";
import { useSubscription } from "@/hooks/useSubscription";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import errorImage from "@/../public/svgs/404.svg";
import React from "react";
import { ISubscription } from "@/types/TSubscription";
import { motion } from "framer-motion";
import { container_variants, item_variants } from "@/constants/framer-motion";

const page = () => {
  const { data, isPending, isFetched, refetch, isFetching, error } =
    useSubscription();
  if (isPending)
    return (
      <div className="flex flex-1 w-full h-full items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );

  if (data) {
    const plans = (data as any).subscriptions;
    return (
      <motion.div
        variants={container_variants}
        initial={"hidden"}
        animate={"visible"}
        className="flex flex-1 py-5 flex-col items-center justify-start gap-2"
      >
        <motion.p variants={item_variants} className="text-primary  ">
          Post job online
        </motion.p>
        <motion.h1
          variants={item_variants}
          className="lg:text-4xl md:text-2xl text-xl text-center  font-semibold text-white uppercase"
        >
          Quick & Easy Job Posting − Get Quality Applies
        </motion.h1>

        <div className="flex mt-5 mb-10 w-full justify-center items-center">
          <div className="grid md:grid-cols-3 md:w-fit w-full md:px-10 px-8  grid-cols-1 md:gap-6 gap-4">
            {plans.map((plan: ISubscription, index: number) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 w-full h-full items-center justify-center">
        <Image src={errorImage} alt="error" />
      </div>
    );
  }
};

export default page;
