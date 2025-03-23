"use client";
import React, { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface FormErrors {
  date?: string;
  plot?: string;
  amount?: string;
  description?: string;
}

interface AddReturnAmountProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
  heading: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateForm: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: any,
    setErrors: (updateFn: (prevErrors: FormErrors) => FormErrors) => void,
  ) => boolean;
}
const AddReturnAmount = ({
  isOpen,
  onClose,
  setIsOpen,
  heading,
  validateForm,
}: AddReturnAmountProps) => {
  const defaultValue = {
    date: "",
    plot: "",
    amount: 0,
    description: "",
  };
  const errorDefault = {
    date: "",
    plot: "",
    amount: "",
    description: "",
  };
  const [errors, setErrors] = useState<FormErrors>(errorDefault);
  const [formData, setFormData] = useState(defaultValue);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    // Handle form submission
    if (validateForm(formData, setErrors)) {
      onClose();
      setFormData(defaultValue);
    }
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <CardHeader className="flex">
              <CardTitle className="mb-5 text-center text-3xl">
                {heading}
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
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div>
              <p>Plot</p>
              <select
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
              {errors.plot && (
                <p className="text-sm text-red-500">{errors.plot}</p>
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <p>Amount</p>
                <input
                  name="amount"
                  onChange={handleChange}
                  value={formData.amount}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">{errors.amount}</p>
                )}
              </div>
              <div>
                <p>Description</p>
                <input
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  type="text"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
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

export default AddReturnAmount;
