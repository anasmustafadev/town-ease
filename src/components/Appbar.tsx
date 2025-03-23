import React from "react";
import Link from "next/link";

function Appbar() {
  return (
    <div className="bg-slate-600 px-5 py-4 shadow-sm shadow-slate-800 fixed h-40">
      <Link href={"/home/dashboard"} className="text-gray-100 text-3xl">
        Eden Home
      </Link>
    </div>
  );
}

export default Appbar;
