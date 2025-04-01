import type { ComponentProps, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ValueCardProps = ComponentProps<"div"> & {
  title: string;
  actions?: ReactNode;
  description?: string;
  footer?: ReactNode;
};

export function GenericCard({
  className,
  title,
  description,
  children,
  footer,
  actions,
  ...rest
}: ValueCardProps) {
  return (
    <Card className={className} {...rest}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-row items-center justify-between gap-2 px-6 py-5 pt-0 sm:pt-0 sm:py-6">
          <CardTitle>{title}</CardTitle>
          {actions}
        </div>
      </CardHeader>
      <CardContent className="px-2 flex-1 sm:p-6 text-5xl font-bold items-center justify-center flex">
        {children}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {footer}
        <div className="text-muted-foreground text-center">{description}</div>
      </CardFooter>
    </Card>
  );
}
