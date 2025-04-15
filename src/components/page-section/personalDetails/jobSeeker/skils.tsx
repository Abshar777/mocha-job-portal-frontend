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
import { skills } from "@/constants/personalDetailsConst";
import { getRelatedSkills } from "@/lib/utils";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { motion } from "framer-motion";

import { useState, useEffect, useCallback } from "react";

const Skills = () => {
  const { updateJobSeeker, jobSeeker, setDisabled } = usePersonalDetails();
  const [value, setValue] = useState<string[]>(jobSeeker?.skills || []);
  useEffect(() => {
    updateJobSeeker({ skills: value });
  }, [value]);
  useEffect(() => {
    if (jobSeeker.skills.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [jobSeeker.skills]);

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
            <MultiSelectorInput placeholder="Select your framework" />
          </MultiSelectorTrigger>
        </motion.div>
        <MultiSelectorContent className="hidden">
          <MultiSelectorList>
            {skills.map((skill) => (
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
    let suggestions: string[];
    if (inputValue.trim() === "") {
      suggestions = getRelatedSkills(value);
    } else {
      suggestions = skills.filter((skill) =>
        skill.toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    // Make sure to filter out already selected skills
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
            // Add to existing values instead of replacing
            onValueChange(skill); // The onValueChange in MultiSelect context already handles add/remove
            setInputValue("");
          }}
        />
      ))}
    </div>
  );
};

export default Skills;
