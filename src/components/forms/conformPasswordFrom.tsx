"use client";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import FormGenerator from "../global/form-generator";
import { TbMail } from "react-icons/tb";
import AnimatedButton from "../animation/animatedButton";
import { usePassword } from "@/hooks/usePassword";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

const ConformPasswordForm = () => {
  const { register, onFormSubmit, errors, isPending,setValue } = usePassword("conform");
  const userInfo = useSelector((state: RootState) => state.Auth.userInfo);
  useEffect(() => {
    if (userInfo) {
      setValue("email", userInfo.email);
    }
  }, [userInfo]);

  return (
    <form onSubmit={onFormSubmit} className="w-full flex flex-col gap-4">
      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  "
      >
        <FormGenerator
          Icon={TbMail}
          label="New Password"
          inputType="input"
          placeholder="New Password"
          register={register}
          name="password"
          errors={errors}
          type="password"
        />
      
      </motion.div>
      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  "
      >
        <FormGenerator
          Icon={TbMail}
          label="Confirm Password"
          inputType="input"
          placeholder="Confirm Password"
          register={register}
          name="confirmPassword"
          errors={errors}
          type="password"
        />
      
      </motion.div>

      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  "
      >
        <AnimatedButton
          isLoading={isPending}
          text="Send Reset Link"
          loadingText="checking email"
          color="primary"
          size="lg"
          type="submit"
        />
      </motion.div>
    </form>
  );
};

export default ConformPasswordForm;
