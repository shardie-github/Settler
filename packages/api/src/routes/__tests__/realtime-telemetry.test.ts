import express from "express";
import request from "supertest";
import { realtimeRouter } from "../realtime";

jest.mock("../../infrastructure/db/prisma", () => ({
  prisma: {
    reconciliationRun: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: "run-01",
          status: "completed",
          sourceCount: 150,
          targetCount: 150,
          matchedCount: 148,
          unmatchedSourceCount: 2,
          unmatchedTargetCount: 2,
          startedAt: new Date(),
          completedAt: new Date(),
        },
      ]),
    },
  },
}));

jest.mock("../../db", () => ({
  queryWithTenant: jest.fn().mockResolvedValue([]),
}));

describe("Realtime Telemetry SSE Route", () => {
  const app = express();
  app.use(express.json());

  // Inject tenant context
  app.use((req, _res, next) => {
    (req as any).tenantId = "tenant-test-telemetry";
    (req as any).userId = "user-test-telemetry";
    next();
  });

  app.use("/api/v1/realtime", realtimeRouter);

  it("establishes an SSE telemetry stream and returns text/event-stream headers", async () => {
    const res = await request(app)
      .get("/api/v1/realtime/telemetry/stream")
      .set("Accept", "text/event-stream")
      .buffer(true)
      .parse((res: any, callback: (err: Error | null, body?: any) => void) => {
        let data = "";
        res.on("data", (chunk: Buffer | string) => {
          data += chunk.toString();
          // Abort after receiving initial handshake
          if (data.includes("telemetry_connected")) {
            res.destroy();
            callback(null, data);
          }
        });
      });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/event-stream");
    expect(res.headers["cache-control"]).toBe("no-cache");
    expect(res.body).toContain("telemetry_connected");
    expect(res.body).toContain("tenant-test-telemetry");
  });

  it("rejects unauthorized telemetry request when tenant context is missing", async () => {
    const unauthApp = express();
    unauthApp.use("/api/v1/realtime", realtimeRouter);

    const res = await request(unauthApp)
      .get("/api/v1/realtime/telemetry/stream")
      .set("Accept", "text/event-stream");

    expect(res.status).toBe(401);
    expect(res.body.error).toContain("tenant context are required");
  });
});
