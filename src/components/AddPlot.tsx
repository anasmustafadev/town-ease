import React, { useState, useEffect } from "react";
import Backdrop from "./Backdrop";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ChangeEvent } from "react";
import { type plotType } from "~/types/plotType";
import axios from "axios";
interface AddPlotProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
  isModalAdd: boolean;
  updateData: (string | number)[];
}
const AddPlot = ({
  isOpen,
  onClose,
  setIsOpen,
  isModalAdd,
  updateData,
}: AddPlotProps) => {
  const addPlot = async (plot: plotType) => {
    await axios.post("/api/plots", {
      type: plot.type,
      area: plot.area,
      width: plot.width,
      height: plot.height,
      ratePerMarla: plot.ratePerMarla,
      price: plot.price,
      feature: plot.feature,
      total: plot.total,
    });
  };

  const updatePlot = async (plot: plotType) => {
    await axios.put("/api/plots", {
      plotId: plot.plotId,
      type: plot.type,
      area: plot.area,
      width: plot.width,
      height: plot.height,
      ratePerMarla: plot.ratePerMarla,
      price: plot.price,
      feature: plot.feature,
      total: plot.total,
    });
  };
  const defaultValue: {
    number: number;
    type: "Commercial" | "Residential";
    area: number;
    feet1: number;
    inch1: number;
    feet2: number;
    inch2: number;
    rate: number;
    price: number;
    feature: "Park Facing" | "Main Facing";
    total: number;
  } = {
    number: 0,
    type: "Residential",
    area: 0,
    feet1: 0,
    inch1: 0,
    feet2: 0,
    inch2: 0,
    rate: 0,
    price: 0,
    feature: "Main Facing",
    total: 0,
  };

  const errorDefault = {
    number: "",
    type: "",
    area: "",
    feet1: "",
    inch1: "",
    feet2: "",
    inch2: "",
    rate: "",
    price: "",
    feature: "",
    total: "",
  };

  const [form, setForm] = useState(defaultValue);

  const [errors, setErrors] = useState(errorDefault);

  const numberRegex = /^\d+$/;
  const decimalRegex = /^\d+(\.\d+)?$/;

  const validateForm = () => {
    let validation = true;
    if (!numberRegex.test(form.number.toString()) || form.number <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        number: "Must be number and greater than 0",
      }));
      validation = false;
    }
    if (!form.type) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        type: "Plot type is required",
      }));
      validation = false;
    }
    if (!decimalRegex.test(form.area.toString()) || form.area <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        area: "Area must be a number and greater than 0",
      }));
      validation = false;
    }
    if (form.feet1 <= 0 || !numberRegex.test(form.feet1.toString())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        feet1: "Must be a number and greater than 0",
      }));
      validation = false;
    }
    if (form.feet2 <= 0 || !numberRegex.test(form.feet2.toString())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        feet2: "Must be a number and greater than 0",
      }));
      validation = false;
    }
    if (form.inch1 <= 0 || !numberRegex.test(form.inch1.toString())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        inch1: "Must be a number and greater than 0",
      }));
      validation = false;
    }
    if (form.inch2 <= 0 || !numberRegex.test(form.inch2.toString())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        inch2: "Must be a number and greater than 0",
      }));
      validation = false;
    }
    if (!decimalRegex.test(form.rate.toString()) || form.rate <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        rate: "Must be a integer or decimal and greater than 0",
      }));
      validation = false;
    }
    if (!decimalRegex.test(form.price.toString()) || form.price <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Must be a integer or decimal and greater than 0",
      }));
      validation = false;
    }
    if (!decimalRegex.test(form.total.toString()) || form.total <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        total: "Must be a integer or decimal and greater than 0",
      }));
      validation = false;
    }
    if (validation) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isModalAdd == false) {
      const dimension = updateData[3]?.toString().split("x");
      const updatedForm: {
        number: number;
        type: "Commercial" | "Residential";
        area: number;
        feet1: number;
        inch1: number;
        feet2: number;
        inch2: number;
        rate: number;
        price: number;
        feature: "Park Facing" | "Main Facing";
        total: number;
      } = {
        number: Number(updateData[0]),
        type:
          updateData[1]?.toString() === "Commercial"
            ? "Commercial"
            : "Residential",
        area: Number(updateData[2]?.toString().split(" ")[0]),
        feet1: Number(dimension ? dimension[0]?.split(".")[0] : "0"),
        inch1: Number(dimension ? dimension[0]?.split(".")[1] : "0"),
        feet2: Number(dimension ? dimension[1]?.split(".")[0] : "0"),
        inch2: Number(dimension ? dimension[1]?.split(".")[1] : "0"),
        rate: Number(updateData[4]),
        price: Number(updateData[5]),
        feature: "Main Facing",
        total: Number(updateData[6]),
      };

      setForm(updatedForm);
    }
  }, [updateData]);

  useEffect(() => {
    setForm((prev) => {
      if (prev.rate != undefined && prev.area != undefined) {
        return {
          ...prev,
          price: prev.rate * prev.area,
        };
      }
      return prev;
    });
  }, [form.rate, form.area]);

  useEffect(() => {
    setForm((prev) => {
      console.log(prev.feature);
      return {
        ...prev,
        total:
          prev.feature === "Main Facing"
            ? prev.price + prev.price * 0.1
            : prev.feature === "Park Facing"
              ? prev.price + prev.price * 0.05
              : prev.price,
      };
    });
  }, [form.price, form.feature]);

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        rate: prev.type == "Commercial" ? 120000 : prev.rate,
      };
    });
  }, [form.type]);

  function setFormValue(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    // Clear validation errors on input change
    setErrors({ ...errors, [e.target.name]: "" });
  }
  const handleSubmit = async () => {
    const validation = validateForm();
    if (validation) {
      if (isModalAdd == true) {
        await addPlot({
          plotId: 0,
          type: form.type,
          area: form.area,
          width: parseFloat(`${form.feet1}.${form.inch1}`),
          height: parseFloat(`${form.feet2}.${form.inch2}`),
          ratePerMarla: form.rate,
          price: form.price,
          feature: form.feature,
          total: form.total,
        });
        console.log("Add");
      } else {
        await updatePlot({
          plotId: Number(updateData[0]),
          type: form.type,
          area: form.area,
          width: parseFloat(`${form.feet1}.${form.inch1}`),
          height: parseFloat(`${form.feet2}.${form.inch2}`),
          ratePerMarla: form.rate,
          price: form.price,
          feature: form.feature,
          total: form.total,
        });
        console.log("Update");
      }
      onClose();
      setForm(() => defaultValue);
    }
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[75vh] w-full flex-col overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Plot Menu</CardTitle>
          </CardHeader>
          <CardContent className="flex w-auto flex-col flex-wrap p-5">
            <div className="flex items-center justify-evenly gap-2">
              <div>
                <p>Plot #</p>
                <input
                  placeholder="231"
                  name="number"
                  type="text"
                  value={form.number}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.number && (
                  <p className="text-sm text-red-500">{errors.number}</p>
                )}
              </div>
              <div>
                <p>Plot Type</p>
                <select
                  name="type"
                  value={form.type}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={undefined}>Select Type</option>
                  <option value={"Residential"}>Residential</option>
                  <option value={"Commercial"}>Commercial</option>
                </select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>
              <div>
                <p>Area(Marla)</p>
                <input
                  placeholder="20"
                  type="text"
                  name="area"
                  value={form.area}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.area && (
                  <p className="text-sm text-red-500">{errors.area}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-around gap-10">
              <div>
                <h3>Width</h3>
              </div>
              <div>
                <h3>X</h3>
              </div>
              <div>
                <h3>Height</h3>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-around gap-10">
              <div>
                <p>Feet</p>
                <input
                  placeholder="30"
                  type="text"
                  name="feet1"
                  value={form.feet1}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.feet1 && (
                  <p className="text-sm text-red-500">{errors.feet1}</p>
                )}
              </div>
              <div>
                <p>Inches</p>
                <input
                  placeholder="6"
                  type="text"
                  name="inch1"
                  value={form.inch1}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.inch1 && (
                  <p className="text-sm text-red-500">{errors.inch1}</p>
                )}
              </div>
              <div>
                <p>Feet</p>
                <input
                  placeholder="50"
                  type="text"
                  name="feet2"
                  value={form.feet2}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.feet2 && (
                  <p className="text-sm text-red-500">{errors.feet2}</p>
                )}
              </div>
              <div>
                <p>Inches</p>
                <input
                  placeholder="2"
                  type="text"
                  name="inch2"
                  value={form.inch2}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.inch2 && (
                  <p className="text-sm text-red-500">{errors.inch2}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Rate Per Marla</p>
                <input
                  placeholder="0"
                  type="text"
                  disabled={form.type == "Commercial" ? true : false}
                  name="rate"
                  value={form.rate}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.rate && (
                  <p className="text-sm text-red-500">{errors.rate}</p>
                )}
              </div>
              <div>
                <p>Price</p>
                <input
                  placeholder="0"
                  type="text"
                  disabled
                  name="price"
                  value={form.price}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Feature</p>
                <select
                  name="feature"
                  value={form.feature}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={undefined}>Select the Feature Type</option>
                  <option value={"Park Facing"}>Park Facing</option>
                  <option value={"Main Facing"}>Main Facing</option>
                </select>
              </div>
              <div className="">
                <p>Total Price</p>
                <input
                  type="text"
                  disabled
                  name="total"
                  value={form.total}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
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
                  setForm(() => defaultValue);
                  setErrors(errorDefault);
                }}
              >
                Exit
              </button>
            </div>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddPlot;
