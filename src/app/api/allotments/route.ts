import { eq } from "drizzle-orm";
import { db } from "~/server/db/index";
import { allotment, client, person, plot } from "~/server/db/schema";
import { type allotmentType } from "~/types/allotmentType";

export async function GET() {
  const data = await db
    .select({
      ID: allotment.allotmentId,
      Date: allotment.allotmentDate,
      Plot: plot.plotId,
      ClientName: person.name,
      Area: plot.area,
      SaleRate: plot.ratePerMarla,
      Price: plot.total,
      Advance: allotment.advanceTotal,
      Installment: allotment.installmentType,
      NoOfInstallments: allotment.months,
    })
    .from(allotment)
    .innerJoin(client, eq(allotment.clientId, client.clientId))
    .innerJoin(person, eq(client.personId, person.id))
    .innerJoin(plot, eq(allotment.plotId, plot.plotId));

  console.log(data);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as allotmentType;
  const data = await db
    .insert(allotment)
    .values({
      allotmentDate: new Date(res.allotmentDate),
      clientId: res.clientId,
      plotId: res.plotId,
      months: res.months,
      installmentType: res.installmentType,
      advancePercentage: res.advancePercentage,
      advanceTotal: res.advanceTotal,
      allotedBy: res.allotedBy,
    })
    .returning();
  return Response.json(data[0], {
    status: 201,
  });
}
