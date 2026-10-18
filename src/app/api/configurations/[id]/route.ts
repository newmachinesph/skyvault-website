import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const configuration = await prisma.configuration.findUnique({
    where: { id },
    include: { lead: true },
  });

  if (!configuration) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(configuration);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await prisma.configuration.update({
    where: { id },
    data: { status: body.status },
    include: { lead: true },
  });

  return NextResponse.json(updated);
}
