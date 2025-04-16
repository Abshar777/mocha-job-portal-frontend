"use client"
import { container_variants } from "@/constants/framer-motion";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import { TbLock } from "react-icons/tb";
import FormGenerator from "../global/form-generator";
import { TbMail } from "react-icons/tb";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import AnimatedButton from "../animation/animatedButton";
import { OAuthProviders } from "../global/OAuthProviders";



const RegisterForm = () => {
  
  const { register, onFormSubmit, errors, isPending } = useAuth("register");

  return (
    <form onSubmit={onFormSubmit} className="w-full  flex flex-col gap-4">
      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  "
      >
        <FormGenerator
          Icon={FaUser}
          label="Name"
          inputType="input"
          placeholder="jhon carter"
          register={register}
          name="name"
          errors={errors}
          type="text"
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
          <FormGenerator
            label="Remember me"
            inputType="checkbox"
            register={register}
            name="remember"
            errors={errors}
            placeholder=""
          />
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
          text="Register"
          loadingText="Registering"
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
      <Link href="/auth/login" className="text-sm  ">
        Already have an account?

        <span className=" ms-2 text-primary underline">Login</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
