import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import Backdrop from "~/components/Backdrop";
import { type expenseType } from "~/types/expenseType";
import axios from "axios";
interface AddExpenseProps {
  isOpen: boolean;
  setIsOpen: (type: boolean) => void;
  onClose: () => void;
}
const AddExpense = ({ isOpen, setIsOpen, onClose }: AddExpenseProps) => {
  const addExpense = async (expense: expenseType) => {
    await axios.post("/api/expenses", {
      id: expense.id,
      date: expense.date,
      amount: expense.amount,
      description: expense.description,
    });
  };
  const defaultValue = {
    date: "",
    amount: 0,
    description: "",
  };
  const errorsDefault = {
    date: "",
    amount: "",
    description: "",
  };
  const [errors, setErrors] = useState(errorsDefault);
  const [formData, setFormData] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleSubmit = async () => {
    // Handle form submission
    if (validateForm()) {
      await addExpense({
        id: 0,
        amount: formData.amount,
        date: new Date(formData.date),
        description: formData.description,
      });
      onClose();
      setFormData(defaultValue);
    }
  };

  const decimalRegex = /^\d+(\.\d+)?$/;
  const alphabetsRegex = /^[A-Za-z\s]{1,100}$/;
  const validateForm = () => {
    let validation = true;
    if (!formData.date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is Required",
      }));
      validation = false;
    }
    if (
      !decimalRegex.test(formData.amount.toString()) ||
      formData.amount <= 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount: "Must be number and greater than 0",
      }));
      validation = false;
    }
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
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="w-[30rem] p-5">
            <CardHeader className="flex">
              <CardTitle className="mx-auto mb-5 text-3xl">
                Add Expense
              </CardTitle>
            </CardHeader>
            <div>
              <p>Date</p>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            <div>
              <p>Amount</p>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded bg-blue-500 px-3 py-2"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() => {
                  setIsOpen(false);
                  setFormData(defaultValue);
                  setErrors(errorsDefault);
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

export default AddExpense;
