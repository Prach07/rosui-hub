
import { ReactNode } from "react";
import RosSidebar from "./RosSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface RosLayoutProps {
  children: ReactNode;
}

const RosLayout = ({ children }: RosLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <RosSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <SidebarTrigger className="mb-4" />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default RosLayout;
