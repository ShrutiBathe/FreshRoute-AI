---
name: FreshRoute architecture
description: Durable implementation choices for the FreshRoute AI prototype.
---

FreshRoute AI follows the workspace's shared Express/PostgreSQL architecture rather than introducing a parallel FastAPI/SQLite service. Demo data is deterministic and explicitly labeled, while the backend exposes a mock vision boundary and confidence-aware routing so production models or routing engines can be added later.

**Why:** The workspace already provides the shared API, generated OpenAPI clients, Drizzle persistence, and managed workflows; a second backend stack would create conflicting services and duplicate setup for a hackathon prototype.

**How to apply:** Keep future FreshRoute features in the shared API server, update the OpenAPI contract before client changes, and preserve the distinction between demo/prototype outputs and real-world accessibility claims.