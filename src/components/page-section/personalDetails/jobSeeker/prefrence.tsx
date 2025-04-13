"use client";
import FormGeneratorV2 from "@/components/global/form-generator/v2";
import { usePrefrence } from "@/hooks/usePersnolDets";
import { Form, FormField } from "@/components/ui/form";
import { cities, countries } from "@/constants/countries";

import { TbBriefcase, TbCurrencyDollar, TbWorld } from "react-icons/tb";
import { motion } from "framer-motion";
import { item_variants } from "@/constants/framer-motion";
import { jobRoles } from "@/constants/personalDetailsConst";

interface Props {}

const Prefrence = (props: Props) => {
  const { form, onFormSubmit } = usePrefrence();
  return (
    <div className="flex flex-col w-full px-[2rem]  gap-4">
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-4">
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="selectv2"
                  type="text"
                  Icon={TbBriefcase}
                  placeholder="Select Job Role"
                  options={jobRoles.map((role) => ({
                    value: role,
                    label: role,
                    id: role,
                  }))}
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
              name="salary"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="number"
                  placeholder="Salary"
                  maxLength={10}
                  min={0}
                  className={{
                    label: "text-white",
                  }}
                  Icon={TbCurrencyDollar}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="selectv2"
                  type="text"
                  placeholder="Select City"
                  options={cities.map((city) => ({
                    value: city,
                    label: city,
                    id: city,
                  }))}
                  Icon={TbWorld}
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

export default Prefrence;
