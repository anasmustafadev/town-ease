"use client";
import React, { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface AddMultiInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
}

const AddMultiInstallment = ({
  isOpen,
  onClose,
  setIsOpen,
}: AddMultiInstallmentProps) => {
  const defaultValue = {
    date: "",
    accountBook: "",
    party: "",
    amount: 0,
    description: "",
  };
  const errorsDefault = {
    date: "",
    accountBook: "",
    party: "",
    amount: "",
    description: "",
  };
  const [errors,setErrors]=useState(errorsDefault);
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
    if(validateForm()){
      onClose();
      setFormData(defaultValue);
    }
  };

  const decimalRegex = /^\d+(\.\d+)?$/;
  const alphabetsRegex = /^[A-Za-z\s]{1,100}$/;
  const validateForm = ()=>{
    let validation = true;
    if(!formData.date){
      setErrors((prevErrors) => ({
        ...prevErrors,
        date:"Date is Required",
      }));
      validation=false;
    }
    if(!formData.accountBook){
      setErrors((prevErrors) => ({
        ...prevErrors,
        accountBook:"Account type is Required",
      }));
      validation=false;
    }
    if(!formData.party){
      setErrors((prevErrors) => ({
        ...prevErrors,
        party:"Party type is Required",
      }));
      validation=false;
    }
    if(!decimalRegex.test(formData.amount.toString()) || formData.amount<=0){
      setErrors((prevErrors) => ({
        ...prevErrors,
        amount:"Must be number and greater than 0",
      }));
      validation=false;
    }
    if(!alphabetsRegex.test(formData.description)){
      setErrors((prevErrors) => ({
        ...prevErrors,
        description:"Must be alphabets and can't exceed 100 characters.",
      }));
      validation=false;
    }
    if(validation){
      return true
    }else{
      return false
    }
  }
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 overflow-y-auto h-[90vh] p-5">
            <CardHeader className="flex">
              <CardTitle className="mb-5 text-center text-3xl">
                Add Multiple Installments of a Client
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
                 <p className="text-red-500 text-sm">{errors.date}</p>
            )}
            </div>
            <div>
              <p>Account Book</p>
              <select
                name="accountBook"
                onChange={handleChange}
                value={formData.accountBook}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
              {errors.accountBook && (
                 <p className="text-red-500 text-sm">{errors.accountBook}</p>
            )}
            </div>
            <div>
              <p>Party</p>
              <select
                name="party"
                onChange={handleChange}
                value={formData.party}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
              {errors.party && (
                 <p className="text-red-500 text-sm">{errors.party}</p>
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
                 <p className="text-red-500 text-sm">{errors.amount}</p>
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
                 <p className="text-red-500 text-sm">{errors.description}</p>
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

export default AddMultiInstallment;
