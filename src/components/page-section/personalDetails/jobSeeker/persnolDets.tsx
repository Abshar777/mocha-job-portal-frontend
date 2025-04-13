"use client";
import FormGeneratorV2 from "@/components/global/form-generator/v2";
import { useDobAndDets } from "@/hooks/usePersnolDets";
import { Form, FormField } from "@/components/ui/form";
import { countries } from "@/constants/countries";
import { TbWorld } from "react-icons/tb";
import { motion } from "framer-motion";
import { item_variants } from "@/constants/framer-motion";

interface Props {}

const PersonalDetails = (props: Props) => {
  const { form, onFormSubmit } = useDobAndDets();
  return (
    <div className="flex flex-col w-full px-[2rem]  gap-4">
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-4">
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="date"
                  type="text"
                  placeholder="DOB(DD-MM-YYYY)"
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
              name="resume"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="upload"
                  type="text"
                  placeholder="Resume "
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
              name="country"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="select"
                  type="text"
                  placeholder="Select Country"
                  options={countries.map((country) => ({
                    value: country,
                    label: country,
                    id: country,
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

export default PersonalDetails;
