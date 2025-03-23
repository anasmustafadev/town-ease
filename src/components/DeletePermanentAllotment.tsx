"use client"
import React,{useState} from 'react'
import Backdrop from './Backdrop'
import { Card,CardTitle,CardHeader } from './ui/card'

interface DeletePermanentAllotmentProps {
    isOpen:boolean,
    onClose:()=>void,
    setIsOpen:(type:boolean)=>void
}
const DeletePermanentAllotment = ({isOpen,onClose,setIsOpen}:DeletePermanentAllotmentProps) => {
    const defaultValue={
        plot: "",
        password: "",
    }
    const [formData, setFormData] = useState(defaultValue);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        <Backdrop
        isOpen={isOpen}
        onClose={onClose}
        >
        <Card>
          <div className="flex flex-col gap-3 p-5 w-[30rem]">
            <CardHeader className="flex">
                <CardTitle className="text-3xl mx-auto mb-2">Delete Allotment Completely</CardTitle>
            </CardHeader>
            <div>
              <p>Plot</p>
              <select name='plot' onChange={handleChange} value={formData.plot} className="mt-1 w-full block rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                <option value="">Choose</option>
              </select>
            </div>
            <div>
              <label>
                <input type="checkbox" className="mr-2" />
                1. Choose Allotment that will be permanently Deleted carefully.
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" className="mr-2" />
                2. Your above selected allotment information will be deleted
                permanently.
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" className="mr-2" />
                3. Enter your login password.
              </label>
            </div>
            <div>
              <p>Enter Password</p>
              <input
                name='password'
                onChange={handleChange}
                value={formData.password}
                type="password"
                placeholder='****'
                className="mt-1 w-full block rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                 className="border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out"
                 onClick={handleSubmit}
              >
                Delete Allotment
              </button>
              <button
                className="border-2 border-red-500 text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out"
                onClick={() =>{ setIsOpen(false)
                  setFormData(defaultValue);
                }
              }
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

export default DeletePermanentAllotment


