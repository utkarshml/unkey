import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type SectionTitleProps = {
  label?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
};

export function SectionTitle({
  label,
  title,
  text,
  // align = "left",
  children,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className={cn("font-mono text-sm md:text-md text-white/50 text-center")}>{label}</span>
      <h2
        className={cn(
          "text-[28px] sm:pb-3 sm:text-[52px] sm:leading-[64px] text-white text-pretty max-w-sm md:max-w-md lg:max-w-2xl via-30/%  pt-4 font-medium bg-gradient-to-br text-transparent bg-gradient-stop bg-clip-text from-white via-white to-white/30 text-center leading-none",
        )}
      >
        {title}
      </h2>
      {text && (
        <p
          className={cn(
            "text-sm md:text-base text-white/70 leading-7 py-6 text-center max-w-sm md:max-w-md lg:max-w-xl text-balance",
          )}
        >
          {text}
        </p>
      )}
      {children}
    </div>
  );
}

export const Section: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <section className={cn(className)}>{children}</section>;
};
