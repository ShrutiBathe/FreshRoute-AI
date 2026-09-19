import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const observationsTable = pgTable("freshroute_observations", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  status: text("status").notNull(),
  severity: text("severity").notNull(),
  source: text("source").notNull(),
  initialConfidence: doublePrecision("initial_confidence").notNull(),
  currentConfidence: doublePrecision("current_confidence").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastVerifiedAt: timestamp("last_verified_at", { withTimezone: true }).notNull().defaultNow(),
  verificationCount: integer("verification_count").notNull().default(1),
  description: text("description").notNull(),
  accessibilityImpact: text("accessibility_impact").notNull(),
  isDemo: boolean("is_demo").notNull().default(true),
});

export type ObservationRecord = typeof observationsTable.$inferSelect;
export type NewObservationRecord = typeof observationsTable.$inferInsert;