"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import AddClient from "./AddClient";
import { type personType } from "~/types/personType";
import axios from "axios";
import { type plotType } from "~/types/plotType";
import { type allotmentType } from "~/types/allotmentType";

interface AddAllotmentProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
}

const AddAllotment = ({ isOpen, onClose, setIsOpen }: AddAllotmentProps) => {
  const addAllotment = async (allotment: allotmentType) => {
    console.log(allotment);
    await axios.post("/api/allotments", {
      allotmentDate: allotment.allotmentDate,
      clientId: allotment.clientId,
      plotId: allotment.plotId,
      months: allotment.months,
      installmentType: allotment.installmentType,
      advancePercentage: allotment.advancePercentage,
      advanceTotal: allotment.advanceTotal,
      allotedBy: allotment.allotedBy,
    });
  };

  const [clients, setClients] = useState<personType[]>([]);
  const [client, setClient] = useState<personType | undefined>(clients[0]);
  const [plots, setPlots] = useState<plotType[]>([]);
  const [plot, setPlot] = useState<plotType | undefined>(plots[0] ?? undefined);
  const getUsers = async (): Promise<personType[]> => {
    console.log("allot add");
    const response = await axios.get("/api/clients");
    return response.data as personType[];
  };
  const getPlots = async (): Promise<plotType[]> => {
    console.log("allot add");
    const response = await axios.get("/api/availablePlots");
    return response.data as plotType[];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getUsers();
        const plotsData = await getPlots();
        setClients(clientsData);
        setPlots(plotsData);

        // Set initial values after data fetch
        setClient(clientsData[0]);
        setPlot(plotsData[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    void fetchData();
  }, []); // Empty dependency array ensures this runs only on mount

  const defaultValue: {
    date: string;
    advancePercent: number;
    numOfMonths: number;
    installmentType: "1 Month" | "3 Months" | "6 Months" | "12 Months";
  } = {
    date: "",
    advancePercent: 10,
    numOfMonths: 60,
    installmentType: "1 Month",
  };
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

  const handleSubmit = async () => {
    // Handle form submission
    if (validateForm()) {
      console.log(formData);
      await addAllotment({
        allotmentId: 0,
        allotmentDate: new Date(formData.date),
        clientId: Number(client?.id),
        plotId: Number(plot?.plotId),
        months: formData.numOfMonths,
        installmentType: formData.installmentType,
        advancePercentage: formData.advancePercent,
        advanceTotal: Number(plot?.total) * (formData.advancePercent / 100),
        allotedBy: 0,
      });
      const plotsData = await getPlots();
      setPlots(plotsData);
      if (plotsData.length > 0) {
        setPlot(plotsData[0]);
      } else {
        setPlot(undefined);
      }
      setFormData(() => defaultValue);
      onClose();
    }
  };

  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const onAddClientClose = () => {
    setIsAddClientOpen(false);
  };

  const openAddClientBackdrop = () => {
    onClose();
    setIsAddClientOpen(true);
  };

  const errorsDefault = {
    date: "",
    accountBook: "",
    client: "",
    plot: "",
    ratePerMarla: "",
    totalPrice: "",
    advancePercent: "",
    amount: "",
    numOfMonths: "",
  };
  const [errors, setErrors] = useState(errorsDefault);
  const numberRegex = /^\d+$/;
  const decimalRegex = /^\d+(\.\d+)?$/;
  const validateForm = () => {
    let validation = true;
    console.log(formData);
    if (!formData.date) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        date: "Date is Required",
      }));
      validation = false;
    }
    if (
      !numberRegex.test(formData.advancePercent.toString()) ||
      formData.advancePercent <= 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        advancePercent: "Must be number",
      }));
      validation = false;
    }
    if (
      !numberRegex.test(formData.numOfMonths.toString()) ||
      formData.numOfMonths <= 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        numOfMonths: "Must be number",
      }));
      validation = false;
    }
    if (!plot) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        plot: "Plot Not Selected",
      }));
      validation = false;
    }
    if (!client) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        client: "Plot Not Selected",
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
      <AddClient
        isOpen={isAddClientOpen}
        onClose={onAddClientClose}
        setIsOpen={setIsAddClientOpen}
        isModalAdd={true}
        updateData={["", ""]}
      />
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[90vh] w-[30rem] flex-col gap-3 overflow-y-auto p-5">
          <CardHeader className="flex">
            <CardTitle className="mx-auto mb-2 text-3xl">
              Add New Allotment Detail
            </CardTitle>
          </CardHeader>
          <div className="flex justify-end">
            <button
              onClick={openAddClientBackdrop}
              className="text-blue-500 hover:text-blue-700 hover:underline"
              style={{ color: "rgba(75, 192, 192, 1)" }}
            >
              New Client
            </button>
          </div>
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
            <p>Client</p>
            <select
              name="client"
              value={client?.id}
              onChange={(e) => {
                handleChange(e);
                setClient(
                  clients.find(
                    (client) => client.id == parseInt(e.target.value),
                  ),
                );
              }}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              {clients.map((client) => (
                <option value={client.id} key={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {errors.client && (
              <p className="text-sm text-red-500">{errors.client}</p>
            )}
          </div>
          <div>
            <p>Plot</p>
            <select
              name="plot"
              value={plot?.plotId}
              onChange={(e) => {
                handleChange(e);
                setPlot(
                  plots.find((plot) => plot.plotId == parseInt(e.target.value)),
                );
              }}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              {plots.map((plot) => (
                <option value={plot.plotId} key={plot.plotId}>
                  {`#${plot.plotId} - ${plot.area} Marla`}
                </option>
              ))}
            </select>
            {errors.plot && (
              <p className="text-sm text-red-500">{errors.plot}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p>Length:</p>
            <p>Feet</p>
            <input
              type="number"
              value={Number(plot?.height.toString().split(".")[0])}
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
            <p>Inches</p>
            <input
              type="number"
              value={Number(plot?.height.toString().split(".")[1])}
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Width:</p>
            <p>Feet</p>
            <input
              value={Number(plot?.width.toString().split(".")[0])}
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
            <p>Inches</p>
            <input
              value={Number(plot?.height.toString().split(".")[1])}
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p>Rate per marla</p>
              <input
                value={plot?.ratePerMarla}
                name="ratePerMarla"
                onChange={handleChange}
                disabled={true}
                type="number"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.ratePerMarla && (
                <p className="text-sm text-red-500">{errors.ratePerMarla}</p>
              )}
            </div>
            <div>
              <p>Total Price</p>
              <input
                name="totalPrice"
                type="number"
                min="0"
                disabled={true}
                value={Number(plot?.total)}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.totalPrice && (
                <p className="text-sm text-red-500">{errors.totalPrice}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Advance %</p>
              <input
                name="advancePercent"
                value={formData.advancePercent}
                onChange={handleChange}
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.advancePercent && (
                <p className="text-sm text-red-500">{errors.advancePercent}</p>
              )}
            </div>
            <div>
              <p>Amount</p>
              <input
                name="amount"
                value={Number(plot?.total) * (formData.advancePercent / 100)}
                onChange={handleChange}
                type="number"
                min="0"
                disabled={true}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Number of Months</p>
              <input
                name="numOfMonths"
                value={formData.numOfMonths}
                onChange={handleChange}
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
              {errors.numOfMonths && (
                <p className="text-sm text-red-500">{errors.numOfMonths}</p>
              )}
            </div>
            <div>
              <p>Type of Installment</p>
              <select
                name="installmentType"
                value={formData.installmentType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="1 Month">Monthly</option>
                <option value="3 Months">3 Month</option>
                <option value="6 Months">6 Month</option>
                <option value="12 Months">Yearly</option>
              </select>
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
                  setFormData(defaultValue);
                  setErrors(errorsDefault);
                }}
              >
                Exit
              </button>
            </div>
          </CardFooter>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddAllotment;
