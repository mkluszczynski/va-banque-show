import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBarView() {
  return (
    <div className="absolute top-0 right-0 p-4">
      {/* <SunMoon /> */}
      <ThemeToggle />
    </div>
  );
}
