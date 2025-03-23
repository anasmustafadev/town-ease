import React, { type ReactNode } from "react";

interface props {
  icon: ReactNode;
  title: string;
}

function PageHeader({ icon, title }: props) {
  return (
    <div className="flex w-full items-center gap-5">
      {icon}
      <div>
        <h1 className="text-2xl">{title}</h1>
        <p>Town Management System</p>
      </div>
    </div>
  );
}

export default PageHeader;
