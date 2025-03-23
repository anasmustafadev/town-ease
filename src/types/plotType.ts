export interface plotType {
  plotId: number;
  type: "Commercial" | "Residential";
  area: number;
  width: number;
  height: number;
  ratePerMarla: number;
  price: number | null;
  feature: "Park Facing" | "Main Facing";
  total: number | null;
}
