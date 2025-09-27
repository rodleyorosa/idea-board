import { Hamburger } from "./assets/Hamburger";
import { useSidebar } from "./hooks/useSidebar";

interface MainContentWrapperProps {
  children: React.ReactNode;
  title: string;
}

export const MainContentWrapper = ({
  children,
  title,
}: MainContentWrapperProps) => {
  const { openSidebar } = useSidebar();

  return (
    <div className="flex flex-col gap-6 p-6 lg:ml-64">
      <div className="flex items-center gap-3">
        <Hamburger onClick={openSidebar} />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};
