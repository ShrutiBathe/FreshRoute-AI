import { Router, type IRouter } from "express";
import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db, observationsTable, reportsTable } from "@workspace/db";
import {
  AnalyzeVisionBody,
  AnalyzeVisionResponse,
  CalculateRoutesBody,
  CalculateRoutesResponse,
  CreateObservationBody,
  CreateObservationResponse,
  CreateReportBody,
  CreateReportResponse,
  GetDashboardStatsResponse,
  GetAnalyticsResponse,
  GetMapDataResponse,
  GetObservationParams,
  GetObservationResponse,
  ListObservationsResponse,
  ListReportsResponse,
  RunDemoScenarioResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const DECAY_RATE_PER_HOUR = 0.011;
const DEMO_CENTER: [number, number] = [18.5204, 73.8567];

const seededObservations = [
  {
    type: "Accessible ramp",
    latitude: 18.5212,
    longitude: 73.8559,
    status: "Verified accessible",
    severity: "Low",
    source: "Camera observation",
    initialConfidence: 0.96,
    description: "Gentle-slope curb ramp with clear landing area.",
    accessibilityImpact: "Positive",
  },
  {
    type: "Construction barrier",
    latitude: 18.5197,
    longitude: 73.8575,
    status: "Temporarily blocked",
    severity: "High",
    source: "Camera observation",
    initialConfidence: 0.9,
    description: "Barrier crosses the south sidewalk beside the demo plaza.",
    accessibilityImpact: "High",
  },
  {
    type: "Accessible elevator",
    latitude: 18.5209,
    longitude: 73.8578,
    status: "Verified accessible",
    severity: "Low",
    source: "Facilities verification",
    initialConfidence: 0.93,
    description: "Elevator entrance is step-free and available during demo hours.",
    accessibilityImpact: "Positive",
  },
  {
    type: "Stairs",
    latitude: 18.522,
    longitude: 73.8567,
    status: "Verified accessible",
    severity: "Medium",
    source: "Camera observation",
    initialConfidence: 0.88,
    description: "Stair-only connection; wheelchair users should use the east ramp.",
    accessibilityImpact: "High",
  },
  {
    type: "Blocked sidewalk",
    latitude: 18.5199,
    longitude: 73.8557,
    status: "Needs verification",
    severity: "Medium",
    source: "Community report",
    initialConfidence: 0.72,
    description: "Parked vehicle may be narrowing the accessible sidewalk.",
    accessibilityImpact: "Medium",
  },
  {
    type: "Flooded path",
    latitude: 18.5215,
    longitude: 73.8588,
    status: "Needs verification",
    severity: "High",
    source: "Simulated dashcam",
    initialConfidence: 0.67,
    description: "Standing water reported after rainfall; condition is time-sensitive.",
    accessibilityImpact: "High",
  },
  {
    type: "Accessible entrance",
    latitude: 18.5189,
    longitude: 73.8569,
    status: "Verified accessible",
    severity: "Low",
    source: "Facilities verification",
    initialConfidence: 0.95,
    description: "Entrance has a clear threshold and tactile wayfinding.",
    accessibilityImpact: "Positive",
  },
  {
    type: "Pothole",
    latitude: 18.5201,
    longitude: 73.8548,
    status: "Needs verification",
    severity: "Medium",
    source: "Community report",
    initialConfidence: 0.63,
    description: "Surface defect may affect small wheels and mobility devices.",
    accessibilityImpact: "Medium",
  },
  {
    type: "Clear sidewalk",
    latitude: 18.5227,
    longitude: 73.8555,
    status: "Verified accessible",
    severity: "Low",
    source: "Camera observation",
    initialConfidence: 0.91,
    description: "Wide, unobstructed sidewalk with a consistent surface.",
    accessibilityImpact: "Positive",
  },
] as const;

const pathCoordinates: Record<string, [number, number][]> = {
  north: [
    [18.5204, 73.8567],
    [18.5211, 73.8569],
    [18.522, 73.8567],
    [18.5227, 73.8555],
  ],
  south: [
    [18.5204, 73.8567],
    [18.5197, 73.8575],
    [18.5189, 73.8569],
    [18.5184, 73.8558],
  ],
  east: [
    [18.5204, 73.8567],
    [18.5209, 73.8578],
    [18.5215, 73.8588],
  ],
};

function hoursSince(date: Date): number {
  return Math.max(0, (Date.now() - date.getTime()) / 3_600_000);
}

function confidenceFor(record: {
  initialConfidence: number;
  currentConfidence: number;
  lastVerifiedAt: Date;
}): number {
  const elapsed = hoursSince(record.lastVerifiedAt);
  const decayed = record.initialConfidence * Math.exp(-DECAY_RATE_PER_HOUR * elapsed);
  return Math.min(record.currentConfidence, decayed);
}

function freshnessFor(date: Date): string {
  const minutes = Math.round(hoursSince(date) * 60);
  if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function toObservation(record: typeof observationsTable.$inferSelect) {
  const currentConfidence = Number(confidenceFor(record).toFixed(2));
  return {
    id: record.id,
    type: record.type,
    latitude: record.latitude,
    longitude: record.longitude,
    status: currentConfidence < 0.6 ? "Needs verification" : record.status,
    severity: record.severity,
    source: record.source,
    initial_confidence: record.initialConfidence,
    current_confidence: currentConfidence,
    created_at: record.createdAt.toISOString(),
    last_verified_at: record.lastVerifiedAt.toISOString(),
    verification_count: record.verificationCount,
    description: record.description,
    accessibility_impact: record.accessibilityImpact,
    freshness_label: freshnessFor(record.lastVerifiedAt),
    is_demo: record.isDemo,
  };
}

async function ensureSeeded(): Promise<void> {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(observationsTable);
  if (Number(count) > 0) return;

  const now = new Date();
  await db.insert(observationsTable).values(
    seededObservations.map((observation, index) => {
      const verifiedAt = new Date(now.getTime() - [18, 72, 36, 8, 5, 27, 12, 96, 3][index] * 3_600_000);
      return {
        ...observation,
        createdAt: new Date(verifiedAt.getTime() - 20 * 60_000),
        lastVerifiedAt: verifiedAt,
        currentConfidence: observation.initialConfidence,
        verificationCount: index === 1 ? 1 : index % 3 + 1,
        isDemo: true,
      };
    }),
  );
}

function isConstructionBlocked(observations: ReturnType<typeof toObservation>[]): boolean {
  return observations.some(
    (observation) =>
      observation.type === "Construction barrier" &&
      (observation.status === "Temporarily blocked" || observation.status === "Temporary block"),
  );
}

function buildPaths(blocked: boolean) {
  return [
    {
      id: "north-route",
      status: "accessible",
      confidence: 0.94,
      coordinates: pathCoordinates.north,
    },
    {
      id: "south-route",
      status: blocked ? "uncertain" : "accessible",
      confidence: blocked ? 0.62 : 0.86,
      coordinates: pathCoordinates.south,
    },
    {
      id: "east-route",
      status: "blocked",
      confidence: 0.41,
      coordinates: pathCoordinates.east,
    },
  ];
}

function buildRoutes(blocked: boolean, preference: string) {
  const routeA = {
    id: "south-route",
    name: "Route A · Direct path",
    distance_km: 1.2,
    duration_minutes: 14,
    accessibility_score: blocked ? 0.58 : 0.84,
    confidence: blocked ? 0.62 : 0.86,
    status: blocked ? "Uncertain" : "Accessible",
    reason: blocked
      ? "A recently reported construction barrier reduces confidence on the direct sidewalk."
      : "Shortest path with a recently verified accessible segment.",
    coordinates: pathCoordinates.south,
  };
  const routeB = {
    id: "north-route",
    name: "Route B · Verified loop",
    distance_km: 1.5,
    duration_minutes: 18,
    accessibility_score: 0.94,
    confidence: 0.91,
    status: "Verified accessible",
    reason: "Slightly longer, but supported by fresh ramp and clear-sidewalk observations.",
    coordinates: pathCoordinates.north,
  };
  const preferDirect = preference === "Fastest" && !blocked;
  const recommended = preferDirect ? routeA : routeB;
  const alternative = preferDirect ? routeB : routeA;
  return {
    recommended_route_id: recommended.id,
    alternatives: [recommended, alternative],
    explanation: preferDirect
      ? "The direct route currently balances time and accessibility confidence."
      : "The recommended route is slightly longer but has higher accessibility confidence and fewer uncertain segments.",
  };
}

function sendValidationError(res: Parameters<IRouter["get"]>[1] extends never ? never : any, message: string): void {
  res.status(400).json({ error: message });
}

router.get("/observations", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const rows = await db.select().from(observationsTable).orderBy(desc(observationsTable.lastVerifiedAt));
  res.json(ListObservationsResponse.parse(rows.map(toObservation)));
});

router.post("/observations", async (req, res): Promise<void> => {
  const parsed = CreateObservationBody.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error.message);
    return;
  }
  const now = new Date();
  const [created] = await db.insert(observationsTable).values({
    type: parsed.data.type,
    latitude: parsed.data.latitude,
    longitude: parsed.data.longitude,
    status: parsed.data.status,
    severity: parsed.data.severity,
    source: parsed.data.source,
    initialConfidence: parsed.data.initial_confidence,
    currentConfidence: parsed.data.initial_confidence,
    createdAt: now,
    lastVerifiedAt: now,
    verificationCount: 1,
    description: parsed.data.description,
    accessibilityImpact: parsed.data.accessibility_impact,
    isDemo: false,
  }).returning();
  res.status(201).json(CreateObservationResponse.parse(toObservation(created)));
});

