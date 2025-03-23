"use client";
import React from "react";
import Link from "next/link";
import { IoIosPerson } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdLandscape } from "react-icons/md";
import {
  FaBook,
  FaChartBar,
  FaMoneyBillAlt,
  FaPersonBooth,
} from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "./ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/home/dashboard"} className="pl-5 text-3xl">
          Eden Home
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Eden Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  name: "Dashboard",
                  link: "/home/dashboard",
                  icon: <MdDashboard />,
                },
                {
                  name: "Profile",
                  link: "/home/profile",
                  icon: <IoIosPerson />,
                },
                { name: "Plots", link: "/home/plots", icon: <MdLandscape /> },
                {
                  name: "Account Book",
                  link: "/home/accountbook",
                  icon: <FaBook />,
                },
                {
                  name: "Allotment",
                  link: "/home/allotment",
                  icon: <FaChartBar />,
                },
                {
                  name: "Expenses",
                  link: "/home/expenses",
                  icon: <FaMoneyBillAlt />,
                },
                {
                  name: "Client",
                  link: "/home/client",
                  icon: <FaPersonBooth />,
                },
              ].map((element) => {
                return (
                  <Link
                    href={element.link}
                    key={element.name}
                    className="mt-2 flex items-center rounded-2xl px-4 py-2 hover:cursor-pointer hover:bg-opacity-25"
                  >
                    <div className="mr-2">{element.icon}</div>
                    {element.name}
                  </Link>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <div className="md:hidden bottom-2 left-2 fixed z-50 text-black">
//         <button onClick={toggleSidebar} className="p-1 bg-white rounded-full">
//           {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
//         </button>
//       </div>

//       <div
//         className={`h-screen fixed bg-slate-600 w-52 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out md:translate-x-0 z-40`}
//       >
//         <div className="flex flex-col flex-1 overflow-y-auto pt-5">
//           <div>
//             <Link
//               href={"/home/dashboard"}
//               className="text-gray-100 text-3xl pl-5"
//             >
//               Eden Home
//             </Link>
//           </div>
//           <nav className="flex flex-col flex-1 overflow-y-auto bg-slate-600 pt-10 px-2 gap-10">
//             <div className="flex flex-col flex-1 gap-3">
//               {[
//                 {
//                   name: "Dashboard",
//                   link: "/home/dashboard",
//                   icon: <MdDashboard />,
//                 },
//                 {
//                   name: "Profile",
//                   link: "/home/profile",
//                   icon: <IoIosPerson />,
//                 },
//                 { name: "Plots", link: "/home/plots", icon: <MdLandscape /> },
//                 {
//                   name: "Account Book",
//                   link: "/home/accountbook",
//                   icon: <FaBook />,
//                 },
//                 {
//                   name: "Allotment",
//                   link: "/home/allotment",
//                   icon: <FaChartBar />,
//                 },
//                 {
//                   name: "Expenses",
//                   link: "/home/expenses",
//                   icon: <FaMoneyBillAlt />,
//                 },
//               ].map((element) => {
//                 return (
//                   <Link
//                     href={element.link}
//                     key={element.name}
//                     className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-400 hover:bg-opacity-25 hover:cursor-pointer rounded-2xl"
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="mr-2">{element.icon}</div>
//                     {element.name}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>
//         </div>
//       </div>

//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// }

export default AppSidebar;
