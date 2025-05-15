import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export function BentoGrid({
  className,
  children,
  ...props
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[22rem] mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  ...props
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "group/bento row-span-1 rounded-xl border-2 p-4",
        "bg-white dark:bg-rehabify-alt/5",
        "border-rehabify-core/10 dark:border-rehabify-core/10",
        "hover:border-rehabify-core/30 dark:hover:border-rehabify-highlight/30",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:shadow-rehabify-core/5",
        className
      )}
      {...props}
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {header}
        <div className="absolute inset-0 flex h-full flex-col justify-between gap-2 p-6">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2 bg-white dark:bg-rehabify-alt p-2 rounded-full shadow-sm">
              {icon}
              <h3 className="font-semibold text-base sm:text-lg text-rehabify-core dark:text-secondary-honeydew">
                {title}
              </h3>
            </div>
          </div>
          <div
            className="bg-white dark:bg-rehabify-alt p-4 rounded-xl
            shadow-sm transition-all duration-300 ease-in-out
            translate-y-4 group-hover/bento:translate-y-0"
          >
            <p className="text-sm text-rehabify-core/80 dark:text-secondary-honeydew/80">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
