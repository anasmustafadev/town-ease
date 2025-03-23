"use client";
import React, { useState } from "react";
import { Card, CardHeader,CardContent,CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { FaBook } from "react-icons/fa";
import AppTable from "~/components/Table";
import { FaPlus } from "react-icons/fa";
import Backdrop from "~/components/Backdrop";
import AddAccountBook from "~/components/AddAccountBook";
import AddCashPayment from "~/components/AddCashPayment";
import AddCashReceive from "~/components/AddCashReceive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";

const Page = () => {
  const ledgerData = [
    ["1", "Investors", "-", "400,000", "0.00"],
    ["2", "Buyer", "1,788,000", "-", "0.00"],
    ["3", "Employee", "10,000", "-", "0.00"],
  ];
  const headers = ["No.", "Account Book Name", "Debit", "Credit", "Balance"];
  const buttons = ledgerData.map(() => [
    {
      label: "Detail",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "DETAIL",
      data: ["", ""],
      onClick: () => {
        console.log("To be implemented");
      },
    },
  ]);
  const [isNewLedgerOpen, setIsNewLedgerOpen] = useState(false);
  const [isCashPaymentOpen, setIsCashPaymentOpen] = useState(false);
  const [isCashReceivedOpen, setIsCashReceivedOpen] = useState(false);

  const onCloseNewLedger = () => {
    setIsNewLedgerOpen(false);
  };
  const onCloseCashPayment = () => {
    setIsCashPaymentOpen(false);
  };
  const onCloseCashReceived = () => {
    setIsCashReceivedOpen(false);
  };

  const openNewLedger = () => {
    setIsNewLedgerOpen(true);
  };
  const openCashPayment = () => {
    setHeading("Add Cash Payment");
    setIsCashPaymentOpen(true);
  };
  const openCashReceived = () => {
    setHeading("Add Cash Receive");
    setIsCashReceivedOpen(true);
  };
  const [heading, setHeading] = useState("");
  return (
    <>
      <AddAccountBook isOpen={isNewLedgerOpen} onClose={onCloseNewLedger} setIsOpen={setIsNewLedgerOpen}/>
      <AddCashPayment isOpen={isCashPaymentOpen} onClose={onCloseCashPayment} setIsOpen={setIsCashPaymentOpen} heading={heading} />
      <AddCashReceive isOpen={isCashReceivedOpen} onClose={onCloseCashReceived} setIsOpen={setIsCashReceivedOpen} heading={heading}/>

      <div className="flex w-full flex-col gap-5">
        <Card>
          <CardHeader>
            <PageHeader
              icon={<FaBook className="text-4xl" />}
              title="Account Books"
            />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Account Books</CardTitle>
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
                    onClick={openNewLedger}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    New Ledger
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openCashPayment}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Cash Payment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={openCashReceived}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:bg-blue-700"
                  >
                    Cash Received
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Trial Balance
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Balance Sheet
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Daily Cash
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent></CardContent>
          <div>
            <AppTable
              data={ledgerData}
              headers={headers}
              buttons={buttons}
              setUpdateData={() => console.log("To be Implemented")}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Page;
