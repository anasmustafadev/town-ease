"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { MdLandscape } from "react-icons/md";
import AppTable from "~/components/Table";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useState } from "react";
import AddClient from "~/components/AddClient";
import "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { type personType } from "~/types/personType";

const Page = () => {
  const [clients, setClients] = useState<personType[]>([]);
  const getUsers = async (): Promise<personType[]> => {
    console.log("At Clients");
    const response = await axios.get("/api/clients");
    return response.data as personType[];
  };
  useEffect(() => {
    getUsers()
      .then((data) => setClients(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);
  const headers = ["No.", "Name", "CNIC", "Phone", "Address"];
  const [updateData, setUpdateData] = useState([0, "", "", "", ""]);

  const [isModalAdd, setIsModalAdd] = useState(true);

  const clientData = clients.map((client) => [
    client.id.toString(),
    client.name,
    client.cnic,
    client.phone,
    client.address,
  ]);

  const buttons = clientData.map((element) => [
    {
      label: "Update",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "DETAIL",
      data: element,
      onClick: () => {
        setIsModalAdd(false);
        openBackdrop();
      },
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    getUsers()
      .then((data) => setClients(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AddClient
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={setIsOpen}
        isModalAdd={isModalAdd}
        updateData={updateData}
      />
      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<MdLandscape className="text-4xl" />}
                title="Clients"
              />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Details</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-2 hover:bg-gray-200">
                      <IoMdMenu className="text-2xl" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-40 rounded-lg border border-gray-200 bg-white shadow-md"
                    align="end"
                  >
                    <DropdownMenuLabel className="px-4 py-2 font-bold text-gray-700">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 border-t" />

                    <DropdownMenuItem
                      onClick={() => {
                        setIsModalAdd(true);
                        openBackdrop();
                      }}
                      className="flex items-center rounded px-4 py-2 hover:opacity-90"
                    >
                      <FaPlus className="mr-2" />
                      Add Client
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center rounded px-4 py-2 hover:bg-blue-700">
                      <FaPrint className="mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <AppTable
                data={clientData}
                headers={headers}
                buttons={buttons}
                setUpdateData={setUpdateData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
