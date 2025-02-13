"use client";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import FormGenerator from "../global/form-generator";
import { TbMail } from "react-icons/tb";
import AnimatedButton from "../animation/animatedButton";
import { usePassword } from "@/hooks/usePassword";

const ForgetPasswordForm = () => {
  const { register, onFormSubmit, errors, isPending } = usePassword("forget");

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
          label="Email address"
          inputType="input"
          placeholder="example@gmail.com"
          register={register}
          name="email"
          errors={errors}
          type="email"
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

export default ForgetPasswordForm;
