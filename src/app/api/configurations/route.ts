import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateConfiguration } from "@/lib/validation";
import { sendConfigurationNotification } from "@/lib/email";
import type { ConfiguratorState, LeadInfo } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config: ConfiguratorState = body.config;
    const lead: LeadInfo = body.lead;

    // Validate configuration
    const errors = validateConfiguration(config);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Validate required lead fields
    if (!lead.name || !lead.company || !lead.email) {
      return NextResponse.json(
        { error: "Name, company, and email are required" },
        { status: 400 }
      );
    }

    // Save to database
    const savedConfig = await prisma.configuration.create({
      data: {
        cabType: config.cabType,
        cabSize: config.cabSize,
        wallFinish: config.wallFinish,
        floorType: config.floorType,
        ceilingType: config.ceilingType,
        handrail: config.handrail,
        lighting: config.lighting,
        mirror: config.mirror,
        options: JSON.stringify(config.options),
        lead: {
          create: {
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.phone || "",
            projectInfo: lead.projectInfo || "",
          },
        },
      },
    });

    // Send email notification (non-blocking)
    sendConfigurationNotification(config, lead, savedConfig.id).catch((err) =>
      console.error("Email notification failed:", err)
    );

    return NextResponse.json({ id: savedConfig.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save configuration:", error);
    return NextResponse.json(
      { error: "Failed to save configuration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configurations = await prisma.configuration.findMany({
    include: { lead: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(configurations);
}
