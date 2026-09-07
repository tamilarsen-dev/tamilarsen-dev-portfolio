import Image from "next/image";
import { cn } from "@/lib/utils";

export function LinkedinIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <Image
      src="/logo/linkedin-in-bug.png"
      alt="LinkedIn"
      width={635}
      height={540}
      className={cn("h-4 w-4 object-contain", className)} // default h-4 w-4
    />
  );
}
