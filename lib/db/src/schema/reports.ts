import {
  boolean,
  doublePrecision,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const reportsTable = pgTable("freshroute_reports", {
  id: serial("id").primaryKey(),
  reportType: text("report_type").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  severity: text("severity").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  status: text("status").notNull().default("Pending review"),
  isDemo: boolean("is_demo").notNull().default(false),
});

export type ReportRecord = typeof reportsTable.$inferSelect;
export type NewReportRecord = typeof reportsTable.$inferInsert;