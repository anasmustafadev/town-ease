"use client";

import React, { useEffect, type ChangeEvent } from "react";
import { IoIosPerson } from "react-icons/io";
import { Card, CardHeader } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { FaSave, FaPlus } from "react-icons/fa";
import AppTable from "~/components/Table";
import { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { type profileType } from "~/types/profileType";
import axios from "axios";

const Page = () => {
  const addProfile = async (profile: profileType) => {
    await axios.post("/api/profiles", {
      name: profile.name,
      phone: profile.phone,
      username: profile.username,
      password: profile.password,
      address: profile.address,
    });
  };
  const getUsers = async (): Promise<profileType[]> => {
    console.log("At Clients");
    const response = await axios.get("/api/profiles");
    return response.data as profileType[];
  };

  useEffect(() => {
    getUsers()
      .then((data) => setUserData(transformProfileData(data)))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);

  const [userData, setUserData] = useState<string[][]>([]);

  const transformProfileData = (apiData: profileType[]) => {
    // Add headers to the first row
    const formattedData = [
      ...apiData.map((profile) => [
        profile.id.toString(),
        profile.name,
        profile.username,
        profile.address,
        profile.phone,
        profile.password,
      ]),
    ];

    return formattedData;
  };

  const headers = [
    "ID",
    "Name",
    "Username",
    "Address",
    "Phone Number",
    "Password",
  ];

  const buttons = userData.map((i, k) => [
    {
      label: "Update",
      className: "bg-blue-500 text-white px-3 py-2 rounded mr-1",
      actionType: "UPDATE",
      data: ["", ""],
      onClick: () => {
        openBackdrop(k);
      },
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [heading, setHeading] = useState("");

  const defaultValue = {
    name: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const [profileData, setProfileData] = useState(defaultValue);
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
          "Please enter a valid phone number in international format (e.g., +1234567890).",
      }));
      return false;
    }
    return true;
  };
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-z0-9_\.]{6,}$/;
    if (!usernameRegex.test(username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username:
          "Username must be at least 6 characters long and contain only lowercase letters, numbers, underscores, and periods.",
      }));
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.",
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
  const handleChangeProfile = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    // Clear validation errors on input change
    setErrors({ ...errors, [name]: "" });
  };
  // Function to close modal
  const onClose = () => {
    setFormData(() => defaultValue);
    setIsOpen(false);
  };

  // Function to open modal and load user data for editing
  const openBackdrop = (idx: number) => {
    setIndex(idx);
    if (userData[idx] != undefined) {
      setFormData({
        name: userData[idx][1] ?? "",
        phone: userData[idx][2] ?? "",
        address: userData[idx][3] ?? "",
        username: userData[idx][4] ?? "",
        password: userData[idx][5] ?? "",
      });
    }
    setIsOpen(true);
  };

  // Handle form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name == "Hello") handleSubmit(); // Only for linting purpose. To be removed later.
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation errors on input change
    setErrors({ ...errors, [name]: "" });
  };

  // Handle form submission
  const handleSubmit = () => {
    const isValidName = validateName(formData.name);
    const isValidPhone = validatePhoneNumber(formData.phone);
    const isValidAddress = validateAddress(formData.address);
    const isValidUsername = validateUsername(formData.username);
    const isValidPassword = validatePassword(formData.password);

    if (
      isValidName &&
      isValidPhone &&
      isValidAddress &&
      isValidUsername &&
      isValidPassword
    ) {
      const updatedData = [...userData];
      if (userData[index] != undefined) {
        updatedData[index] = [
          userData[index][0] ?? "",
          formData.name,
          formData.phone,
          formData.address,
          formData.username,
          formData.password,
        ];
      }
      setUserData(updatedData);
      setHeading("");
      onClose();
    }
  };

  const handleSubmitProfile = () => {
    const isValidName = validateName(formData.name);
    const isValidPhone = validatePhoneNumber(formData.phone);
    const isValidAddress = validateAddress(formData.address);
    const isValidUsername = validateUsername(formData.username);
    const isValidPassword = validatePassword(formData.password);
    if (
      isValidName &&
      isValidPhone &&
      isValidAddress &&
      isValidUsername &&
      isValidPassword
    ) {
      alert("Saved");
    }
  };
  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="h-[90vh] w-[30rem] overflow-y-auto p-5">
            <h1 className="p-2 text-3xl text-gray-800">
              {heading == "" ? "Update User Details" : heading}
            </h1>
            <div className="flex flex-col gap-4">
              <div>
                <p>Name:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div>
                <p>Contact:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="+923058111211"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <p>Address</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
              <div>
                <p>Username:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </div>
              <div>
                <p>Password:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
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
                  console.log("hello");
                  setIsOpen(false);
                  setHeading("");
                  setErrors(defaultValue);
                  setFormData((prev) => {
                    return { ...prev, defaultValue };
                  });
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>

      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<IoIosPerson className="text-4xl" />}
                title="Profile"
              />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Full Name"
                  />
                  <input
                    type="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChangeProfile}
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Address"
                />
              </div>
              <button
                onClick={async () => {
                  console.log("clicked");
                  await addProfile({
                    id: 0,
                    name: profileData.name,
                    address: profileData.address,
                    password: profileData.password,
                    phone: profileData.phone,
                    username: profileData.username,
                  });
                  getUsers()
                    .then((data) => setUserData(transformProfileData(data)))
                    .catch((error) => {
                      console.error("Failed to fetch clients:", error);
                    });
                  setProfileData(defaultValue);
                }}
                className="mt-5 flex w-28 items-center rounded bg-green-500 px-4 py-2 text-white hover:opacity-90"
              >
                <FaSave className="mr-2" />
                Save
              </button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <h1 className="text-2xl">Users</h1>
              <AppTable
                data={userData}
                headers={headers}
                buttons={buttons}
                setUpdateData={() => console.log("To bo Implemented")}
              />
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
