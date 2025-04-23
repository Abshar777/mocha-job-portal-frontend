"use client"
import { item_variants } from "@/constants/framer-motion";
import { ISubscription } from "@/types/TSubscription";
import { motion } from "framer-motion";
import React from "react";
import { features } from "@/constants/pricing";
import AnimatedButton from "@/components/animation/animatedButton";
import { useCreateCheckoutSession } from "@/hooks/useSubscription";
const PricingCard = ({ plan }: { plan: ISubscription }) => {
  const { mutate, isPending, isSuccess, ...rest } = useCreateCheckoutSession();
  const onClickHandler = () => {
    mutate(plan._id);
  };
  return (
    <motion.div
      variants={item_variants}
      whileHover={{ scale: 1.05 }}
      className="bg-foreground group  hover:bg-foreground/80  transition-all duration-300  w-full flex flex-col items-center  text-white rounded-2xl py-4 px-8"
    >
      <h1 className="text-2xl  uppercase text-primary font-medium">
        {plan.name}
      </h1>
      <h1 className="text-4xl font-semibold font-primary">₹{plan.price}</h1>
      <p className="text-xs text-muted-foreground">For All Cities</p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1 }}
        className="w-[85%]  group-hover:w-[120%] transition-all duration-300  origin-center h-[1px] bg-muted-foreground/30 my-3 "
      />
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col my-5 text-sm gap-2">
          {features.map((feature) => {
            const featureValue =
              plan.features[feature.key as keyof typeof plan.features];
            return (
              <li key={feature.key}>
                <p>
                  {featureValue || featureValue == null
                    ? "✅ " +
                      (typeof featureValue == "number"
                        ? featureValue + " " + feature.label2
                        : feature.label1)
                    : "❌ " + feature.label2}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1 }}
        className="w-[85%]  group-hover:w-[120%] transition-all duration-300  origin-center h-[1px] bg-muted-foreground/30 my-3 "
      />
      <p className="text-xs text-muted-foreground">Job validity 30 days</p>
      <AnimatedButton
        text="Buy Now"
        color="primary"
        size="sm"
        isLoading={false}
        className="w-full    mt-4 rounded-full "
        onClick={onClickHandler}
      />
    </motion.div>
  );
};

export default PricingCard;
