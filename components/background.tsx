import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

export function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      <AnimatedGridPattern
        numSquares={100}
        maxOpacity={0.5}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          "text-white"
        )}
      />
    </div>
  );
}