router.get("/observations/:id", async (req, res): Promise<void> => {
  const params = GetObservationParams.safeParse(req.params);
  if (!params.success) {
    sendValidationError(res, params.error.message);
    return;
  }
  const [record] = await db.select().from(observationsTable).where(eq(observationsTable.id, params.data.id));
  if (!record) {
    res.status(404).json({ error: "Observation not found" });
    return;
  }
  res.json(GetObservationResponse.parse(toObservation(record)));
});

router.get("/map", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const rows = await db.select().from(observationsTable);
  const observations = rows.map(toObservation);
  res.json(GetMapDataResponse.parse({
    center: DEMO_CENTER,
    zoom: 16,
    observations,
    paths: buildPaths(isConstructionBlocked(observations)),
  }));
});

router.get("/reports", async (_req, res): Promise<void> => {
  const rows = await db.select().from(reportsTable).orderBy(desc(reportsTable.createdAt));
  res.json(ListReportsResponse.parse(rows.map((report) => ({
    id: report.id,
    report_type: report.reportType,
    latitude: report.latitude,
    longitude: report.longitude,
    severity: report.severity,
    description: report.description,
    created_at: report.createdAt.toISOString(),
    status: report.status,
    is_demo: report.isDemo,
  }))));
});

router.post("/reports", async (req, res): Promise<void> => {
  const parsed = CreateReportBody.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error.message);
    return;
  }
  const now = new Date();
  const [report] = await db.insert(reportsTable).values({
    reportType: parsed.data.report_type,
    latitude: parsed.data.latitude,
    longitude: parsed.data.longitude,
    severity: parsed.data.severity,
    description: parsed.data.description,
    createdAt: now,
    status: "Pending review",
    isDemo: false,
  }).returning();
  const positive = parsed.data.report_type === "Accessible entrance";
  await db.insert(observationsTable).values({
    type: parsed.data.report_type,
    latitude: parsed.data.latitude,
    longitude: parsed.data.longitude,
    status: positive ? "Reported accessible" : "Needs verification",
    severity: parsed.data.severity,
    source: "Crowdsourced report",
    initialConfidence: 0.73,
    currentConfidence: 0.73,
    createdAt: now,
    lastVerifiedAt: now,
    verificationCount: 1,
    description: parsed.data.description,
    accessibilityImpact: positive ? "Positive" : parsed.data.severity === "High" ? "High" : "Medium",
    isDemo: false,
  });
  res.status(201).json(CreateReportResponse.parse({
    id: report.id,
    report_type: report.reportType,
    latitude: report.latitude,
    longitude: report.longitude,
    severity: report.severity,
    description: report.description,
    created_at: report.createdAt.toISOString(),
    status: report.status,
    is_demo: report.isDemo,
  }));
});

