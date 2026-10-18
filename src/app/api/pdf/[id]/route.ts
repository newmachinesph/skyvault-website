import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOptionLabel } from "@/lib/data/elevator-options";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const config = await prisma.configuration.findUnique({
    where: { id },
    include: { lead: true },
  });

  if (!config) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const options: string[] = JSON.parse(config.options);

  // Generate a simple HTML-based PDF using a printable page
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Elevator Cab Configuration - ${config.id}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    .subtitle { color: #737373; font-size: 14px; margin-bottom: 30px; }
    h2 { font-size: 16px; background: #f5f5f5; padding: 10px 16px; margin: 24px 0 0 0; border-radius: 6px 6px 0 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px 16px; border-bottom: 1px solid #e5e5e5; font-size: 14px; }
    td:first-child { color: #737373; width: 40%; }
    td:last-child { font-weight: 600; }
    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #737373; }
  </style>
</head>
<body>
  <h1>Elevator Cab Configuration</h1>
  <p class="subtitle">Reference: ${config.id} | Date: ${config.createdAt.toLocaleDateString()}</p>

  <h2>Configuration Details</h2>
  <table>
    <tr><td>Cab Type</td><td>${getOptionLabel("cabType", config.cabType)}</td></tr>
    <tr><td>Cab Size</td><td>${getOptionLabel("cabSize", config.cabSize)}</td></tr>
    <tr><td>Wall Finish</td><td>${getOptionLabel("wallFinish", config.wallFinish)}</td></tr>
    <tr><td>Floor Type</td><td>${getOptionLabel("floorType", config.floorType)}</td></tr>
    <tr><td>Ceiling Type</td><td>${getOptionLabel("ceilingType", config.ceilingType)}</td></tr>
    <tr><td>Handrail</td><td>${getOptionLabel("handrail", config.handrail)}</td></tr>
    <tr><td>Lighting</td><td>${getOptionLabel("lighting", config.lighting)}</td></tr>
    <tr><td>Mirror</td><td>${getOptionLabel("mirror", config.mirror)}</td></tr>
    <tr><td>Accessories</td><td>${options.length > 0 ? options.map((o) => getOptionLabel("options", o)).join(", ") : "None"}</td></tr>
  </table>

  ${config.lead ? `
  <h2>Contact Information</h2>
  <table>
    <tr><td>Name</td><td>${config.lead.name}</td></tr>
    <tr><td>Company</td><td>${config.lead.company}</td></tr>
    <tr><td>Email</td><td>${config.lead.email}</td></tr>
    ${config.lead.phone ? `<tr><td>Phone</td><td>${config.lead.phone}</td></tr>` : ""}
    ${config.lead.projectInfo ? `<tr><td>Project Info</td><td>${config.lead.projectInfo}</td></tr>` : ""}
  </table>
  ` : ""}

  <div class="footer">
    <p>Elevator Cab Configurator - Generated ${new Date().toLocaleDateString()}</p>
  </div>
</body>
</html>`;

  // Return as downloadable HTML (can be printed to PDF by browser)
  // For a true PDF, you'd use puppeteer or similar server-side rendering
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
      "Content-Disposition": `inline; filename="elevator-config-${config.id}.html"`,
    },
  });
}
