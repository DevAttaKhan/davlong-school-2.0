import React from "react";

type Props = {
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
  LoadingComponent: React.ReactNode;
  ErrorComponent: React.ReactNode;
};

export const AppFalbackWrapper = ({
  isLoading,
  isError,

  children,
  LoadingComponent,
  ErrorComponent,
}: Props) => {
  if (isLoading) return LoadingComponent;
  if (isError) return ErrorComponent;

  return <>{children}</>;
};
