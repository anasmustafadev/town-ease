"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import AppTable from "~/components/Table";
import PageHeader from "~/components/PageHeader";
import { FaChartBar } from "react-icons/fa";
import AddAllotment from "~/components/AddAllotment";
import AddAdvance from "~/components/AddAdvance";
import AddInstallment from "~/components/AddInstallment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import AddReturnAmount from "~/components/AddReturnAmount";
import AddMultiInstallment from "~/components/AddMultiInstallment";
import CancelAllotment from "~/components/CancelAllotment";
import DeletePermanentAllotment from "~/components/DeletePermanentAllotment";
import { type AllotmentRecord } from "~/types/allotmentType";
import axios from "axios";

interface FormErrors {
  date?: string;
  plot?: string;
  amount?: string;
  description?: string;
}

const Page = () => {
  const [allotments, setAllotments] = useState<AllotmentRecord[]>([]);
  const getAllotments = async (): Promise<AllotmentRecord[]> => {
    console.log("At Allotments");
    const response = await axios.get("/api/allotments");
    return response.data as AllotmentRecord[];
  };
  useEffect(() => {
    console.log("in herer");
    getAllotments()
      .then((data) => setAllotments(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);
  const decimalRegex = /^\d+(\.\d+)?$/;
  const alphabetsRegex = /^[A-Za-z\s]{1,100}$/;
  const validateAdvanceInstallmentAndReturnAmountForm = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: any,
    setErrors: (updateFn: (prevErrors: FormErrors) => FormErrors) => void,
  ) => {
    let validation = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!formData.date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is Required",
      }));
      validation = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!formData.plot) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        plot: "Plot type is Required",
      }));
      validation = false;
    }
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      !decimalRegex.test(formData.amount.toString()) ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      formData.amount <= 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Must be number",
      }));
      validation = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (!alphabetsRegex.test(formData.description)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Must be alphabets and can't exceed 100 characters.",
      }));
      validation = false;
    }
    if (validation) {
      return true;
    } else {
      return false;
    }
  };
  function transformAllotmentData(allotments: AllotmentRecord[]): string[][] {
    return allotments.map((allotment) => [
      allotment.ID.toString(),
      new Date(allotment.Date).toLocaleDateString(), // Formats the date as DD-MM-YYYY
      `Plot#${allotment.Plot}`,
      allotment.ClientName,
      `${allotment.Area.toFixed(2)}M`, // Formats area with 2 decimal places and adds "M"
      allotment.SaleRate.toLocaleString(), // Formats sale rate with commas
      allotment.Price.toLocaleString(), // Formats price with commas
      allotment.Advance.toLocaleString(), // Formats advance payment with commas
      (allotment.Price - allotment.Advance).toLocaleString(), // Calculates installment amount
      `${allotment.NoOfInstallments}(${allotment.Installment})`, // Combines installments and type
    ]);
  }

  const allotmentData = transformAllotmentData(allotments);
  const headers = [
    "ID",
    "Date",
    "Plot",
    "Client Name",
    "Area",
    "Sale Rate",
    "Price",
    "Advance",
    "Installment",
    "No of Installments",
  ];
  const buttons = allotmentData.map(() => [
    {
      label: "Stamp paper",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "STAMPPAPER",
      data: ["", "", "", "", "", "", "", "", ""],
      onClick: () => {
        console.log("To Be Implemented");
      },
    },
  ]);

  const report = [
    ["Total Area", "47.49 Marla"],
    ["Sold Area", "5.56 Marla"],
    ["For Sale Area", "41.83 Marla"],
    ["Total Expenses", "465,000,000"],
  ];

  const [isAddAllotmentOpen, setIsAddAllotmentOpen] = useState(false);
  const [isAddAdvanceOpen, setIsAddAdvanceOpen] = useState(false);
  const [isAddInstallmentOpen, setIsAddInstallmentOpen] = useState(false);
  const [isAddMultiInstallmentOpen, setIsAddMultiInstallmentOpen] =
    useState(false);
  const [isCancelAllotmentOpen, setIsCancelAllotmentOpen] = useState(false);
  const [isReturnAmountOpen, setIsReturnAmountOpen] = useState(false);
  const [isDeletePermanentAllotmentOpen, setIsDeletePermanentAllotmentOpen] =
    useState(false);

  const onCloseAddAllotment = () => {
    getAllotments()
      .then((data) => setAllotments(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
    setIsAddAllotmentOpen(false);
  };
  const onCloseAddAdvance = () => {
    setIsAddAdvanceOpen(false);
  };
  const onCloseAddInstallment = () => {
    setIsAddInstallmentOpen(false);
  };
  const onCloseAddMultiInstallment = () => {
    setIsAddMultiInstallmentOpen(false);
  };
  const onCloseCancelAllotment = () => {
    setIsCancelAllotmentOpen(false);
  };
  const onCloseReturnAmount = () => {
    setIsReturnAmountOpen(false);
  };
  const onCloseDeletePermanentAllotment = () => {
    setIsDeletePermanentAllotmentOpen(false);
  };
  const openAddAllotment = () => {
    setIsAddAllotmentOpen(true);
  };
  const openAddAdvance = () => {
    setHeading("Add Advance Detail");
    setIsAddAdvanceOpen(true);
  };
  const openAddInstallment = () => {
    setHeading("Add Installment Detail");
    setIsAddInstallmentOpen(true);
  };
  const openAddMultiInstallment = () => {
    setIsAddMultiInstallmentOpen(true);
  };
  const openCancelAllotment = () => {
    setIsCancelAllotmentOpen(true);
  };
  const openReturnAmount = () => {
    setHeading("Return Amount of Canceled Plot");
    setIsReturnAmountOpen(true);
  };
  const openDeletePermanentAllotment = () => {
    setIsDeletePermanentAllotmentOpen(true);
  };
  const [heading, setHeading] = useState("");
  return (
    <div className="overflow-x-hidden">
      <AddAllotment
        isOpen={isAddAllotmentOpen}
        onClose={onCloseAddAllotment}
        setIsOpen={setIsAddAllotmentOpen}
      />
      <AddAdvance
        isOpen={isAddAdvanceOpen}
        onClose={onCloseAddAdvance}
        setIsOpen={setIsAddAdvanceOpen}
        heading={heading}
        validateForm={validateAdvanceInstallmentAndReturnAmountForm}
      />
      <AddInstallment
        isOpen={isAddInstallmentOpen}
        onClose={onCloseAddInstallment}
        setIsOpen={setIsAddInstallmentOpen}
        heading={heading}
        validateForm={validateAdvanceInstallmentAndReturnAmountForm}
      />
      <AddReturnAmount
        isOpen={isReturnAmountOpen}
        onClose={onCloseReturnAmount}
        setIsOpen={setIsReturnAmountOpen}
        heading={heading}
        validateForm={validateAdvanceInstallmentAndReturnAmountForm}
      />
      <AddMultiInstallment
        isOpen={isAddMultiInstallmentOpen}
        onClose={onCloseAddMultiInstallment}
        setIsOpen={setIsAddMultiInstallmentOpen}
      />
      <CancelAllotment
        isOpen={isCancelAllotmentOpen}
        onClose={onCloseCancelAllotment}
        setIsOpen={setIsCancelAllotmentOpen}
      />
      <DeletePermanentAllotment
        isOpen={isDeletePermanentAllotmentOpen}
        onClose={onCloseDeletePermanentAllotment}
        setIsOpen={setIsDeletePermanentAllotmentOpen}
      />

      <div className="flex w-full flex-col gap-5">
        <Card className="w-full">
          <CardHeader>
            <PageHeader
              icon={<FaChartBar className="text-4xl" />}
              title="Allotments"
            />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Allotments</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-md p-2 hover:bg-gray-200">
                    <IoMdMenu className="text-2xl" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="max-h-96 w-52 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-md"
                  align="end"
                >
                  <DropdownMenuLabel className="px-4 py-2 font-bold text-gray-700">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 border-t" />

                  <DropdownMenuItem
                    onClick={openAddAllotment}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Add New Allotment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openAddAdvance}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Add Advance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openAddInstallment}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:bg-blue-700"
                  >
                    Add Installment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openAddMultiInstallment}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Add Multi Installment
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Sale Report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Defaulters SMS Client wise
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Defaulter Report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    List of Installments
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Plot wise Sale Report
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openCancelAllotment}
                    className="items-cente mb-2 flex rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Cancel Allotment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openReturnAmount}
                    className="items-cente mb-2 flex rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Add Return Amount
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openDeletePermanentAllotment}
                    className="items-cente flex rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Delete Permanent Allotment With data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent></CardContent>
          <div>
            <AppTable
              data={allotmentData}
              headers={headers}
              buttons={buttons}
              setUpdateData={() => console.log("To be Implemented")}
            />
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Report</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-wrap gap-10">
            {report.map((element, index) => {
              return (
                <div className="w-full" key={index}>
                  <div className="flex w-full justify-between">
                    <Card className="w-full">
                      <CardHeader className="w-full">
                        <div className="flex w-full justify-between">
                          <h1 className="font-bold">{element[0]}</h1>
                          <span>{element[1]}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
