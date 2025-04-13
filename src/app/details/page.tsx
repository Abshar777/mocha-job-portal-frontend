"use client";
import BlurText from "@/components/animation/blurText";
import { container_variants, item_variants } from "@/constants/framer-motion";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Role from "@/components/page-section/personalDetails/role";
import ProgressBar from "@/components/page-section/personalDetails/progressBar";
import { components } from "@/constants/personalDetailsConst";
import { Button } from "@heroui/button";
import { ArrowLeftIcon } from "lucide-react";
import AnimatedButton from "@/components/animation/animatedButton";
const page = () => {
  const { role, step, steps, previousStep, nextStep, loading, disabled } =
    usePersonalDetails();
  const title =
    step == 0
      ? "What is your role?"
      : steps
      ? steps[step - 1] && steps[step - 1].title
      : "";
  const Component = steps
    ? steps[step - 1] && components[steps[step - 1].id]
    : null;
  return (
    <>
      <ProgressBar length={steps?.length ?? 5} progress={step} section={step} />
      <motion.div
        variants={container_variants}
        initial={"hidden"}
        animate={"visible"}
        key={step}
        className="flex flex-col items-center justify-center gap-4 mt-2"
      >
        <BlurText
          key={title}
          delay={0.05}
          animateBy="letters"
          direction="bottom"
          className="text-secondary md:text-4xl text-xl font-bold capitalize"
          text={title}
        />
        {(!role || !step) && <Role />}
        {Component}
        <motion.div
          variants={item_variants}
          className="md:px-[7rem] px-[1rem] w-full flex items-center gap-2"
        >
          {step !== 0 && (
            <Button
              disabled={loading}
              onPress={previousStep}
              color="secondary"
              size="sm"
              className="bg-zinc-200/80 disabled:opacity-50 group py-[1.5rem] rounded-2xl text-black"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-all duration-300" />
            </Button>
          )}
          <AnimatedButton
            disabled={loading || disabled}
            isLoading={loading}
            onClick={nextStep}
            text="Next"
            color="primary"
            size="lg"
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default page;
