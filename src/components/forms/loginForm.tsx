"use client";
import { container_variants } from "@/constants/framer-motion";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import { TbLock } from "react-icons/tb";
import FormGenerator from "../global/form-generator";
import { TbMail } from "react-icons/tb";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import AnimatedButton from "../animation/animatedButton";
import { OAuthProviders } from "../global/OAuthProviders";

const LoginForm = () => {
  const { register, onFormSubmit, errors, isPending } = useAuth("login");

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
        className="w-full  flex flex-col gap-3"
      >
        <FormGenerator
          Icon={TbLock}
          label="Password"
          inputType="input"
          placeholder="********"
          register={register}
          name="password"
          type="password"
          errors={errors}
        />
        <motion.div
          variants={item_variants}
          initial={"hidden"}
          animate={"visible"}
          className="flex items-center justify-between space-x-2"
        >
          <div className="flex items-center space-x-2">
            <Checkbox checked={true} color="primary" id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link href="/auth/forgot-password" className="text-sm text-primary ">
            Forgot password?
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  "
      >
        <AnimatedButton
          isLoading={isPending}
          text="Login"
          loadingText="Logging in"
          color="primary"
          size="lg"
          type="submit"

        />
      </motion.div>
      <motion.div
        variants={container_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full h-[4rem] grid grid-cols-3 justify-items-center gap-2"
      >
        {OAuthProviders}
      </motion.div>
      <Link href="/auth/register" className="text-sm  ">
        Dont have an account?
        <span className=" ms-2 text-primary underline">Register</span>
      </Link>
    </form>
  );
};

export default LoginForm;
