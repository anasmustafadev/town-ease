import { eq, isNull } from "drizzle-orm";
import { db } from "~/server/db/index";
import { allotment, plot } from "~/server/db/schema";
import { type plotType } from "~/types/plotType";

export async function GET() {
  const data = await db
    .select()
    .from(plot)
    .leftJoin(allotment, eq(plot.plotId, allotment.plotId))
    .where(isNull(allotment.plotId));
  const unallottedPlots = data.map((row) => row.plot);

  unallottedPlots.sort((a, b) => a.plotId - b.plotId);
  return Response.json(unallottedPlots);
}
