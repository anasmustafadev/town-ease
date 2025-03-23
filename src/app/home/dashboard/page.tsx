"use client";

import React from "react";
import PageHeader from "~/components/PageHeader";
import { MdDashboard } from "react-icons/md";
import BarChart from "~/components/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

function Page() {
  const data = [
    { name: "SALE", amount: "100,000/- Rs." },
    { name: "SALE RETURN", amount: "100,000/- Rs." },
    { name: "ACTUAL SALE", amount: "100,000/- Rs." },
    { name: "EXPENSE", amount: "100,000/- Rs." },
    { name: "PENDING", amount: "100,000/- Rs." },
    { name: "LOSE", amount: "100,000/- Rs." },
  ];

  const plotsData = [
    { name: "Total Plots", sub: "Number of Plots", amount: "10" },
    { name: "Total Homes", sub: "Number of Homes", amount: "6" },
    { name: "Total Shops", sub: "Number of shops", amount: "4" },
    { name: "Overall", sub: "Number of shops and plots", amount: "10" },
  ];

  // const monthData = [
  //   { name: "Sale", amount: "0/- Rs." },
  //   { name: "Sale Return", amount: "0/- Rs." },
  //   { name: "Actual Sale", amount: "0/- Rs." },
  //   { name: "Expense", amount: "0/- Rs." },
  //   { name: "Collection", amount: "0/- Rs." },
  //   { name: "Lose", amount: "0/- Rs." },
  // ];

  const yearData = [
    { name: "January", amount: 23420000 },
    { name: "February", amount: 12200000 },
    { name: "March", amount: 3410300 },
    { name: "April", amount: 34890000 },
    { name: "May", amount: 25509000 },
    { name: "June", amount: 27000500 },
    { name: "July", amount: 14420000 },
    { name: "August", amount: 17350000 },
    { name: "September", amount: 19210000 },
    { name: "October", amount: 23890000 },
    { name: "November", amount: 8221000 },
    { name: "December", amount: 20580000 },
  ];

  return (
    <div className="flex w-full flex-col gap-5">
      <Card>
        <CardHeader>
          <PageHeader
            icon={<MdDashboard className="text-4xl" />}
            title="Dashboard"
          />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Town Account Management System</CardTitle>
        </CardHeader>
        <CardContent className="mt-5 flex flex-wrap justify-between gap-5">
          {data.map((element, index) => {
            return (
              <Card className="w-48 p-2 shadow-sm shadow-slate-300" key={index}>
                <CardHeader>
                  <CardTitle className="font-bold">{element.name}</CardTitle>
                  <CardDescription>
                    <p>{element.amount}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-between">
        <Card className="w-[100%] md:w-[49%]">
          <CardHeader>
            <CardTitle>Plots</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-wrap gap-10">
            {plotsData.map((element, index) => {
              return (
                <div className="w-full" key={index}>
                  <div className="flex w-full justify-between">
                    <Card className="w-full">
                      <CardHeader className="w-full">
                        <div className="flex w-full justify-between">
                          <h1 className="font-bold">{element.name}</h1>
                          <span>{element.amount}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card className="hidden md:block md:w-[49%]">
          <div>
            <h1 className="my-10 text-center text-4xl font-bold">
              Yearly Data Overview
            </h1>
            <BarChart yearData={yearData} />
          </div>
        </Card>
        <Card className="block w-[100%] sm:hidden">
          <CardHeader>
            <CardTitle>Earning</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col flex-wrap gap-10">
            {yearData.map((element, index) => {
              return (
                <div className="w-full" key={index}>
                  <div className="flex w-full justify-between">
                    <Card className="w-full">
                      <CardHeader className="w-full">
                        <div className="flex w-full justify-between">
                          <h1 className="font-bold">{element.name}</h1>
                          <span>{element.amount}</span>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
