import type { ComponentProps, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ValueCardProps = ComponentProps<"div"> & {
  title: string;
  description: string;
  footer?: ReactNode;
};

export function GenericCard({
  className,
  title,
  description,
  children,
  footer,
  ...rest
}: ValueCardProps) {
  return (
    <Card className={className} {...rest}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 pt-0 sm:pt-0 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 flex-1 sm:p-6 text-5xl font-bold items-center justify-center flex">
        {children}
      </CardContent>
      {footer ? (
        <CardFooter className="flex-col gap-2">{footer}</CardFooter>
      ) : null}
    </Card>
  );
}
