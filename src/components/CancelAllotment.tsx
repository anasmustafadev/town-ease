"use client";
import React, { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardHeader, CardTitle } from "./ui/card";
interface CancelAllotmentProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
}
const CancelAllotment = ({
  isOpen,
  onClose,
  setIsOpen,
}: CancelAllotmentProps) => {
  const defaultValue = {
    date: "",
    plot: "",
    deductionAmount: 0,
    deductionAmountPercentage: 0,
    reason: "",
  };
  const [formData, setFormData] = useState(defaultValue);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    onClose();
    setFormData(defaultValue);
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <CardHeader className="flex">
              <CardTitle className="mx-auto mb-5 text-3xl">
                Cancel Allotment
              </CardTitle>
            </CardHeader>
            <div>
              <p>Date</p>
              <input
                name="date"
                onChange={handleChange}
                value={formData.date}
                type="date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Plot</p>
              <select
                name="plot"
                onChange={handleChange}
                value={formData.plot}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
            </div>
            <div className="flex justify-between">
              <div>
                <p>Deduction Amount</p>
                <input
                  name="deductionAmount"
                  onChange={handleChange}
                  value={formData.deductionAmount}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Deduction Amount %</p>
                <input
                  name="deductionAmountPercentage"
                  onChange={handleChange}
                  value={formData.deductionAmountPercentage}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <p>Reason for Allotment Cancel</p>
              <input
                name="reason"
                onChange={handleChange}
                value={formData.reason}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded-lg border-2 border-blue-500 px-4 py-2 font-semibold text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="rounded-lg border-2 border-red-500 px-4 py-2 font-semibold text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                  setFormData(defaultValue);
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>
    </div>
  );
};

export default CancelAllotment;
