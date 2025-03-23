import { type personType } from "~/types/personType";

const data: personType[] = [];
let id = 1;

export async function GET() {
  console.log(data);
  return Response.json(data);
}

export async function POST(request: Request) {
  const res = (await request.json()) as personType;
  res.id = id;
  id += 1;
  data.push(res);

  return Response.json(data.at(-1), {
    status: 201,
  });
}
