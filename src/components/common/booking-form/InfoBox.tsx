import type { ReactNode } from "react";
import { clsx } from "clsx";

type InfoBoxProps = {
  title: string;
  description: string | ReactNode;
  className?: string;
};

export const InfoBox = ({
  title,
  description,
  className,
}: InfoBoxProps) => {
  return (
    <div
      className={clsx(
        "rounded-lg p-4 flex items-start gap-3 bg-gray-100",
        className
      )}
    >
      <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-white text-xs font-bold">i</span>
      </div>
      <div className="min-w-0">
        <p className="text-gray-900 font-bold mb-1">{title}</p>
        <div className="text-gray-500 text-sm">{description}</div>
      </div>
    </div>
  );
};
