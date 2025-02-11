import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {}

const Root = ({ className, ...props }: PaginationProps) => (
  <div
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const Content = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
);

const Item = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-1", className)} {...props} />
);

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const Link = ({ className, isActive, ...props }: PaginationButtonProps) => (
  <button
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size: "icon",
      }),
      className,
    )}
    {...props}
  />
);

const Previous = ({ className, isActive, ...props }: PaginationButtonProps) => (
  <button
    className={cn(
      buttonVariants({
        variant: "ghost",
        size: "icon",
      }),
      className,
    )}
    disabled={!isActive}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </button>
);

const Next = ({ className, isActive, ...props }: PaginationButtonProps) => (
  <button
    className={cn(
      buttonVariants({
        variant: "ghost",
        size: "icon",
      }),
      className,
    )}
    disabled={!isActive}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </button>
);

export const Pagination = Object.assign(Root, {
  Content,
  Item,
  Link,
  Previous,
  Next,
});
