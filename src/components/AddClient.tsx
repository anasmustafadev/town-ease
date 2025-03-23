"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "~/components/Backdrop";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { type personType } from "~/types/personType";
import axios from "axios";

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
  isModalAdd: boolean;
  updateData: (string | number)[];
}

const AddClient = ({
  isOpen,
  onClose,
  setIsOpen,
  isModalAdd,
  updateData,
}: AddClientProps) => {
  const addUser = async (user: personType) => {
    await axios.post("/api/clients", {
      name: user.name,
      cnic: user.cnic,
      phone: user.phone,
      address: user.address,
    });
  };

  const updateUser = async (user: personType) => {
    await axios.put("/api/clients", {
      id: user.id,
      name: user.name,
      cnic: user.cnic,
      phone: user.phone,
      address: user.address,
    });
  };

  interface Form {
    type: number;
    name: string;
    cnic: string;
    address: string;
    phone: string;
  }

  const defaultValue = {
    type: 0,
    name: "",
    cnic: "",
    phone: "",
    address: "",
  };
  const errorsDefault = {
    type: "",
    name: "",
    cnic: "",
    phone: "",
    address: "",
  };
  const [errors, setErrors] = useState(errorsDefault);
  const [form, setForm] = useState<Form>(defaultValue);
  useEffect(() => {
    if (isModalAdd == false) {
      const updatedForm = {
        type: Number(updateData[0]),
        name: String(updateData[1]),
        cnic: String(updateData[2]),
        phone: String(updateData[3]),
        address: String(updateData[4]),
      };
      setForm(updatedForm);
    }
  }, [updateData]);
  function setFormValue(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name == "type" ? Number(e.target.value) : e.target.value,
      };
    });
    setErrors({ ...errors, [e.target.name]: "" });
  }
  const handleSubmit = async () => {
    if (
      validateAddress(form.address) ||
      validateCnicNumber(form.cnic) ||
      validateName(form.name) ||
      validatePhoneNumber(form.phone) ||
      validateType(form.type)
    ) {
      if (isModalAdd == true) {
        console.log("Add");
        await addUser({
          id: 1,
          name: form.name,
          cnic: form.cnic,
          phone: form.phone,
          address: form.address,
        });
      } else if (isModalAdd == false) {
        console.log(updateData);
        console.log("Update");
        if (updateData[0]) {
          await updateUser({
            id: parseInt(updateData[0].toString()),
            name: form.name,
            cnic: form.cnic,
            phone: form.phone,
            address: form.address,
          });
        }
      }
      setForm(() => defaultValue);
      onClose();
    }
  };
  const validateType = (type: number) => {
    if (type === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: "Type is required",
      }));
      return false;
    }
    return true;
  };
  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please enter a valid name.",
      }));
      return false;
    }
    return true;
  };
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+[1-9]{1}[0-9]{7,14}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone:
          "Please enter a valid phone number in international format (e.g., +923058111211).",
      }));
      return false;
    }
    return true;
  };
  const validateCnicNumber = (cnic: string) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnic || !cnicRegex.test(cnic)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cnic: "Please enter a valid cnic number in format (e.g., 32203-4060544-5).",
      }));
      return false;
    }
    return true;
  };
  const validateAddress = (address: string) => {
    if (!address || address.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Please enter a valid address.",
      }));
      return false;
    }
    return true;
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[90vh] min-w-[20rem] max-w-[30rem] flex-col items-center overflow-y-auto">
          <CardHeader className="flex">
            <CardTitle className="mx-auto mb-5 text-3xl">Client Menu</CardTitle>
          </CardHeader>
          <CardContent className="flex w-auto flex-col flex-wrap p-5">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full">
                <p>Type</p>
                <select
                  name="type"
                  onChange={setFormValue}
                  value={form.type}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={0}>Select Type</option>
                  <option value={1}>Purchaser</option>
                  <option value={2}>Investor</option>
                  <option value={3}>Employee</option>
                  <option value={4}>Bank</option>
                </select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>
              <div className="w-full">
                <p>Name</p>
                <input
                  placeholder="Mudasir"
                  type="text"
                  name="name"
                  onChange={setFormValue}
                  value={form.name}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="w-full">
                <p>CNIC</p>
                <input
                  placeholder="32203-4060544-5"
                  type="text"
                  name="cnic"
                  onChange={setFormValue}
                  value={form.cnic}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.cnic && (
                  <p className="text-sm text-red-500">{errors.cnic}</p>
                )}
              </div>
              <div className="w-full">
                <p>Phone</p>
                <input
                  placeholder="+923058111211"
                  type="text"
                  name="phone"
                  onChange={setFormValue}
                  value={form.phone}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <div className="w-full">
                <p>Address</p>
                <input
                  placeholder="Layyah"
                  type="text"
                  name="address"
                  onChange={setFormValue}
                  value={form.address}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            </div>
            <CardFooter className="mt-5 w-full">
              <div className="flex w-full justify-between">
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
                    setForm(() => defaultValue);
                    setErrors(errorsDefault);
                  }}
                >
                  Exit
                </button>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddClient;
