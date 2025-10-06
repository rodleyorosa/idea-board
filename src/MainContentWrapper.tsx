import { Hamburger } from "./assets/Hamburger";
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
      className={`flex flex-col gap-6 ${
        fullscreenMobile ? "p-0 sm:p-6 lg:ml-0 sm:lg:ml-64" : "p-6 lg:ml-64"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-3 ${
          fullscreenMobile ? "px-4 pt-4 sm:px-0 sm:pt-0" : ""
        }`}
      >
        <Hamburger onClick={openSidebar} />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};
