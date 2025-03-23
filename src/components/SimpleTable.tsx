"use client";
import React from "react";

function SimpleTable({ data }: { data: string[][] }) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    {data[0]?.map((element: string, index: number) => {
                      return (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                        >
                          {element}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.map((element: string[], idx: number) => {
                    if (idx != 0) {
                      return (
                        <tr key={idx}>
                          {element.map((i: string, index: number) => {
                            return (
                              <td
                                key={index}
                                className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
                              >
                                {i}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleTable;
