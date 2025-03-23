import React, { useState } from 'react'
import Backdrop from './Backdrop';
import { Card, CardHeader,CardTitle } from "~/components/ui/card";

interface AddAccountBookProps {
    isOpen: boolean;
    onClose: () => void;
    setIsOpen: (type: boolean) => void;
  }

const AddAccountBook = ({isOpen,onClose,setIsOpen}:AddAccountBookProps) => {
    const [accountBookName,setAccountBookName]=useState("");
    const [nameErrors,setNameErrors]=useState("");
    const validateName = (name:string)=>{
      const nameRegex = /^[A-Za-z\s]+$/;
      if(!name || !nameRegex.test(name)){
        setNameErrors( "Please enter a valid name.");
        return false;
      }
      return true;
    }
    const handleSubmit=()=>{
      if(validateName(accountBookName)){
        onClose();
        setAccountBookName("");
      } 
    }
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <CardHeader className="flex">
              <CardTitle className="mx-auto mb-5 text-3xl">Add Account Book Detail</CardTitle>
            </CardHeader>
            <div>
              <p>Account Book Name</p>
              <input
                type="text"
                value={accountBookName}
                name="accountBookName"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                onChange={(e)=>{setAccountBookName(e.target.value); setNameErrors("");}}
              />
              {nameErrors && (
                 <p className="text-red-500 text-sm">{nameErrors}</p>
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
                onClick={() => {setIsOpen(false)
                    setAccountBookName("");
                    setNameErrors("");
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>
    </div>
  )
}

export default AddAccountBook
