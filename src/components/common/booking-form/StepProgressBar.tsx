import { clsx } from "clsx";

type StepProgressBarProps = {
  /** Progress value from 0 to 100 */
  value: number;
  className?: string;
};

export const StepProgressBar = ({
  value,
  className,
}: StepProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={clsx("flex-1 max-w-140 mx-4", className)}>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-[width] duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
