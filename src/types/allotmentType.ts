export type allotmentType = {
  allotmentId: number | null;
  allotmentDate: Date;
  clientId: number;
  plotId: number;
  months: number;
  installmentType: "1 Month" | "3 Months" | "6 Months" | "12 Months";
  advancePercentage: number;
  advanceTotal: number | null;
  allotedBy: number;
};

export type AllotmentRecord = {
  ID: number; // Allotment ID
  Date: string; // Allotment Date (ISO 8601 format)
  Plot: number; // Plot ID
  ClientName: string; // Name of the client
  Area: number; // Area in Marla
  SaleRate: number; // Sale rate per Marla
  Price: number; // Total price of the plot
  Advance: number; // Advance payment amount
  Installment: string; // Installment type (e.g., "6 Months")
  NoOfInstallments: number; // Total number of installments
};
