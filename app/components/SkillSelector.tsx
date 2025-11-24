import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Code, Layers } from "lucide-react";

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

const languages = [
  "JavaScript", "Python", "Java", "C++", "TypeScript", 
  "Go", "Rust", "Ruby", "PHP", "Swift"
];

const frameworks = [
  "React", "Next.js", "Node.js", "Express", "Django",
  "Flask", "Spring", "Vue.js", "Angular", "React Native"
];

export const SkillSelector = ({ selectedSkills, onSkillToggle }: SkillSelectorProps) => {
  return (
    <div className="space-y-8">
      <Card className="p-6 space-y-6 shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Programming Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Badge
                key={lang}
                variant={selectedSkills.includes(lang) ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:scale-105"
                onClick={() => onSkillToggle(lang)}
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Frameworks & Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((framework) => (
              <Badge
                key={framework}
                variant={selectedSkills.includes(framework) ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:scale-105"
                onClick={() => onSkillToggle(framework)}
              >
                {framework}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
