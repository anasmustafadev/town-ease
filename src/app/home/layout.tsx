import React from "react";
import { type ReactNode } from "react";
import AppSidebar from "~/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-x-hidden bg-slate-200 px-10">
      <SidebarProvider className="flex items-start justify-around">
        <AppSidebar></AppSidebar>
        <div className="relative z-10 mt-5 w-full md:w-[calc(100%-250px)]">
          <SidebarTrigger className="z-100 fixed bottom-0 left-0 mb-4 lg:hidden" />
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default layout;
