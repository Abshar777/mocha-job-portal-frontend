"use client";
import FormGeneratorV2 from "@/components/global/form-generator/v2";
import { useCompanyInformation } from "@/hooks/usePersnolDets";
import { Form, FormField } from "@/components/ui/form";
import { TbMapPinCode, TbWorld } from "react-icons/tb";
import { MdOutlinePinDrop } from "react-icons/md";
import { PiCity } from "react-icons/pi";
import { motion } from "framer-motion";
import { MdOutlineCorporateFare } from "react-icons/md";
import { item_variants } from "@/constants/framer-motion";
import { cities, countries } from "@/constants/countries";
const CompanyAddress = () => {
  const { form, onFormSubmit } = useCompanyInformation();
  return (
    <div className="flex flex-col w-full px-[2rem]  gap-4">
      <Form {...form}>
        <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-4">
          <motion.div variants={item_variants} className="w-full px-[1.5rem] ">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="selectv2"
                  type="text"
                  placeholder="Country"
                  options={countries.map((country) => ({
                    value: country,
                    label: country,
                    id: country,
                  }))}
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  Icon={TbWorld}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div
            variants={item_variants}
            className="w-full grid grid-cols-2 gap-2"
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="select"
                  type="text"
                  Icon={PiCity}
                  placeholder="City"
                  options={cities.map((city) => ({
                    value: city,
                    label: city,
                    id: city,
                  }))}
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="text"
                  minLength={6}
                  maxLength={6}
                  Icon={TbMapPinCode}
                  placeholder="Pincode"
                  className={{
                    label: "text-white",
                  }}
                  field={field}
                  errors={form.formState.errors}
                />
              )}
            />
          </motion.div>
          <motion.div variants={item_variants} className="w-full px-[1.5rem] ">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormGeneratorV2
                  inputType="input"
                  type="text"
                  placeholder="Address"
                  Icon={MdOutlinePinDrop}
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

export default CompanyAddress;
