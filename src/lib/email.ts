import nodemailer from "nodemailer";
import type { ConfiguratorState, LeadInfo } from "@/types";
import { getOptionLabel } from "@/lib/data/elevator-options";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendConfigurationNotification(
  config: ConfiguratorState,
  lead: LeadInfo,
  configId: string
) {
  const transport = createTransport();
  const notificationEmail = process.env.NOTIFICATION_EMAIL;

  if (!transport || !notificationEmail) {
    console.log("Email not configured. Configuration saved:", configId);
    console.log("Lead:", lead.name, lead.email);
    return;
  }

  const html = `
    <h2>New Elevator Cab Configuration Submitted</h2>
    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${lead.name}</li>
      <li><strong>Company:</strong> ${lead.company}</li>
      <li><strong>Email:</strong> ${lead.email}</li>
      <li><strong>Phone:</strong> ${lead.phone || "N/A"}</li>
      <li><strong>Project Info:</strong> ${lead.projectInfo || "N/A"}</li>
    </ul>
    <h3>Configuration Details</h3>
    <ul>
      <li><strong>Cab Type:</strong> ${getOptionLabel("cabType", config.cabType)}</li>
      <li><strong>Cab Size:</strong> ${getOptionLabel("cabSize", config.cabSize)}</li>
      <li><strong>Wall Finish:</strong> ${getOptionLabel("wallFinish", config.wallFinish)}</li>
      <li><strong>Floor Type:</strong> ${getOptionLabel("floorType", config.floorType)}</li>
      <li><strong>Ceiling Type:</strong> ${getOptionLabel("ceilingType", config.ceilingType)}</li>
      <li><strong>Handrail:</strong> ${getOptionLabel("handrail", config.handrail)}</li>
      <li><strong>Lighting:</strong> ${getOptionLabel("lighting", config.lighting)}</li>
      <li><strong>Mirror:</strong> ${getOptionLabel("mirror", config.mirror)}</li>
      <li><strong>Accessories:</strong> ${config.options.map((o) => getOptionLabel("options", o)).join(", ") || "None"}</li>
    </ul>
    <p><a href="${process.env.NEXTAUTH_URL}/admin/configurations/${configId}">View in Admin Dashboard</a></p>
  `;

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to: notificationEmail,
    subject: `New Elevator Cab Configuration - ${lead.company}`,
    html,
  });
}
