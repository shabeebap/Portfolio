import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
