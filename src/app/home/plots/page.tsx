"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { MdLandscape } from "react-icons/md";
import AppTable from "~/components/Table";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useState, useEffect } from "react";
import AddPlot from "~/components/AddPlot";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import { type plotType } from "~/types/plotType";

const Page = () => {
  const [plots, setPlots] = useState<plotType[]>([]);
  const getPlots = async (): Promise<plotType[]> => {
    const response = await axios.get("/api/plots");
    return response.data as plotType[];
  };
  useEffect(() => {
    getPlots()
      .then((data) => setPlots(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);
  const transformPlotData = (plots: plotType[]) => {
    return plots.map((plot) => [
      plot.plotId.toString(), // No.
      plot.type, // Plot Type
      `${plot.area} Marla`, // Area
      `${plot.width}x${plot.height}`, // Size
      plot.ratePerMarla.toString(), // Rate
      plot.price ? plot.price.toString() : "0", // Amount
      plot.total ? plot.total.toString() : "0",
    ]);
  };
  const plotData = transformPlotData(plots);

  const headers = [
    "No.",
    "Plot",
    "Area",
    "Size",
    "Rate",
    "Amount",
    "Total Amount",
  ];
  const buttons = plotData.map((element) => [
    {
      label: "Update",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "DETAIL",
      data: element,
      onClick: () => {
        setIsModalAdd(false);
        openBackdrop();
      },
    },
  ]);
  const [updateData, setUpdateData] = useState<(string | number)[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(true);
  const onClose = () => {
    getPlots()
      .then((data) => setPlots(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
    setIsOpen(false);
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };
  return (
    <>
      <AddPlot
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={setIsOpen}
        isModalAdd={isModalAdd}
        updateData={updateData}
      />
      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<MdLandscape className="text-4xl" />}
                title="Plots"
              />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Details</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-2 hover:bg-gray-200">
                      <IoMdMenu className="text-2xl" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-40 rounded-lg border border-gray-200 bg-white shadow-md"
                    align="end"
                  >
                    <DropdownMenuLabel className="px-4 py-2 font-bold text-gray-700">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 border-t" />

                    <DropdownMenuItem
                      onClick={() => {
                        setIsModalAdd(true);
                        openBackdrop();
                      }}
                      className="flex items-center rounded px-4 py-2 hover:opacity-90"
                    >
                      <FaPlus className="mr-2" />
                      Add Plot
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center rounded px-4 py-2 hover:bg-blue-700">
                      <FaPrint className="mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <AppTable
                data={plotData}
                headers={headers}
                buttons={buttons}
                setUpdateData={setUpdateData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
