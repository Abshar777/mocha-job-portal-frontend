"use client";
import AnimatedButton from "@/components/animation/animatedButton";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  useMultiSelect,
} from "@/components/global/form-generator/multiSelect";
import { item_variants } from "@/constants/framer-motion";
import { industryTypes } from "@/constants/personalDetailsConst";
import { useCompanyInformation } from "@/hooks/usePersnolDets";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

const IndustryType = () => {
  const { recruiter, setDisabled, updateRecruiter } = usePersonalDetails();
  const { setValue: setValueCompanyInformation } = useCompanyInformation();
  const [value, setValue] = useState<string[]>(recruiter?.industryType || []);
  useEffect(() => {
    setValueCompanyInformation("industryType", value);
    updateRecruiter({ industryType: value });

    if (value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-2">
      <MultiSelector
        values={value}
        onValuesChange={setValue}
        loop
        className="lg:max-w-[30vw] md:max-w-[40vw] w-screen px-2 flex flex-col gap-2 "
      >
        <motion.div variants={item_variants} className="w-full ">
          <MultiSelectorTrigger className="bg-foreground ring-0 border border-input outline-0 outline-none text-secondary flex items-start px-[.7rem]">
            <MultiSelectorInput placeholder="Type  your framework" />
          </MultiSelectorTrigger>
        </motion.div>
        <MultiSelectorContent className="hidden">
          <MultiSelectorList>
            {industryTypes.map((skill) => (
              <MultiSelectorItem key={skill} value={skill}>
                {skill}
              </MultiSelectorItem>
            ))}
          </MultiSelectorList>
        </MultiSelectorContent>
        <motion.div variants={item_variants} className="w-full ">
          <RelatedSkills />
        </motion.div>
      </MultiSelector>
    </div>
  );
};

const RelatedSkills = () => {
  const { inputValue, setInputValue, value, onValueChange } = useMultiSelect();
  const [relatedSkills, setRelatedSkills] = useState<string[]>([]);

  useEffect(() => {
    const suggestions = industryTypes.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    const filteredSuggestions = suggestions
      .filter((skill) => !value.includes(skill))
      .slice(0, 20);

    setRelatedSkills(filteredSuggestions);
  }, [inputValue, value]);

  return (
    <div className="flex transition-all duration-[.3s] ease-in-out justify-center flex-wrap gap-2 mt-2">
      {relatedSkills.map((skill, i) => (
        <AnimatedButton
          isLoading={false}
          size="sm"
          text={skill}
          key={i}
          className="text-xs w-min px-2 py-1 rounded-md bg-muted text-black hover:bg-primary hover:text-white transition"
          onClick={() => {
            onValueChange(skill);
            setInputValue("");
          }}
        />
      ))}
    </div>
  );
};

export default IndustryType;
