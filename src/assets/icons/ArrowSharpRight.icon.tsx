import React from "react";

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export const ArrowSharpRight: React.FC<Props> = ({
  className,
  width,
  height,
}) => {
  return (
    <svg
      width={width || 22}
      height={height || 20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.000172933 7.15207L0 19.1519H2.66667L2.6668 9.81873L16.2293 9.8186L10.963 15.085L12.8486 16.9706L21.3338 8.48527L12.8486 0L10.963 1.88561L16.2293 7.15193L0.000172933 7.15207Z"
        fill="currentColor"
      />
    </svg>
  );
};
