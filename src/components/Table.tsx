"use client";
import React, { type MouseEventHandler } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface ButtonConfig {
  label: string;
  className: string;
  actionType: string;
  data: (string | number)[];
  onClick: () => void;
}

interface TableProps {
  data: string[][];
  headers: string[];
  buttons: ButtonConfig[][];
  setUpdateData: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

// function Table({ data, headers, buttons }: TableProps) {
//   return (
//     <div className="flex flex-col">
//       <div className="overflow-x-scroll">
//         <div className="inline-block min-w-full py-2 align-middle">
//           <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {headers.map((header, index) => (
//                     <th
//                       key={index}
//                       scope="col"
//                       className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                   <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {data.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td
//                         key={cellIndex}
//                         className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"
//                       >
//                         {cell}
//                       </td>
//                     ))}
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                       {buttons[rowIndex].map((button, buttonIndex) => (
//                         <button
//                           key={buttonIndex}
//                           className={button.className}
//                           onClick={button.onClick}
//                         >
//                           {button.label}
//                         </button>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function AppTable({ data, headers, buttons, setUpdateData }: TableProps) {
  return (
    <Table className="min-w-64 max-w-full">
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead
              key={index}
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              {header}
            </TableHead>
          ))}
          <TableHead
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-900"
              >
                {cell}
              </TableCell>
            ))}
            <TableCell className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium">
              {buttons[rowIndex]?.map((button, buttonIndex) => (
                <button
                  key={buttonIndex}
                  className={button.className}
                  onClick={() => {
                    setUpdateData(() => button.data);
                    button.onClick();
                  }}
                >
                  {button.label}
                </button>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AppTable;
