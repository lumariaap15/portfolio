import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  project?: string;
  website?: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as ContactPayload;

  if (!data.name || !data.email || !data.project) {
    return NextResponse.json({ error: "missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact form email.");
    return NextResponse.json({ error: "email service not configured" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    // TODO: switch to a sender on a verified luisaalzate.dev domain once set up in Resend.
    from: "Portfolio contact form <onboarding@resend.dev>",
    to: site.email,
    replyTo: data.email,
    subject: `New project inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      data.website ? `Website: ${data.website}` : null,
      "",
      data.project,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