router.get("/dashboard/stats", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const rows = (await db.select().from(observationsTable)).map(toObservation);
  const paths = buildPaths(isConstructionBlocked(rows));
  const activeObstacles = rows.filter((row) => ["High", "Medium"].includes(row.severity) && row.accessibility_impact !== "Positive").length;
  const averageConfidence = rows.reduce((sum, row) => sum + row.current_confidence, 0) / Math.max(rows.length, 1);
  res.json(GetDashboardStatsResponse.parse({
    accessibility_observations: rows.length,
    active_obstacles: activeObstacles,
    verified_accessible_paths: paths.filter((path) => path.status === "accessible").length,
    average_confidence: Number(averageConfidence.toFixed(2)),
    recently_changed_locations: rows.filter((row) => row.freshness_label.includes("min") || row.freshness_label.includes("h")).length,
    last_updated: new Date().toISOString(),
  }));
});

router.get("/analytics", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const rows = (await db.select().from(observationsTable)).map(toObservation);
  const reports = await db.select().from(reportsTable);
  const categories = new Map<string, number>();
  rows.forEach((row) => categories.set(row.type, (categories.get(row.type) ?? 0) + 1));
  const statuses = new Map<string, number>();
  rows.forEach((row) => statuses.set(row.status, (statuses.get(row.status) ?? 0) + 1));
  const point = (label: string, value: number) => ({ label, value });
  res.json(GetAnalyticsResponse.parse({
    observations_over_time: [point("Mon", 31), point("Tue", 38), point("Wed", 42), point("Thu", 45), point("Fri", rows.length), point("Sat", rows.length + 8)],
    obstacles_over_time: [point("Mon", 7), point("Tue", 9), point("Wed", 6), point("Thu", 11), point("Fri", 8), point("Sat", rows.filter((row) => row.accessibility_impact !== "Positive").length)],
    confidence_over_time: [point("Mon", 0.78), point("Tue", 0.81), point("Wed", 0.84), point("Thu", 0.82), point("Fri", 0.87), point("Sat", rows.reduce((sum, row) => sum + row.current_confidence, 0) / Math.max(rows.length, 1))],
    reports_by_category: reports.length > 0
      ? reports.map((report) => point(report.reportType, 1))
      : Array.from(categories.entries()).slice(0, 6).map(([label, value]) => point(label, value)),
    status_distribution: Array.from(statuses.entries()).map(([label, value]) => point(label, value)),
  }));
});

