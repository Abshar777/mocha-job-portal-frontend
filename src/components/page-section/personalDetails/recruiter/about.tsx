"use client";
import FormGeneratorV2 from "@/components/global/form-generator/v2";
import { useCompanyInformation } from "@/hooks/usePersnolDets";
import { Form, FormField } from "@/components/ui/form";
import { RiLinkM } from "react-icons/ri";
import { motion } from "framer-motion";
import { IoBookOutline } from "react-icons/io5";
import { item_variants } from "@/constants/framer-motion";

const About = () => {
  const { form, onFormSubmit } = useCompanyInformation();
  return (
    <div className="flex flex-col w-full px-[2rem]  gap-4">
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-4">
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="text"
                  placeholder="Website URL"
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  Icon={RiLinkM}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div variants={item_variants} className="w-full ">
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="textarea"
                  type="text"
                  placeholder="Company Description"
                  className={{
                    label: "text-white",
                  }}
                  lines={4}
                  field={field}
                  Icon={IoBookOutline} 
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

export default About;
