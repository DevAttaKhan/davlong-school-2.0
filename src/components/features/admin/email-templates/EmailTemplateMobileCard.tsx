import type { EmailTemplate } from "./data";
import { ChevronRight } from "lucide-react";

interface EmailTemplateMobileCardProps {
  template: EmailTemplate;
  onClick: () => void;
}

export const EmailTemplateMobileCard = ({
  template,
  onClick,
}: EmailTemplateMobileCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 last:border-0"
    >
      <span className="text-sm font-medium text-gray-700">{template.name}</span>
      <ChevronRight className="w-4 h-4 text-blue-500" />
    </div>
  );
};