router.post("/route", async (req, res): Promise<void> => {
  const parsed = CalculateRoutesBody.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error.message);
    return;
  }
  await ensureSeeded();
  const rows = (await db.select().from(observationsTable)).map(toObservation);
  res.json(CalculateRoutesResponse.parse(buildRoutes(isConstructionBlocked(rows), parsed.data.preference)));
});

router.post("/demo/run", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const [blocker] = await db.select().from(observationsTable).where(eq(observationsTable.type, "Construction barrier")).orderBy(asc(observationsTable.id));
  if (!blocker) {
    res.status(404).json({ error: "Demo observation not found" });
    return;
  }
  const now = new Date();
  const [updated] = await db.update(observationsTable).set({
    status: "Temporary block",
    currentConfidence: 0.87,
    lastVerifiedAt: now,
    verificationCount: 2,
    description: "New simulated camera observation detected a construction barrier across the sidewalk.",
    source: "Camera observation · simulated",
  }).where(eq(observationsTable.id, blocker.id)).returning();
  const changedObservation = toObservation(updated);
  const routeResult = buildRoutes(true, "Most accessible");
  res.json(RunDemoScenarioResponse.parse({
    stage: "rerouted",
    timeline: [
      "Yesterday · Sidewalk accessible",
      "New observation · barrier detected",
      "Change detected · confidence updated",
      "Route updated · alternative recommended",
    ],
    changed_observation: changedObservation,
    route_result: routeResult,
    message: "The direct route was downgraded and a verified accessible alternative is now recommended.",
  }));
});

router.post("/vision/analyze", async (req, res): Promise<void> => {
  const parsed = AnalyzeVisionBody.safeParse(req.body);
  if (!parsed.success) {
    sendValidationError(res, parsed.error.message);
    return;
  }
  const hint = `${parsed.data.file_name} ${parsed.data.image_hint ?? ""}`.toLowerCase();
  const detections = hint.includes("ramp")
    ? [
        { object: "Ramp", confidence: 0.91, impact: "POSITIVE", note: "Clear step-free access pattern detected." },
        { object: "Accessible entrance", confidence: 0.86, impact: "POSITIVE", note: "Threshold appears navigable in this prototype inference." },
        { object: "Sidewalk", confidence: 0.94, impact: "POSITIVE", note: "Continuous path surface detected." },
      ]
    : [
        { object: "Construction Barrier", confidence: 0.94, impact: "HIGH", note: "Temporary obstacle pattern detected." },
        { object: "Parked Vehicle", confidence: 0.78, impact: "MEDIUM", note: "Possible sidewalk encroachment detected." },
        { object: "Sidewalk", confidence: 0.89, impact: "NEUTRAL", note: "Path surface detected around the obstruction." },
      ];
  res.json(AnalyzeVisionResponse.parse({
    mode: "Prototype AI inference",
    detections,
    message: "These results are deterministic demo detections, not output from a trained production model.",
  }));
});

export default router;