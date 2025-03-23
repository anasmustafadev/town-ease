import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  varchar,
  integer,
  real,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// Create table with project-specific prefix
export const createTable = pgTableCreator((name) => `eden_home_${name}`);

export const clientType = pgEnum("clientType", [
  "Purchaser",
  "Investor",
  "Employee",
  "Bank",
]);

export const plotType = pgEnum("plotType", ["Commercial", "Residential"]);
export const plotFeature = pgEnum("plotFeature", [
  "Park Facing",
  "Main Facing",
]);
export const installmentType = pgEnum("installmentType", [
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
]);

/////////////////////////
// Person Table
/////////////////////////

export const person = createTable(
  "person",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    cnic: varchar("cnic", { length: 15 }).notNull(), // Assuming Pakistani CNIC format
    phone: varchar("phone", { length: 15 }).notNull(),
    address: varchar("address", { length: 512 }).notNull(),
  },
  (person) => ({
    cnicIndex: index("cnic_idx").on(person.cnic),
  }),
);

/////////////////////////
// Client Table
/////////////////////////

export const client = createTable("client", {
  clientId: serial("client_id").primaryKey(),
  personId: integer("person_id").references(() => person.id),
  clientType: clientType("clientType").default("Purchaser"),
});

/////////////////////////
// Plot Table
/////////////////////////

export const plot = createTable("plot", {
  plotId: serial("plot_id").primaryKey(),
  type: plotType("plotType").default("Residential"),
  area: integer("area").notNull(), // In Marla
  width: real("width").notNull(), // Width in feet.inches
  height: real("height").notNull(), // Height in feet.inches
  ratePerMarla: integer("rate_per_marla").notNull(),
  price: integer("price").default(0), // Derived attribute (can be calculated in app logic)
  feature: plotFeature("plotFeature").default("Main Facing"),
  total: integer("total").default(0), // Derived total price
});

/////////////////////////
// Allotment Table
/////////////////////////

export const allotment = createTable("allotment", {
  allotmentId: serial("allotment_id").primaryKey(),
  allotmentDate: timestamp("allotment_date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  clientId: integer("client_id").references(() => client.clientId),
  plotId: integer("plot_id").references(() => plot.plotId),
  months: integer("months").notNull(), // Total months for installment
  installmentType: installmentType("installmentType").default("6 Months"),
  advancePercentage: integer("advance_percentage").notNull(),
  advanceTotal: integer("advance_total").default(0), // Derived attribute
  allotedBy: integer("alloted_by").notNull(), // Allotted by User ID
});
