import { Menu } from "lucide-react";
import { useSidebar } from "./hooks/useSidebar";

interface MainContentWrapperProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  fullscreenMobile?: boolean;
}

export const MainContentWrapper = ({
  children,
  title,
  className,
  fullscreenMobile = false,
}: MainContentWrapperProps) => {
  const { openSidebar } = useSidebar();

  return (
    <div
      className={`flex flex-col gap-6 lg:ml-64 ${
        fullscreenMobile ? "sm:p-6" : "p-6"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 ${fullscreenMobile && "pt-6 pl-6"}`}
      >
        <button onClick={openSidebar} className="cursor-pointer lg:hidden">
          <Menu className="w-[30px] h-[30px]" strokeWidth={2} />
        </button>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};
