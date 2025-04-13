import { skillsByCategory } from "@/constants/personalDetailsConst";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRelatedSkills(selectedSkills: string[]): string[] {
  // Make sure selectedSkills is an array, even if empty
  const safeSelectedSkills = Array.isArray(selectedSkills) ? selectedSkills : [];
  
  const relatedSkills = new Set<string>();

  // If no skills selected, return some default recommendations from each category
  if (safeSelectedSkills.length === 0) {
    Object.values(skillsByCategory).forEach(skills =>
      skills.slice(0, 3).forEach(skill => relatedSkills.add(skill))
    );
    return Array.from(relatedSkills).slice(0, 20);
  }

  // Find skills in the same categories as selected skills
  for (const [_, skills] of Object.entries(skillsByCategory)) {
    if (skills.some(skill => safeSelectedSkills.includes(skill))) {
      skills.forEach(skill => {
        if (!safeSelectedSkills.includes(skill)) {
          relatedSkills.add(skill);
        }
      });
    }
  }
  
  return Array.from(relatedSkills).slice(0, 20);
}

