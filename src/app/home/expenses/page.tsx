"use client";
import React, { useEffect } from "react";
import SimpleTable from "~/components/SimpleTable";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import AddExpense from "~/components/AddExpense";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import { type expenseType } from "~/types/expenseType";
import axios from "axios";

const Page = () => {
  const [expenses, setExpenses] = useState<expenseType[]>([]);
  const getExpenses = async (): Promise<expenseType[]> => {
    console.log("At Clients");
    const response = await axios.get("/api/expenses");
    return response.data as expenseType[];
  };
  useEffect(() => {
    getExpenses()
      .then((data) => setExpenses(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);

  const transformExpenseData = (apiData: expenseType[]) => {
    // Add headers to the first row
    const formattedData = [
      ["No.", "Date", "Expense Details", "Amount"],
      ["1", "12/4/2024", "Office Expense", "15,000"],
      ["2", "12/2/2024", "File Expense", "450,000"],
      ["3", "12/2/2024", "Total Expense", "465,000"],
      ...apiData.map((expense) => [
        expense.id.toString(), // Transform id to string for consistency in the table
        new Intl.DateTimeFormat("en-US").format(new Date(expense.date)),
        expense.description,
        expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), // Format amount with commas
      ]),
    ];

    return formattedData;
  };

  const expenseData = transformExpenseData(expenses);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    getExpenses()
      .then((data) => setExpenses(data))
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
      <AddExpense isOpen={isOpen} onClose={onClose} setIsOpen={setIsOpen} />
      <div className="flex w-full flex-col gap-5">
        <Card>
          <CardHeader>
            <PageHeader
              icon={<FaMoneyBillAlt className="text-4xl" />}
              title="Expenses"
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
                  className="max-h-96 w-52 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-md"
                  align="end"
                >
                  <DropdownMenuLabel className="px-4 py-2 font-bold text-gray-700">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 border-t" />

                  <DropdownMenuItem
                    onClick={openBackdrop}
                    className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90"
                  >
                    Add Expense Account
                  </DropdownMenuItem>
                  <DropdownMenuItem className="mb-2 flex items-center rounded border-b border-gray-300 px-4 py-2 hover:opacity-90">
                    Print Expenses
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent></CardContent>
          <div>
            <SimpleTable data={expenseData} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Page;
