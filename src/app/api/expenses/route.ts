import { type expenseType } from "~/types/expenseType";

const data: expenseType[] = [];
let id = 4;

export async function GET() {
  console.log(data);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as expenseType;
  res.id = id;
  id += 1;
  data.push(res);
  console.log(data);

  return Response.json(data.at(-1), {
    status: 201,
  });
}
