import { eq } from "drizzle-orm";
import { db } from "~/server/db/index";
import { plot } from "~/server/db/schema";
import { type plotType } from "~/types/plotType";

export async function GET() {
  const data = await db.select().from(plot);
  data.sort((a, b) => a.plotId - b.plotId);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as plotType;
  const data = await db
    .insert(plot)
    .values({
      area: res.area,
      height: res.height,
      ratePerMarla: res.ratePerMarla,
      width: res.width,
      feature: res.feature,
      price: res.price,
      total: res.total,
      type: res.type,
    })
    .returning();
  return Response.json(data, {
    status: 201,
  });
}

export async function PUT(request: Request) {
  const res = (await request.json()) as plotType;
  const data = await db
    .update(plot)
    .set({
      area: res.area,
      height: res.height,
      ratePerMarla: res.ratePerMarla,
      width: res.width,
      feature: res.feature,
      price: res.price,
      total: res.total,
      type: res.type,
    })
    .where(eq(plot.plotId, res.plotId))
    .returning();
  return Response.json(data, {
    status: 202,
  });
}
