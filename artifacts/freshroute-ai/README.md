# FreshRoute AI

FreshRoute AI is a hackathon prototype for real-time accessibility intelligence and dynamic routing. It demonstrates how observations from cameras and community reports can be assigned confidence and freshness scores, compared over time, and used to recommend a more reliable accessible route.

## What it demonstrates

- Live map observations for ramps, stairs, elevators, blocked sidewalks, flooding, construction, and accessible entrances
- Temporal confidence decay using `initial_confidence * exp(-decay_rate * hours_since_verification)`
- A Detect → Verify → Decay → Update → Reroute demo scenario
- Route alternatives scored using accessibility, confidence, freshness, obstacle severity, and distance
- Deterministic prototype AI inference for uploaded street images
- Persistent crowdsourced reports that become map observations
- Dashboard metrics and Recharts analytics

All observations are clearly marked as demo or prototype data. The application does not claim to use a trained production computer-vision model or live city infrastructure data.

## Architecture

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Wouter, Recharts, Lucide React
- **API:** Express 5 in `artifacts/api-server`, with generated Zod validation from `lib/api-spec/openapi.yaml`
- **Persistence:** PostgreSQL with Drizzle ORM in `lib/db`
- **Mapping:** OpenStreetMap-compatible map visualization in the frontend, using deterministic demo coordinates
- **AI abstraction:** `/api/vision/analyze` is a mock inference boundary that can later be replaced by YOLO, RT-DETR, or another model

The workspace's shared backend is Express/PostgreSQL, so the prototype uses those existing project services instead of introducing a second FastAPI/SQLite stack.

## Run

The Replit workflows start both services:

```bash
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/freshroute-ai run dev
```

For checks:

```bash
pnpm --filter @workspace/api-server run typecheck
pnpm --filter @workspace/freshroute-ai run typecheck
PORT=19830 BASE_PATH=/ pnpm --filter @workspace/freshroute-ai run build
```

## Demo flow

1. Open the overview dashboard and review live metrics.
2. Open the live map and select an observation.
3. Run the live demo from the overview.
4. Show the construction barrier update, confidence refresh, timeline, and rerouted alternative.
5. Use Route planner to compare fastest and accessibility-first preferences.
6. Upload a JPG or PNG on AI detection. Results are labeled **Prototype AI inference**.
7. Submit a report on Reports and see it persist in the recent reports list.
8. Open Analytics to review observation, obstacle, confidence, category, and status trends.

## API

- `GET /api/healthz`
- `GET /api/observations`
- `POST /api/observations`
- `GET /api/observations/{id}`
- `GET /api/map`
- `GET /api/reports`
- `POST /api/reports`
- `GET /api/dashboard/stats`
- `GET /api/analytics`
- `POST /api/route`
- `POST /api/demo/run`
- `POST /api/vision/analyze`

## Safety note

Accessibility information is probabilistic and may change. Users should verify conditions where necessary. The prototype does not store personally identifiable information, use facial recognition, or identify individuals from images.

## Future improvements

- Replace deterministic inference with a calibrated environmental computer-vision model
- Add map-matched pedestrian graph segments and OSRM or GraphHopper routing
- Add human verification workflows and source reliability calibration
- Add edge inference and offline mobile collection
- Add municipality and campus operations integrations