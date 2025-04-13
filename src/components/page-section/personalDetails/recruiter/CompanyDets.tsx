"use client";
import FormGeneratorV2 from "@/components/global/form-generator/v2";
import { useCompanyInformation } from "@/hooks/usePersnolDets";
import { Form, FormField } from "@/components/ui/form";
import { FaUserTie } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { motion } from "framer-motion";
import { MdOutlineCorporateFare } from "react-icons/md";
import { item_variants } from "@/constants/framer-motion";

const CompanyDets = () => {
  const { form, onFormSubmit } = useCompanyInformation();
  return (
    <div className="flex flex-col w-full px-[2rem]  gap-4">
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-4">
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="text"
                  placeholder="Company Name"
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  Icon={MdOutlineCorporateFare}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="upload"
                  type="text"
                  acceptedFileTypes="image/*"
                  placeholder="Company Logo"
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="numberOfEmployees"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="number"
                  min={1}
                  placeholder="Number of Employees"
                  Icon={FaUserTie}
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyDets;
